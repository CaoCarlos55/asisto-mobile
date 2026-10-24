import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { supabase } from '../api/supabaseClient'
import { cancelClassroomSession, closeClassroomSession, sendAttendanceLog } from '../api/api'
import { useAuth } from './AuthContext'

const ClassSessionContext = createContext(null)

export const DEFAULT_INITIAL_STUDENTS = [
  { id: 's1', name: 'Daniel Álvarez', ci: 'V-28.452.190', status: 'pending', initials: 'DA' },
  { id: 's2', name: 'Sofía Mendoza', ci: 'V-28.112.403', status: 'pending', initials: 'SM' },
  { id: 's3', name: 'Carlos Gómez', ci: 'V-27.994.120', status: 'pending', initials: 'CG' },
  { id: 's4', name: 'Mariana López', ci: 'V-28.601.215', status: 'pending', initials: 'ML' },
  { id: 's5', name: 'Andrés Pérez', ci: 'V-29.410.882', status: 'pending', initials: 'AP' },
  { id: 's6', name: 'Alejandro Rojas', ci: 'V-28.451.902', status: 'pending', initials: 'AR' },
  { id: 's7', name: 'Mariana Castro', ci: 'V-29.114.839', status: 'pending', initials: 'MC' },
  { id: 's8', name: 'Daniel Vargas', ci: 'V-27.882.104', status: 'pending', initials: 'DV' }
]

// Generador determinista de Token Dinámico tipo TOTP sincronizado por bloques de tiempo (15 segundos)
export function getDynamicQrToken(timestamp = Date.now()) {
  const slot = Math.floor(timestamp / 15000)
  let hash = slot
  hash = ((hash >> 16) ^ hash) * 0x45d9f3b
  hash = ((hash >> 16) ^ hash) * 0x45d9f3b
  hash = (hash >> 16) ^ hash
  const token = Math.abs(hash % 900000) + 100000
  return token.toString()
}

export function getQrSecondsRemaining() {
  const remaining = 15 - (Math.floor(Date.now() / 1000) % 15)
  return remaining === 0 ? 15 : remaining
}

export function ClassSessionProvider({ children }) {
  const auth = useAuth()
  const currentUser = auth?.currentUser
  const isTeacher = auth?.userRole === 'teacher'

  const [sessionStatus, setSessionStatus] = useState('active')

  const [classInfo, setClassInfo] = useState({
    subject: 'Matemática',
    section: '5to Año • Sección B',
    classroom: 'Aula 204',
    classroomId: '204',
    timeBlock: '07:30 - 09:00 AM',
    teacher: 'Prof. Roberto García',
    qrStatus: 'Activo',
    elapsedMinutes: 5,
    isLive: true
  })

  const [students, setStudents] = useState(DEFAULT_INITIAL_STUDENTS)

  const [logbook, setLogbook] = useState({
    subject: 'Matemática',
    topic: 'Tema programático del día\nDesarrollo de contenidos y actividades prácticas',
    incidentType: 'Clase sin novedades',
    observations: 'Desarrollo normal de la sesión pedagógica según la planificación curricular. Participación activa de los estudiantes en las actividades propuestas.'
  })

  const [cancellationReason, setCancellationReason] = useState('')
  const [lastIncidentReset, setLastIncidentReset] = useState(null)
  const lastIncidentResetRef = useRef(null)

  // Cargar información dinámica de la clase cuando el usuario autenticado cambia
  useEffect(() => {
    if (!currentUser) return

    const roomNum = currentUser.classroomId || '204'
    const roomDisplayName = roomNum.startsWith('Aula') ? roomNum : `Aula ${roomNum}`
    const subjectName = currentUser.subject || 'Matemática'
    const sectionName = `${currentUser.yearLevel || '5to Año'} • ${currentUser.section || 'Sección B'}`
    const teacherName = isTeacher ? (currentUser.name || 'Prof. Roberto García') : 'Prof. Roberto García'

    setClassInfo(prev => ({
      ...prev,
      subject: subjectName,
      section: sectionName,
      classroom: roomDisplayName,
      classroomId: roomNum,
      teacher: teacherName,
      timeBlock: '07:30 - 09:00 AM',
      isLive: true
    }))

    setLogbook(prev => ({
      ...prev,
      subject: subjectName
    }))
  }, [currentUser, isTeacher])

  // Cargar nómina de estudiantes real desde Supabase (public.profiles y public.students)
  const loadRosterFromSupabase = useCallback(async (roomId = '204') => {
    if (!supabase) return

    try {
      // 1. Consultar estudiantes asignados a este salón en public.profiles
      const { data: profStudents } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_type', 'estudiante')
        .eq('classroom_id', roomId)
        .order('full_name', { ascending: true })

      let baseStudents = []
      if (profStudents && profStudents.length > 0) {
        baseStudents = profStudents.map(p => ({
          id: p.id,
          name: p.full_name,
          ci: p.ci,
          section: p.section || 'Sección B',
          initials: p.avatar_initials || p.full_name?.substring(0, 2).toUpperCase() || 'ES'
        }))
      } else {
        // Fallback a public.students
        const { data: dbStudents } = await supabase
          .from('students')
          .select('*')
          .order('name', { ascending: true })

        if (dbStudents && dbStudents.length > 0) {
          baseStudents = dbStudents.map(s => ({
            id: s.id,
            name: s.name,
            ci: s.ci,
            section: s.section,
            initials: s.name?.substring(0, 2).toUpperCase() || 'ES'
          }))
        }
      }

      if (baseStudents.length === 0) return

      // Consultar asistencias de las últimas 12 horas para este salón
      const { data: recentLogs } = await supabase
        .from('attendance_logs')
        .select('student_ci, status, scan_timestamp')
        .eq('classroom_id', roomId)
        .gte('scan_timestamp', new Date(Date.now() - 12 * 3600 * 1000).toISOString())

      const logsMap = new Map()
      if (recentLogs) {
        recentLogs.forEach(l => {
          const clean = l.student_ci?.replace(/[^0-9]/g, '') || l.student_ci?.trim()
          logsMap.set(clean, l.status)
        })
      }

      const formatted = baseStudents.map(s => {
        const cleanCi = s.ci?.replace(/[^0-9]/g, '') || s.ci?.trim()
        const logStatus = logsMap.get(cleanCi)

        let status = 'pending'
        let time = undefined

        if (logStatus === 'presente') {
          status = 'present_qr'
          time = '10:05 AM'
        } else if (logStatus === 'retardo') {
          status = 'late'
          time = '10:14 AM'
        }

        return {
          id: s.id,
          name: s.name,
          ci: s.ci,
          section: s.section,
          status: status,
          time: time,
          initials: s.initials
        }
      })

      setStudents(formatted)
    } catch (e) {
      console.warn('Advertencia cargando estudiantes desde Supabase:', e)
    }
  }, [])

  useEffect(() => {
    loadRosterFromSupabase(classInfo.classroomId || '204')
  }, [classInfo.classroomId, loadRosterFromSupabase])

  // Restaurar estado guardado en almacenamiento local
  useEffect(() => {
    async function loadStoredClass() {
      try {
        const storedReset = await AsyncStorage.getItem('asisto_last_incident_reset')
        if (storedReset) {
          setLastIncidentReset(storedReset)
          lastIncidentResetRef.current = storedReset
        }

        const stored = await AsyncStorage.getItem('asisto_session_state')
        if (stored) {
          const parsed = JSON.parse(stored)
          if (
            parsed.logbook?.topic?.includes('Racionalización') ||
            parsed.logbook?.subject?.includes('Algoritmos') ||
            parsed.classInfo?.subject?.includes('Algoritmos')
          ) {
            await AsyncStorage.removeItem('asisto_session_state')
            return
          }
          if (parsed.sessionStatus) setSessionStatus(parsed.sessionStatus)
          if (parsed.students && parsed.students.length > 0) setStudents(parsed.students)
          if (parsed.logbook) setLogbook(parsed.logbook)
        }
      } catch (e) {
        console.warn('Error al restaurar clase offline:', e)
      }
    }
    loadStoredClass()
  }, [])

  // Sincronización en tiempo real con Supabase para incidencias y justificaciones
  useEffect(() => {
    if (!supabase) return

    let isMounted = true

    const syncIncidents = async () => {
      try {
        const { data, error } = await supabase
          .from('incidents')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10)

        if (error || !data || !isMounted) return

        const activeResetTime = lastIncidentResetRef.current || lastIncidentReset
        const studentCi = currentUser?.ci || 'V-28.452.190'
        const studentName = currentUser?.name || 'Daniel'

        const studentIncident = data.find(
          item =>
            (item.student_name?.toLowerCase().includes(studentName.toLowerCase()) ||
             item.student_ci?.includes(studentCi.replace(/[^0-9]/g, '')) ||
             item.student_ci?.includes('28.452.190')) &&
            (!activeResetTime || new Date(item.created_at) > new Date(activeResetTime))
        )

        if (studentIncident) {
          setStudents(prev => {
            const current = prev.find(
              s => s.ci.includes(studentCi) || s.name.toLowerCase().includes(studentName.toLowerCase())
            )
            if (!current) return prev

            if (
              current.incidentStatus === studentIncident.status &&
              current.incidentFolio === studentIncident.id
            ) {
              return prev
            }

            const updated = prev.map(s => {
              if (s.ci.includes(studentCi) || s.name.toLowerCase().includes(studentName.toLowerCase())) {
                if (studentIncident.status === 'Rechazada') {
                  return {
                    ...s,
                    status: 'rejected',
                    incidentStatus: 'Rechazada',
                    incidentVerdict: studentIncident.official_verdict || 'Rechazar',
                    incidentNotes: studentIncident.official_notes || 'Rechazada por Coordinación Docente',
                    incidentFolio: studentIncident.id
                  }
                } else if (studentIncident.status === 'Aprobada') {
                  return {
                    ...s,
                    status: 'present_manual',
                    incidentStatus: 'Aprobada',
                    incidentVerdict: studentIncident.official_verdict || 'Aprobar',
                    incidentNotes: studentIncident.official_notes || 'Aprobada por Coordinación Docente',
                    incidentFolio: studentIncident.id,
                    contingency: 'Justificación Aprobada por Coordinación'
                  }
                } else if (studentIncident.status === 'Pendiente') {
                  return {
                    ...s,
                    status: 'in_review',
                    incidentStatus: 'Pendiente',
                    incidentFolio: studentIncident.id
                  }
                }
              }
              return s
            })
            persistOffline(updated)
            return updated
          })
        }
      } catch (e) {
        // Fallback silencioso
      }
    }

    syncIncidents()
    const interval = setInterval(syncIncidents, 3000)

    const channel = supabase
      .channel('mobile_incidents_sync')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'incidents' },
        () => {
          syncIncidents()
        }
      )
      .subscribe()

    return () => {
      isMounted = false
      clearInterval(interval)
      if (channel) supabase.removeChannel(channel)
    }
  }, [currentUser, lastIncidentReset])

  const persistOffline = async (newStudents, newStatus, newLogbook) => {
    try {
      await AsyncStorage.setItem(
        'asisto_session_state',
        JSON.stringify({
          sessionStatus: newStatus || sessionStatus,
          students: newStudents || students,
          logbook: newLogbook || logbook,
          lastUpdated: new Date().toISOString()
        })
      )
    } catch (e) {
      console.warn('Error guardando en almacenamiento seguro local:', e)
    }
  }

  const [qrToken, setQrToken] = useState(() => getDynamicQrToken())
  const [previousQrToken, setPreviousQrToken] = useState(() => getDynamicQrToken(Date.now() - 15000))
  const [qrTimestamp, setQrTimestamp] = useState(() => Date.now())
  const [qrSecondsRemaining, setQrSecondsRemaining] = useState(() => getQrSecondsRemaining())

  // Sincronización multi-dispositivo y compensación de desfase de reloj
  const [remoteTeacherToken, setRemoteTeacherToken] = useState(null)
  const [remoteTeacherPreviousToken, setRemoteTeacherPreviousToken] = useState(null)
  const [remoteTeacherTimestamp, setRemoteTeacherTimestamp] = useState(null)
  const [clockOffset, setClockOffset] = useState(0)
  const lastKnownTeacherTsRef = useRef(Date.now())

  // Publicar token activo en Supabase para el aula asignada
  const publishTeacherToken = useCallback(async (token, ts) => {
    if (!supabase || !isTeacher) return
    const roomId = classInfo.classroomId || '204'
    try {
      await supabase
        .from('classrooms')
        .update({ sub_note: `QR:${token}:${ts}` })
        .eq('id', roomId)
    } catch (e) {
      // Fallback offline
    }
  }, [classInfo.classroomId, isTeacher])

  // Sincronizar el token dinámico y la cuenta regresiva con el reloj TOTP
  useEffect(() => {
    if (isTeacher) {
      publishTeacherToken(qrToken, qrTimestamp)
    }

    const timer = setInterval(() => {
      const remaining = getQrSecondsRemaining()
      setQrSecondsRemaining(remaining)
      if (remaining === 15) {
        const now = Date.now()
        const nextToken = getDynamicQrToken(now)
        const prev = qrToken
        setPreviousQrToken(prev)
        setQrToken(nextToken)
        setQrTimestamp(now)
        if (isTeacher) {
          publishTeacherToken(nextToken, now)
        }
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [qrToken, qrTimestamp, isTeacher, publishTeacherToken])

  // Escuchar en tiempo real el token proyectado por el docente en el aula
  useEffect(() => {
    if (!supabase) return
    const roomId = classInfo.classroomId || '204'

    const fetchClassroomToken = async () => {
      try {
        const { data } = await supabase
          .from('classrooms')
          .select('sub_note')
          .eq('id', roomId)
          .single()
        if (data?.sub_note?.startsWith('QR:')) {
          const [, token, ts] = data.sub_note.split(':')
          if (token) {
            setRemoteTeacherToken(token)
            if (ts) {
              const numTs = Number(ts)
              setRemoteTeacherTimestamp(numTs)
              setClockOffset(numTs - Date.now())
              lastKnownTeacherTsRef.current = Math.max(lastKnownTeacherTsRef.current, numTs)
            }
          }
        }
      } catch (e) {
        // Fallback offline
      }
    }

    fetchClassroomToken()
    const polling = setInterval(fetchClassroomToken, 4000)

    const channel = supabase
      .channel(`mobile_classroom_token_${roomId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'classrooms', filter: `id=eq.${roomId}` },
        (payload) => {
          if (payload.new?.sub_note?.startsWith('QR:')) {
            const [, token, ts] = payload.new.sub_note.split(':')
            if (token) {
              setRemoteTeacherToken(prev => {
                if (prev && prev !== token) setRemoteTeacherPreviousToken(prev)
                return token
              })
              if (ts) {
                const numTs = Number(ts)
                setRemoteTeacherTimestamp(numTs)
                setClockOffset(numTs - Date.now())
                lastKnownTeacherTsRef.current = Math.max(lastKnownTeacherTsRef.current, numTs)
              }
            }
          }
        }
      )
      .subscribe()

    return () => {
      clearInterval(polling)
      if (channel) supabase.removeChannel(channel)
    }
  }, [classInfo.classroomId])

  const validateQrToken = (entered) => {
    if (!entered) return false
    const str = entered.toString().trim()

    let candidate = str
    if (str.includes(':')) {
      const parts = str.split(':')
      candidate = parts.length >= 3 ? parts[2] : parts[parts.length - 1]
    }
    const clean = candidate.replace(/[^0-9]/g, '')
    if (!clean || clean.length < 6) return false

    const currentToken = getDynamicQrToken()
    const prevToken = getDynamicQrToken(Date.now() - 15000)

    if (clean === currentToken || clean === prevToken || clean === remoteTeacherToken || clean === remoteTeacherPreviousToken) {
      return true
    }

    return false
  }

  const cancelClass = async (reason) => {
    setCancellationReason(reason)
    setSessionStatus('cancelled')
    setClassInfo(prev => ({ ...prev, qrStatus: 'Inerte', isLive: false }))
    await persistOffline(students, 'cancelled', logbook)
    await cancelClassroomSession(classInfo.classroomId || '204', reason)
  }

  const markManualAttendance = async (studentId, cause) => {
    let affectedStudent = null
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const updated = students.map(s => {
      if (s.id === studentId) {
        affectedStudent = s
        return {
          ...s,
          status: 'present_manual',
          time: timeStr,
          contingency: cause,
          auditTag: 'Registro Manual por el Profesor'
        }
      }
      return s
    })

    setStudents(updated)
    await persistOffline(updated)
    if (affectedStudent) {
      await sendAttendanceLog({
        studentCi: affectedStudent.ci,
        classroomId: classInfo.classroomId || '204',
        subject: classInfo.subject,
        status: 'presente',
        geofenceVerified: true,
        auditNote: `Manual: ${cause}`
      })
    }
  }

  const registerIncident = async (studentCi, folio, motive, description, fileName) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const studentTargetCi = studentCi || currentUser?.ci || 'V-28.452.190'
    const studentTargetName = currentUser?.name || 'Daniel Álvarez'

    const updated = students.map(s => {
      if (s.ci.includes(studentTargetCi) || s.name.toLowerCase().includes(studentTargetName.toLowerCase())) {
        return {
          ...s,
          status: 'in_review',
          time: timeStr,
          incidentFolio: folio,
          incidentMotive: motive,
          incidentDescription: description,
          incidentFile: fileName
        }
      }
      return s
    })
    setStudents(updated)
    await persistOffline(updated)
  }

  const saveLogbook = async (topic, incidentType, observations) => {
    const newLog = { topic, incidentType, observations, subject: classInfo.subject }
    setLogbook(newLog)
    await persistOffline(students, sessionStatus, newLog)
  }

  const executeFinalClosure = async () => {
    setSessionStatus('closed')
    setClassInfo(prev => ({ ...prev, qrStatus: 'Inerte', isLive: false }))

    const finalised = students.map(s => {
      if (s.status === 'pending') {
        return { ...s, status: 'absent' }
      }
      return s
    })
    setStudents(finalised)
    await persistOffline(finalised, 'closed')
    await closeClassroomSession(classInfo.classroomId || '204')
  }

  const registerStudentAttendance = async (studentCi, status, time, observations = null) => {
    const targetCi = studentCi || currentUser?.ci || 'V-28.452.190'
    const targetName = currentUser?.name || 'Daniel Álvarez'

    const updated = students.map(s => {
      if (s.ci.includes(targetCi) || s.name.toLowerCase().includes(targetName.toLowerCase())) {
        return {
          ...s,
          status: status,
          time: time,
          observations: observations,
          contingency: status === 'present_manual' ? (observations || 'Falla en cámara móvil') : s.contingency
        }
      }
      return s
    })
    setStudents(updated)
    await persistOffline(updated)

    // Enviar a Supabase para disparar actualización del Mapa de Calor en tiempo real
    await sendAttendanceLog({
      studentCi: targetCi,
      classroomId: classInfo.classroomId || '204',
      subject: classInfo.subject,
      status: (status === 'present_qr' || status === 'present_manual') ? 'presente' : status === 'late' ? 'retardo' : 'ausente'
    })
  }

  const resetSession = async ({ cleanAttendance = false } = {}) => {
    const now = new Date().toISOString()
    setLastIncidentReset(now)
    lastIncidentResetRef.current = now
    setSessionStatus('active')

    const roomNum = currentUser?.classroomId || '204'
    const roomDisplayName = roomNum.startsWith('Aula') ? roomNum : `Aula ${roomNum}`
    const subjectName = currentUser?.subject || 'Matemática'
    const sectionName = `${currentUser?.yearLevel || '5to Año'} • ${currentUser?.section || 'Sección B'}`
    const teacherName = isTeacher ? (currentUser?.name || 'Prof. Roberto García') : 'Prof. Roberto García'

    if (cleanAttendance && supabase) {
      try {
        // 1. Eliminar logs de asistencia previos de este salón para iniciar prueba fresca
        await supabase
          .from('attendance_logs')
          .delete()
          .eq('classroom_id', roomNum)

        // 2. Restablecer aula en Supabase
        await supabase
          .from('classrooms')
          .update({
            status: 'normal',
            status_label: 'EN CURSO',
            badge_color: 'green',
            present: 0,
            progress_percent: 0,
            delay_minutes: 0,
            note: 'Clase iniciada • Esperando escaneos QR',
            sub_note: 'Sesión activa iniciada desde App Docente',
            has_action: false,
            updated_at: new Date().toISOString()
          })
          .eq('id', roomNum)
      } catch (err) {
        console.warn('Error limpiando asistencia en Supabase:', err)
      }
    }

    setClassInfo({
      subject: subjectName,
      section: sectionName,
      classroom: roomDisplayName,
      classroomId: roomNum,
      timeBlock: '07:30 - 09:00 AM',
      teacher: teacherName,
      qrStatus: 'Activo',
      elapsedMinutes: 5,
      isLive: true
    })

    await loadRosterFromSupabase(roomNum)
    setCancellationReason('')
    setLogbook({
      subject: subjectName,
      topic: 'Tema programático del día\nDesarrollo de contenidos y actividades prácticas',
      incidentType: 'Clase sin novedades',
      observations: 'Desarrollo normal de la sesión pedagógica según la planificación curricular. Participación activa de los estudiantes en las actividades propuestas.'
    })

    try {
      await AsyncStorage.removeItem('asisto_session_state')
      await AsyncStorage.removeItem('asisto_attendance_history')
      await AsyncStorage.setItem('asisto_last_incident_reset', now)
      if (supabase) {
        const studentCi = currentUser?.ci || 'V-28.452.190'
        await supabase
          .from('incidents')
          .delete()
          .ilike('student_ci', `%${studentCi.replace(/[^0-9]/g, '')}%`)
      }
    } catch (e) {
      console.warn('Error al limpiar estado local:', e)
    }
  }

  // Reiniciar asistencia individual de un estudiante (HU06, HU07)
  const resetStudentAttendance = async (studentCi, roomId) => {
    const targetRoom = roomId || classInfo.classroomId || '204'
    const targetCi = studentCi || currentUser?.ci || 'V-28.452.190'
    const cleanCi = targetCi.replace(/[^0-9]/g, '')

    if (supabase) {
      try {
        // 1. Eliminar asistencia del estudiante en Supabase para este salón
        await supabase
          .from('attendance_logs')
          .delete()
          .eq('classroom_id', targetRoom)
          .ilike('student_ci', `%${cleanCi}%`)

        // 2. Eliminar incidencias previas del estudiante
        await supabase
          .from('incidents')
          .delete()
          .ilike('student_ci', `%${cleanCi}%`)
      } catch (err) {
        console.warn('Error eliminando asistencia de estudiante en Supabase:', err)
      }
    }

    // 3. Resetear el estado del estudiante en la nómina local
    setStudents(prev =>
      prev.map(s => {
        if (s.ci?.replace(/[^0-9]/g, '').includes(cleanCi) || s.name?.toLowerCase().includes((currentUser?.name || '').toLowerCase())) {
          return {
            ...s,
            status: 'pending',
            time: undefined,
            observations: null,
            contingency: null,
            incidentStatus: null
          }
        }
        return s
      })
    )

    // 4. Limpiar almacenamiento local
    try {
      await AsyncStorage.removeItem('asisto_session_state')
      await AsyncStorage.removeItem('asisto_attendance_history')
      await AsyncStorage.setItem('asisto_last_incident_reset', new Date().toISOString())
    } catch (e) {}

    // 5. Recargar nómina
    await loadRosterFromSupabase(targetRoom)
  }

  const metrics = {
    total: students.length,
    presents: students.filter(s => s.status === 'present_qr' || s.status === 'present_manual').length,
    presentsQr: students.filter(s => s.status === 'present_qr').length,
    presentsManual: students.filter(s => s.status === 'present_manual').length,
    lates: students.filter(s => s.status === 'late').length,
    pending: students.filter(s => s.status === 'pending').length,
    absents: students.filter(s => s.status === 'absent').length
  }

  return (
    <ClassSessionContext.Provider
      value={{
        sessionStatus,
        setSessionStatus,
        classInfo,
        setClassInfo,
        students,
        metrics,
        logbook,
        cancellationReason,
        cancelClass,
        markManualAttendance,
        saveLogbook,
        executeFinalClosure,
        registerStudentAttendance,
        resetSession,
        resetStudentAttendance,
        registerIncident,
        qrToken,
        previousQrToken,
        qrTimestamp,
        qrSecondsRemaining,
        remoteTeacherToken,
        remoteTeacherPreviousToken,
        remoteTeacherTimestamp,
        validateQrToken
      }}
    >
      {children}
    </ClassSessionContext.Provider>
  )
}

export function useClassSession() {
  const context = useContext(ClassSessionContext)
  if (!context) throw new Error('useClassSession debe usarse dentro de ClassSessionProvider')
  return context
}

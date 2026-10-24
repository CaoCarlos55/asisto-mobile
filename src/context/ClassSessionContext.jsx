import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { supabase } from '../api/supabaseClient'
import { cancelClassroomSession, closeClassroomSession, sendAttendanceLog } from '../api/api'
import { useAuth } from './AuthContext'

const ClassSessionContext = createContext(null)

export const DEFAULT_INITIAL_STUDENTS = []

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

export function parseQrPayload(qrString) {
  if (!qrString || typeof qrString !== 'string') return null
  const str = qrString.trim()
  if (!str.startsWith('ASISTO:')) return null

  const parts = str.split(':')
  // Formato con modo: ASISTO:<classroomId>:<subject>:<token>:<timestamp>:<mode> (6 partes)
  if (parts.length >= 6) {
    const rawRoom = parts[1].replace(/aula\s*/i, '').trim()
    return {
      classroomId: rawRoom,
      subject: parts[2]?.trim() || null,
      token: parts[3]?.trim() || null,
      timestamp: Number(parts[4]) || Date.now(),
      mode: parts[5]?.trim() || 'normal'
    }
  }

  // Formato: ASISTO:<classroomId>:<subject>:<token>:<timestamp> (5 partes)
  if (parts.length >= 5) {
    const rawRoom = parts[1].replace(/aula\s*/i, '').trim()
    return {
      classroomId: rawRoom,
      subject: parts[2]?.trim() || null,
      token: parts[3]?.trim() || null,
      timestamp: Number(parts[4]) || Date.now(),
      mode: null
    }
  }

  // Formato previo: ASISTO:<classroom>:<token>:<timestamp> (4 partes)
  if (parts.length >= 4) {
    const rawRoom = parts[1].replace(/aula\s*/i, '').trim()
    return {
      classroomId: rawRoom,
      subject: null,
      token: parts[2]?.trim() || null,
      timestamp: Number(parts[3]) || Date.now(),
      mode: null
    }
  }

  return null
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
    attendanceMode: 'normal',
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
  const [coordinationAlert, setCoordinationAlert] = useState(null)
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

      if (baseStudents.length === 0) {
        setStudents([])
        return
      }

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
        } else if (logStatus === 'justificado') {
          status = 'present_manual'
          time = '10:05 AM'
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
          .limit(25)

        if (error || !data || !isMounted) return

        const activeResetTime = lastIncidentResetRef.current || lastIncidentReset

        setStudents(prev => {
          let hasAnyChanges = false
          const updated = prev.map(s => {
            const cleanStudentCi = s.ci?.replace(/[^0-9]/g, '') || ''
            const matchingIncident = data.find(item => {
              if (activeResetTime && new Date(item.created_at) <= new Date(activeResetTime)) {
                return false
              }
              const cleanItemCi = item.student_ci?.replace(/[^0-9]/g, '') || ''
              return (
                (cleanStudentCi && cleanItemCi && cleanStudentCi === cleanItemCi) ||
                (s.name && item.student_name && item.student_name.toLowerCase().includes(s.name.toLowerCase()))
              )
            })

            if (!matchingIncident) return s

            if (
              s.incidentStatus === matchingIncident.status &&
              s.incidentFolio === matchingIncident.id
            ) {
              return s
            }

            hasAnyChanges = true
            if (matchingIncident.status === 'Rechazada') {
              return {
                ...s,
                status: 'rejected',
                incidentStatus: 'Rechazada',
                incidentVerdict: matchingIncident.official_verdict || 'Rechazar',
                incidentNotes: matchingIncident.official_notes || 'Rechazada por Coordinación Docente',
                incidentFolio: matchingIncident.id,
                incidentMotive: matchingIncident.tag_type
              }
            } else if (matchingIncident.status === 'Aprobada') {
              return {
                ...s,
                status: 'present_manual',
                incidentStatus: 'Aprobada',
                incidentVerdict: matchingIncident.official_verdict || 'Aprobar',
                incidentNotes: matchingIncident.official_notes || 'Aprobada por Coordinación Docente',
                incidentFolio: matchingIncident.id,
                incidentMotive: matchingIncident.tag_type,
                contingency: 'Justificación Aprobada por Coordinación'
              }
            } else if (matchingIncident.status === 'Pendiente') {
              return {
                ...s,
                status: 'in_review',
                incidentStatus: 'Pendiente',
                incidentFolio: matchingIncident.id,
                incidentMotive: matchingIncident.tag_type,
                incidentDescription: matchingIncident.statement
              }
            }
            return s
          })

          if (hasAnyChanges) {
            persistOffline(updated)
            return updated
          }
          return prev
        })
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
    const mode = classInfo.attendanceMode || (classInfo.elapsedMinutes > 20 ? 'inasistencia' : classInfo.elapsedMinutes > 10 ? 'retardo' : 'normal')
    try {
      await supabase
        .from('classrooms')
        .update({
          sub_note: `QR:${token}:${ts}:${mode}`,
          delay_minutes: classInfo.elapsedMinutes || 5
        })
        .eq('id', roomId)
    } catch (e) {
      // Fallback offline
    }
  }, [classInfo.classroomId, classInfo.attendanceMode, classInfo.elapsedMinutes, isTeacher])

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

  // Escuchar en tiempo real el token proyectado por el docente en el aula y alertas de coordinación
  useEffect(() => {
    if (!supabase) return
    const roomId = classInfo.classroomId || '204'

    const handleClassroomUpdate = (item) => {
      if (!item) return

      // 1. Token dinámico QR y modo de asistencia
      if (item.sub_note?.startsWith('QR:')) {
        const parts = item.sub_note.split(':')
        const token = parts[1]
        const ts = parts[2]
        const remoteMode = parts[3]
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
        if (remoteMode) {
          const minutes = remoteMode === 'inasistencia' ? 25 : remoteMode === 'retardo' ? 15 : 5
          setClassInfo(prev => ({
            ...prev,
            attendanceMode: remoteMode,
            elapsedMinutes: typeof item.delay_minutes === 'number' ? item.delay_minutes : minutes
          }))
        }
      } else if (typeof item.delay_minutes === 'number') {
        const remoteMode = item.delay_minutes > 20 ? 'inasistencia' : item.delay_minutes > 10 ? 'retardo' : 'normal'
        setClassInfo(prev => ({
          ...prev,
          attendanceMode: remoteMode,
          elapsedMinutes: item.delay_minutes
        }))
      }

      // 2. Alertas de coordinación docente hacia el aula
      if (item.has_action && item.action_text?.includes('NOTIFICAR_CIERRE')) {
        setCoordinationAlert('Coordinación Docente solicita el cierre y envío inmediato de la nómina de clase.')
      } else if (!item.has_action && !item.action_text?.includes('NOTIFICAR_CIERRE')) {
        setCoordinationAlert(null)
      }

      // 3. Cierre forzoso de clase desde coordinación
      if (item.status === 'free' && item.note?.includes('Cierre forzoso')) {
        setSessionStatus('closed')
        setClassInfo(prev => ({ ...prev, qrStatus: 'Inerte', isLive: false }))
        setStudents(prev => {
          const closed = prev.map(s => s.status === 'pending' ? { ...s, status: 'absent' } : s)
          persistOffline(closed, 'closed')
          return closed
        })
      }

      // 4. Cancelación de sesión desde coordinación o docente
      if (item.status === 'danger' && item.status_label === 'Cancelada') {
        setSessionStatus('cancelled')
        setClassInfo(prev => ({ ...prev, qrStatus: 'Inerte', isLive: false }))
        setCancellationReason(item.note || 'Cancelada por Coordinación')
      }
    }

    const fetchClassroomToken = async () => {
      try {
        const { data } = await supabase
          .from('classrooms')
          .select('*')
          .eq('id', roomId)
          .single()
        if (data) {
          handleClassroomUpdate(data)
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
          if (payload.new) {
            handleClassroomUpdate(payload.new)
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
      const parsed = parseQrPayload(str)
      if (parsed && parsed.token) {
        candidate = parsed.token
      } else {
        const parts = str.split(':')
        candidate = parts.length >= 3 ? parts[2] : parts[parts.length - 1]
      }
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

    if (supabase) {
      try {
        const folio = `INC-CANC-${Math.floor(1000 + Math.random() * 9000)}`
        const teacherName = currentUser?.name || classInfo.teacher || 'Prof. Roberto García'
        const teacherCi = currentUser?.ci || 'V-12.345.678'
        await supabase.from('incidents').insert({
          id: folio,
          time_label: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          student_name: `Docente: ${teacherName}`,
          student_ci: teacherCi,
          year_level: classInfo.section || '5to Año • Sección B',
          attendance_accum: 'N/A',
          history_stats: 'Cancelación de sesión programada',
          subject: classInfo.subject || 'Matemática',
          subject_short: (classInfo.subject || 'Matemática').split(' ')[0],
          teacher: teacherName,
          room: classInfo.classroom || 'Aula 204',
          scan_time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          tag_type: 'Cancelación de Clase',
          tag_color: 'red',
          file_type: 'Acta de Suspensión',
          statement: `Sesión cancelada por el docente: "${reason}"`,
          pdf_name: 'acta_suspension.pdf',
          status: 'Pendiente'
        })
      } catch (e) {
        console.warn('Error al registrar incidencia por cancelación:', e)
      }
    }
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

    // Si el docente reportó una incidencia en el aula (conducta, infraestructura, etc.),
    // registrarla en la bandeja de incidencias de Supabase para que Coordinación la atienda
    if (incidentType && incidentType !== 'Clase sin novedades' && supabase) {
      try {
        const folio = `INC-DOC-${Math.floor(1000 + Math.random() * 9000)}`
        const teacherName = currentUser?.name || classInfo.teacher || 'Prof. Roberto García'
        const teacherCi = currentUser?.ci || 'V-12.345.678'
        const roomName = classInfo.classroom || 'Aula 204'
        const tagColor = incidentType === 'Falla de infraestructura' ? 'red' : incidentType === 'Incidencia de conducta' ? 'amber' : 'blue'

        await supabase.from('incidents').insert({
          id: folio,
          time_label: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          student_name: `Docente: ${teacherName}`,
          student_ci: teacherCi,
          year_level: classInfo.section || '5to Año • Sección B',
          attendance_accum: 'N/A',
          history_stats: `Tema: ${topic ? topic.substring(0, 30) : 'Sin tema'}`,
          subject: classInfo.subject || 'Matemática',
          subject_short: (classInfo.subject || 'Matemática').split(' ')[0],
          teacher: teacherName,
          room: roomName,
          scan_time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          tag_type: incidentType,
          tag_color: tagColor,
          file_type: 'Bitácora Docente',
          statement: observations || `Reporte docente en bitácora (${incidentType}): ${topic}`,
          pdf_name: 'bitacora_docente.pdf',
          status: 'Pendiente'
        })
      } catch (e) {
        console.warn('Error al registrar incidencia de bitácora en Supabase:', e)
      }
    }
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
    setCoordinationAlert(null)

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
      attendanceMode: 'normal',
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

  // Cambiar modalidad de asistencia de la clase (Puntual, Retardo, Inasistencia)
  const setAttendanceMode = async (mode) => {
    let minutes = 5
    if (mode === 'retardo') minutes = 15
    if (mode === 'inasistencia') minutes = 25

    setClassInfo(prev => ({
      ...prev,
      attendanceMode: mode,
      elapsedMinutes: minutes
    }))

    await persistOffline(students, sessionStatus, logbook)

    if (supabase && isTeacher) {
      const roomId = classInfo.classroomId || '204'
      try {
        await supabase
          .from('classrooms')
          .update({
            delay_minutes: minutes,
            note: mode === 'inasistencia'
              ? 'Ventana expirada • Modo Inasistencia (> 20 min)'
              : mode === 'retardo'
              ? 'Ventana tolerancia • Modo Retardo (11-20 min)'
              : 'Ventana puntual • Modo Normal (0-10 min)',
            sub_note: `QR:${qrToken}:${qrTimestamp}:${mode}`,
            updated_at: new Date().toISOString()
          })
          .eq('id', roomId)
      } catch (e) {
        console.warn('Error al actualizar modo de asistencia en Supabase:', e)
      }
    }
  }

  const metrics = {
    total: students.length,
    presents: students.filter(s => s.status === 'present_qr' || s.status === 'present_manual').length,
    presentsQr: students.filter(s => s.status === 'present_qr').length,
    presentsManual: students.filter(s => s.status === 'present_manual').length,
    lates: students.filter(s => s.status === 'late').length,
    pending: students.filter(s => s.status === 'pending' || s.status === 'in_review').length,
    inReview: students.filter(s => s.status === 'in_review').length,
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
        coordinationAlert,
        clearCoordinationAlert: () => setCoordinationAlert(null),
        logbook,
        cancellationReason,
        cancelClass,
        markManualAttendance,
        saveLogbook,
        executeFinalClosure,
        registerStudentAttendance,
        setAttendanceMode,
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
        validateQrToken,
        parseQrPayload
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

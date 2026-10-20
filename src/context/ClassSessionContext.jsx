import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { supabase } from '../api/supabaseClient'
import { cancelClassroomSession, closeClassroomSession, sendAttendanceLog } from '../api/api'
import { useAuth } from './AuthContext'

const ClassSessionContext = createContext(null)

const INITIAL_STUDENTS = [
  { id: '1', name: 'Alejandro Rojas', ci: 'C.I. 28.451.902', status: 'present_qr', time: '10:02 AM', initials: 'AR' },
  { id: '2', name: 'Mariana Castro', ci: 'C.I. 29.114.839', status: 'present_manual', time: '10:05 AM', contingency: 'Falla en cámara móvil', initials: 'MC' },
  { id: '3', name: 'Daniel Vargas', ci: 'C.I. 27.882.104', status: 'late', time: '10:14 AM', initials: 'DV' },
  { id: '4', name: 'Sofía Linares Mendoza', ci: 'C.I. 30.012.441', status: 'pending', initials: 'SL' },
  { id: '5', name: 'Carlos Mendoza', ci: 'C.I. 28.903.112', status: 'pending', initials: 'CM' },
  { id: '6', name: 'Daniel Álvarez', ci: 'C.I. 29.842.119', status: 'pending', initials: 'DA' },
  { id: '7', name: 'Gabriela Blanco', ci: 'C.I. 28.710.450', status: 'present_qr', time: '10:03 AM', initials: 'GB' },
  { id: '8', name: 'Ricardo Morales', ci: 'C.I. 29.332.109', status: 'present_qr', time: '10:04 AM', initials: 'RM' },
  { id: '9', name: 'Valentina Peña', ci: 'C.I. 28.990.221', status: 'late', time: '10:16 AM', initials: 'VP' },
  { id: '10', name: 'Andrés Gil', ci: 'C.I. 29.001.345', status: 'pending', initials: 'AG' },
  { id: '11', name: 'Lucía Fernández', ci: 'C.I. 28.665.432', status: 'present_qr', time: '10:01 AM', initials: 'LF' },
  { id: '12', name: 'José Martínez', ci: 'C.I. 27.912.834', status: 'present_qr', time: '10:04 AM', initials: 'JM' },
  { id: '13', name: 'Elena Castillo', ci: 'C.I. 29.102.394', status: 'pending', initials: 'EC' },
  { id: '14', name: 'Mauricio Rivas', ci: 'C.I. 28.321.456', status: 'pending', initials: 'MR' },
  { id: '15', name: 'Camila Salazar', ci: 'C.I. 30.123.890', status: 'present_qr', time: '10:02 AM', initials: 'CS' },
  { id: '16', name: 'Fernando Gómez', ci: 'C.I. 28.543.210', status: 'present_qr', time: '10:06 AM', initials: 'FG' },
  { id: '17', name: 'Paola Herrera', ci: 'C.I. 29.654.321', status: 'pending', initials: 'PH' },
  { id: '18', name: 'Javier Navarro', ci: 'C.I. 28.765.432', status: 'present_qr', time: '10:01 AM', initials: 'JN' },
  { id: '19', name: 'Isabella Rondón', ci: 'C.I. 29.876.543', status: 'present_qr', time: '10:05 AM', initials: 'IR' },
  { id: '20', name: 'Diego Paredes', ci: 'C.I. 28.987.654', status: 'pending', initials: 'DP' },
  { id: '21', name: 'Valeria Lugo', ci: 'C.I. 29.098.765', status: 'present_qr', time: '10:03 AM', initials: 'VL' },
  { id: '22', name: 'Sebastián Cruz', ci: 'C.I. 28.109.876', status: 'present_qr', time: '10:04 AM', initials: 'SC' },
  { id: '23', name: 'Natalia Medina', ci: 'C.I. 29.210.987', status: 'pending', initials: 'NM' },
  { id: '24', name: 'Rodrigo Flores', ci: 'C.I. 28.321.098', status: 'present_qr', time: '10:02 AM', initials: 'RF' },
  { id: '25', name: 'Carla Barrios', ci: 'C.I. 29.432.109', status: 'present_qr', time: '10:07 AM', initials: 'CB' },
  { id: '26', name: 'Manuel Ortiz', ci: 'C.I. 28.543.210', status: 'pending', initials: 'MO' },
  { id: '27', name: 'Beatriz Silva', ci: 'C.I. 29.654.321', status: 'present_qr', time: '10:06 AM', initials: 'BS' },
  { id: '28', name: 'Víctor Cordero', ci: 'C.I. 28.765.432', status: 'present_qr', time: '10:01 AM', initials: 'VC' },
  { id: '29', name: 'Daniela Pineda', ci: 'C.I. 29.876.543', status: 'pending', initials: 'DP' },
  { id: '30', name: 'Héctor Quintero', ci: 'C.I. 28.987.654', status: 'present_qr', time: '10:05 AM', initials: 'HQ' },
  { id: '31', name: 'Adriana Márquez', ci: 'C.I. 29.098.765', status: 'present_qr', time: '10:02 AM', initials: 'AM' },
  { id: '32', name: 'Gustavo Leal', ci: 'C.I. 28.109.876', status: 'pending', initials: 'GL' }
]

// Generador determinista de Token Dinámico tipo TOTP sincronizado por bloques de tiempo (15 segundos)
// Permite que la computadora (Profesor) y el teléfono móvil (Estudiante) generen exactamente el mismo token
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
  const isTeacher = auth?.userRole === 'teacher'

  const [sessionStatus, setSessionStatus] = useState('active')

  const [classInfo, setClassInfo] = useState({
    subject: 'Matemáticas',
    section: '4to Año • Sección B',
    classroom: 'Aula 12',
    timeBlock: '07:30 - 09:00 AM',
    teacher: 'Prof. Roberto García',
    qrStatus: 'Activo',
    elapsedMinutes: 5,
    isLive: true
  })

  const [students, setStudents] = useState(INITIAL_STUDENTS)

  const [logbook, setLogbook] = useState({
    subject: 'Matemáticas',
    topic: 'Tema programático del día\nDesarrollo de contenidos y actividades prácticas',
    incidentType: 'Clase sin novedades',
    observations: 'Desarrollo normal de la sesión pedagógica según la planificación curricular. Participación activa de los estudiantes en las actividades propuestas.'
  })

  const [cancellationReason, setCancellationReason] = useState('')
  const [lastIncidentReset, setLastIncidentReset] = useState(null)
  const lastIncidentResetRef = useRef(null)

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
          // Descartar datos obsoletos con materias universitarias o temas cableados anteriores
          if (
            parsed.logbook?.topic?.includes('Racionalización') ||
            parsed.logbook?.subject?.includes('Algoritmos') ||
            parsed.classInfo?.subject?.includes('Algoritmos')
          ) {
            await AsyncStorage.removeItem('asisto_session_state')
            return
          }
          if (parsed.sessionStatus) setSessionStatus(parsed.sessionStatus)
          if (parsed.students) setStudents(parsed.students)
          if (parsed.logbook) setLogbook(parsed.logbook)
        }
      } catch (e) {
        console.warn('Error al restaurar clase offline:', e)
      }
    }
    loadStoredClass()
  }, [])

  // Sincronización en tiempo real con Supabase para resoluciones de justificaciones (HU08)
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
        const studentIncident = data.find(
          item =>
            (item.student_name?.toLowerCase().includes('daniel') ||
             item.student_ci?.includes('29.842.119') ||
             item.student_ci?.includes('28.452.190')) &&
            (!activeResetTime || new Date(item.created_at) > new Date(activeResetTime))
        )

        if (studentIncident) {
          setStudents(prev => {
            const current = prev.find(
              s => s.ci.includes('29.842.119') || s.name.toLowerCase().includes('daniel álvarez')
            )
            if (!current) return prev

            if (
              current.incidentStatus === studentIncident.status &&
              current.incidentFolio === studentIncident.id
            ) {
              return prev
            }

            const updated = prev.map(s => {
              if (s.ci.includes('29.842.119') || s.name.toLowerCase().includes('daniel álvarez')) {
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
  }, [])

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

  // Sincronización multi-dispositivo y compensación de desfase de reloj (PC Docente <-> Móvil Estudiante)
  const [remoteTeacherToken, setRemoteTeacherToken] = useState(null)
  const [remoteTeacherPreviousToken, setRemoteTeacherPreviousToken] = useState(null)
  const [remoteTeacherTimestamp, setRemoteTeacherTimestamp] = useState(null)
  const [clockOffset, setClockOffset] = useState(0)
  const lastKnownTeacherTsRef = useRef(Date.now())

  // Publicar token activo en Supabase para que cualquier dispositivo móvil lo reciba en tiempo real (solo rol docente)
  const publishTeacherToken = async (token, ts) => {
    if (!supabase || !isTeacher) return
    try {
      await supabase
        .from('classrooms')
        .update({ sub_note: `QR:${token}:${ts}` })
        .eq('id', '204')
    } catch (e) {
      // Fallback offline
    }
  }

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
  }, [qrToken, qrTimestamp, isTeacher])

  // Escuchar en tiempo real el token proyectado por el docente en Supabase (HU03/HU07)
  useEffect(() => {
    if (!supabase) return

    const fetchClassroomToken = async () => {
      try {
        const { data } = await supabase
          .from('classrooms')
          .select('sub_note')
          .eq('id', '204')
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
      .channel('mobile_classroom_token_listener')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'classrooms' },
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
  }, [])

  const validateQrToken = (entered) => {
    if (!entered) return false
    const str = entered.toString().trim()
    console.log('[QR Validation] Código recibido:', str)

    // Extraer el token numérico del payload del QR
    let candidate = str
    if (str.includes(':')) {
      const parts = str.split(':')
      // Formato: ASISTO:aula:TOKEN:timestamp
      candidate = parts.length >= 3 ? parts[2] : parts[parts.length - 1]
    }
    const clean = candidate.replace(/[^0-9]/g, '')
    if (!clean || clean.length < 6) return false

    // Validación estricta: SOLO el slot TOTP activo de 15 segundos
    const currentToken = getDynamicQrToken()
    if (clean === currentToken) {
      console.log('[QR Validation] Token válido (slot activo):', currentToken)
      return true
    }

    console.warn('[QR Validation] Token rechazado:', clean, '— Token activo:', currentToken)
    return false
  }

  const cancelClass = async (reason) => {
    setCancellationReason(reason)
    setSessionStatus('cancelled')
    setClassInfo(prev => ({ ...prev, qrStatus: 'Inerte', isLive: false }))
    await persistOffline(students, 'cancelled', logbook)
    await cancelClassroomSession(classInfo.classroom || '204', reason)
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
        classroomId: classInfo.classroom || '204',
        subject: classInfo.subject,
        status: 'presente',
        geofenceVerified: true,
        auditNote: `Manual: ${cause}`
      })
    }
  }

  const registerIncident = async (studentCi, folio, motive, description, fileName) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const updated = students.map(s => {
      if (s.ci.includes(studentCi) || s.name.toLowerCase().includes('daniel álvarez')) {
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
    const newLog = { topic, incidentType, observations }
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
    await closeClassroomSession(classInfo.classroom || '204')
  }

  const registerStudentAttendance = async (studentCi, status, time, observations = null) => {
    const updated = students.map(s => {
      if (s.ci.includes(studentCi) || s.name.toLowerCase().includes('daniel álvarez')) {
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
    await sendAttendanceLog({
      studentCi,
      classroomId: classInfo.classroom || '204',
      subject: classInfo.subject,
      status: (status === 'present_qr' || status === 'present_manual') ? 'presente' : status === 'late' ? 'retardo' : 'ausente'
    })
  }

  const resetSession = async () => {
    const now = new Date().toISOString()
    setLastIncidentReset(now)
    lastIncidentResetRef.current = now
    setSessionStatus('active')
    setClassInfo({
      subject: 'Matemáticas',
      section: '4to Año • Sección B',
      classroom: 'Aula 12',
      timeBlock: '07:30 - 09:00 AM',
      teacher: 'Prof. Roberto García',
      qrStatus: 'Activo',
      elapsedMinutes: 5,
      isLive: true
    })
    setStudents(INITIAL_STUDENTS)
    setCancellationReason('')
    setLogbook({
      subject: 'Matemáticas',
      topic: 'Tema programático del día\nDesarrollo de contenidos y actividades prácticas',
      incidentType: 'Clase sin novedades',
      observations: 'Desarrollo normal de la sesión pedagógica según la planificación curricular. Participación activa de los estudiantes en las actividades propuestas.'
    })
    try {
      await AsyncStorage.removeItem('asisto_session_state')
      await AsyncStorage.setItem('asisto_last_incident_reset', now)
      if (supabase) {
        await supabase
          .from('incidents')
          .delete()
          .ilike('student_name', '%daniel%')
      }
    } catch (e) {
      console.warn('Error al limpiar estado local:', e)
    }
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

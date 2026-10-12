import React, { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { supabase } from '../api/supabaseClient'
import { cancelClassroomSession, closeClassroomSession, sendAttendanceLog } from '../api/api'

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

export function ClassSessionProvider({ children }) {
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

  useEffect(() => {
    async function loadStoredClass() {
      try {
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

  const cancelClass = async (reason) => {
    setCancellationReason(reason)
    setSessionStatus('cancelled')
    setClassInfo(prev => ({ ...prev, qrStatus: 'Inerte', isLive: false }))
    await persistOffline(students, 'cancelled', logbook)
    await cancelClassroomSession('aula-12', reason)
  }

  const markManualAttendance = async (studentId, cause) => {
    const updated = students.map(s => {
      if (s.id === studentId) {
        return {
          ...s,
          status: 'present_manual',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          contingency: cause,
          auditTag: 'Registro Manual por el Profesor'
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
    await closeClassroomSession('aula-12')
  }

  const registerStudentAttendance = async (studentCi, status, time, observations = null) => {
    const updated = students.map(s => {
      if (s.ci.includes(studentCi) || s.name.toLowerCase().includes('daniel álvarez')) {
        return {
          ...s,
          status: status,
          time: time,
          observations: observations
        }
      }
      return s
    })
    setStudents(updated)
    await persistOffline(updated)
    await sendAttendanceLog({
      studentCi,
      classroomId: 'aula-12',
      subject: classInfo.subject,
      status: status === 'present_qr' ? 'presente' : status === 'late' ? 'retardo' : 'ausente'
    })
  }

  const resetSession = async () => {
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
        resetSession
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

import { supabase } from './supabaseClient'

/**
 * Operaciones API móviles para sincronización con Supabase (HU01 - HU10)
 */

// Normalizar ID del aula para coincidir con el ID registrado en la BD de Supabase (ej. '204' para Prof. Roberto García)
export function normalizeClassroomId(id) {
  if (!id) return '204'
  const clean = String(id).trim()
  if (clean.toLowerCase() === 'aula-12' || clean.toLowerCase() === 'aula 12' || clean === '12') {
    return '204'
  }
  return clean
}

// 1. Registrar Asistencia de Estudiante (HU06, HU07, HU08)
export async function sendAttendanceLog({
  studentCi,
  classroomId,
  subject,
  status,
  geofenceVerified = true,
  auditNote = null
}) {
  if (!supabase) return null
  const roomId = normalizeClassroomId(classroomId)
  try {
    let { data, error } = await supabase.from('attendance_logs').insert({
      student_ci: studentCi,
      classroom_id: roomId,
      subject: subject || 'Matemáticas',
      status: status, // 'presente' | 'retardo' | 'ausente' | 'justificado'
      geofence_verified: geofenceVerified,
      scan_timestamp: new Date().toISOString()
    }).select()

    // Si falló por restricción de clave foránea de aula, reintentar con null para no perder el log de asistencia
    if (error && (error.code === '23503' || error.message?.includes('foreign key'))) {
      const retry = await supabase.from('attendance_logs').insert({
        student_ci: studentCi,
        classroom_id: null,
        subject: subject || 'Matemáticas',
        status: status,
        geofence_verified: geofenceVerified,
        scan_timestamp: new Date().toISOString()
      }).select()
      data = retry.data
      error = retry.error
    }

    if (error) console.warn('Aviso al registrar asistencia en Supabase:', error.message)
    return data
  } catch (e) {
    console.warn('Excepción registrando log en Supabase:', e)
    return null
  }
}

// 2. Enviar Incidencia Extemporánea (HU08)
export async function sendIncidentReport({
  studentName = 'Daniel Álvarez',
  studentCi = '29.842.119',
  subject = 'Matemáticas',
  statement,
  pdfName = 'justificativo_asistencia.pdf',
  tagType = 'Salud / Médico'
}) {
  const folio = `INC-2026-${Math.floor(1000 + Math.random() * 9000)}`
  if (!supabase) return { folio, offline: true }

  try {
    const { data, error } = await supabase.from('incidents').insert({
      id: folio,
      time_label: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      student_name: studentName,
      student_ci: studentCi,
      year_level: '4to Año',
      attendance_accum: '94%',
      history_stats: '24 Asistencias / 1 Falta',
      subject: subject,
      subject_short: subject.split(' ')[0],
      teacher: 'Prof. Roberto García',
      room: 'Aula 12',
      scan_time: '10:24 AM (+4 min límite)',
      tag_type: tagType || 'Salud / Médico',
      tag_color: 'amber',
      file_type: pdfName?.toLowerCase().endsWith('.pdf') ? 'Documento PDF' : 'Comprobante Digital',
      statement: statement,
      pdf_name: pdfName || 'justificativo_asistencia.pdf',
      status: 'Pendiente'
    }).select()

    if (error) console.warn('Aviso al enviar justificación a Supabase:', error.message)
    return { folio, data }
  } catch (e) {
    console.warn('Excepción enviando justificación a Supabase:', e)
    return { folio, offline: true }
  }
}

// 3. Cancelar Sesión de Clase (HU02)
export async function cancelClassroomSession(classroomId, reason) {
  if (!supabase) return
  const id = normalizeClassroomId(classroomId)
  const { error } = await supabase.from('classrooms').update({
    status: 'danger',
    status_label: 'Cancelada',
    badge_color: 'red',
    note: `Cancelada: ${reason}`,
    has_action: false
  }).eq('id', id)

  if (error) console.warn('Error al cancelar clase en Supabase:', error.message)
}

// 4. Cerrar Registro de Asistencia (HU05)
export async function closeClassroomSession(classroomId) {
  if (!supabase) return
  const id = normalizeClassroomId(classroomId)
  const { error } = await supabase.from('classrooms').update({
    status: 'normal',
    status_label: 'Registro Cerrado',
    delay_minutes: 0,
    note: 'Cierre completado por docente',
    has_action: false
  }).eq('id', id)

  if (error) console.warn('Error al cerrar clase en Supabase:', error.message)

  // Resolver alertas docentes activas en coordinación
  await supabase.from('teacher_alerts').update({
    status: 'resolved'
  }).eq('classroom_id', id)
}

import { supabase } from './supabaseClient'

/**
 * Operaciones API móviles para sincronización con Supabase (HU01 - HU10)
 */

// 1. Registrar Asistencia de Estudiante (HU06, HU07, HU08)
export async function sendAttendanceLog({ studentCi, classroomId, subject, status, geofenceVerified = true }) {
  if (!supabase) return null
  const { data, error } = await supabase.from('attendance_logs').insert({
    student_ci: studentCi,
    classroom_id: classroomId || 'aula-204',
    subject: subject || 'Algoritmos y Programación',
    status: status, // 'presente' | 'retardo' | 'ausente' | 'justificado'
    geofence_verified: geofenceVerified,
    scan_timestamp: new Date().toISOString()
  }).select()

  if (error) console.warn('Error al registrar asistencia en Supabase:', error.message)
  return data
}

// 2. Enviar Incidencia Extemporánea (HU08)
export async function sendIncidentReport({
  studentName,
  studentCi,
  subject,
  statement,
  pdfName
}) {
  if (!supabase) return null
  const folio = `INC-2026-${Math.floor(1000 + Math.random() * 9000)}`
  const { data, error } = await supabase.from('incidents').insert({
    id: folio,
    time_label: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    student_name: studentName,
    student_ci: studentCi,
    year_level: '5to Año',
    attendance_accum: '94%',
    history_stats: '24 Asistencias / 1 Falta',
    subject: subject,
    subject_short: subject.split(' ')[0],
    teacher: 'Prof. Roberto García',
    room: 'Aula 204',
    scan_time: '10:24 AM (+4 min límite)',
    tag_type: 'Salud / Cita Médica',
    tag_color: 'amber',
    file_type: 'PDF Médico',
    statement: statement,
    pdf_name: pdfName || 'constancia_medica.pdf',
    status: 'Pendiente'
  }).select()

  if (error) console.warn('Error al enviar justificación a Supabase:', error.message)
  return { folio, data }
}

// 3. Cancelar Sesión de Clase (HU02)
export async function cancelClassroomSession(classroomId, reason) {
  if (!supabase) return
  const { error } = await supabase.from('classrooms').update({
    status: 'danger',
    status_label: 'Cancelada',
    badge_color: 'red',
    note: `Cancelada: ${reason}`,
    has_action: false
  }).eq('id', classroomId || 'aula-204')

  if (error) console.warn('Error al cancelar clase en Supabase:', error.message)
}

// 4. Cerrar Registro de Asistencia (HU05)
export async function closeClassroomSession(classroomId) {
  if (!supabase) return
  const { error } = await supabase.from('classrooms').update({
    status: 'normal',
    status_label: 'Registro Cerrado',
    delay_minutes: 0,
    note: 'Cierre completado por docente',
    has_action: false
  }).eq('id', classroomId || 'aula-204')

  if (error) console.warn('Error al cerrar clase en Supabase:', error.message)

  // Resolver alertas docentes activas en coordinación
  await supabase.from('teacher_alerts').update({
    status: 'resolved'
  }).eq('classroom_id', classroomId || 'aula-204')
}

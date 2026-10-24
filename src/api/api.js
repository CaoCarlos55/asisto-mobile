import { supabase } from './supabaseClient'

/**
 * Operaciones API móviles para sincronización con Supabase (HU01 - HU10)
 */

// Normalizar ID del aula para coincidir con las llaves de la BD (ej. '204', '101', '102', '97', '32')
export function normalizeClassroomId(id) {
  if (!id) return '204'
  const clean = String(id).trim()
  const match = clean.match(/\d+/)
  if (match) {
    const num = match[0]
    // Aulas válidas del colegio
    const valid = ['101', '102', '103', '201', '202', '203', '204', '32', '97']
    if (valid.includes(num)) return num
    return num
  }
  return clean
}

// 1. Registrar Asistencia de Estudiante (HU06, HU07, HU08)
// Dispara automáticamente el trigger de PostgreSQL para actualizar el Mapa de Calor Web en tiempo real
export async function sendAttendanceLog({
  studentCi,
  classroomId = '204',
  subject = 'Matemática',
  status = 'presente',
  geofenceVerified = true,
  auditNote = null
}) {
  if (!supabase) return null
  const roomId = normalizeClassroomId(classroomId)

  try {
    let { data, error } = await supabase.from('attendance_logs').insert({
      student_ci: studentCi,
      classroom_id: roomId,
      subject: subject,
      status: status, // 'presente' | 'retardo' | 'ausente' | 'justificado'
      geofence_verified: geofenceVerified,
      scan_timestamp: new Date().toISOString()
    }).select()

    // Si falló por restricción de clave foránea de aula, reintentar con null
    if (error && (error.code === '23503' || error.message?.includes('foreign key'))) {
      const retry = await supabase.from('attendance_logs').insert({
        student_ci: studentCi,
        classroom_id: null,
        subject: subject,
        status: status,
        geofence_verified: geofenceVerified,
        scan_timestamp: new Date().toISOString()
      }).select()
      data = retry.data
      error = retry.error
    }

    if (error) {
      console.warn('Aviso al registrar asistencia en Supabase:', error.message)
    }

    return data
  } catch (e) {
    console.warn('Excepción registrando log en Supabase:', e)
    return null
  }
}

// 2. Enviar Incidencia Extemporánea (HU08)
export async function sendIncidentReport({
  studentName = 'Daniel Álvarez',
  studentCi = 'V-28.452.190',
  yearLevel = '5to Año',
  subject = 'Matemática',
  teacher = 'Prof. Roberto García',
  room = 'Aula 204',
  statement = '',
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
      year_level: yearLevel,
      attendance_accum: '92%',
      history_stats: '28 Asistencias / 1 Falta',
      subject: subject,
      subject_short: subject.split(' ')[0],
      teacher: teacher,
      room: room,
      scan_time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' (+5 min límite)',
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
    has_action: false,
    updated_at: new Date().toISOString()
  }).eq('id', id)

  if (error) console.warn('Error al cancelar clase en Supabase:', error.message)
}

// 4. Cerrar Registro de Asistencia (HU05)
export async function closeClassroomSession(classroomId) {
  if (!supabase) return
  const id = normalizeClassroomId(classroomId)
  const { error } = await supabase.from('classrooms').update({
    status: 'free',
    status_label: 'LIBRE',
    badge_color: 'gray',
    present: 0,
    progress_percent: 0,
    delay_minutes: 0,
    note: 'Clase concluida por docente',
    sub_note: 'Disponible / Sin clase en curso',
    has_action: false,
    updated_at: new Date().toISOString()
  }).eq('id', id)

  if (error) console.warn('Error al cerrar clase en Supabase:', error.message)

  // Resolver alertas docentes activas en coordinación
  await supabase.from('teacher_alerts').update({
    status: 'resolved'
  }).eq('classroom_id', id)
}

// 5. Iniciar Sesión de Clase Docente (Activa el aula en el Mapa de Calor Web)
export async function startClassroomSession({
  classroomId,
  subject,
  teacher,
  enrolled
}) {
  if (!supabase) return
  const id = normalizeClassroomId(classroomId)

  // 1. Consultar cuántos estudiantes reales están asignados a este salón en profiles
  const { data: profStudents } = await supabase
    .from('profiles')
    .select('id')
    .eq('user_type', 'estudiante')
    .eq('classroom_id', id)

  const realEnrolled = (profStudents && profStudents.length > 0)
    ? profStudents.length
    : Math.max(Number(enrolled) || 1, 1)

  // 2. Consultar asistencias reales existentes para este salón hoy
  const { data: recentLogs } = await supabase
    .from('attendance_logs')
    .select('student_ci')
    .eq('classroom_id', id)
    .gte('scan_timestamp', new Date(Date.now() - 12 * 3600 * 1000).toISOString())

  const uniqueCis = new Set((recentLogs || []).map(l => l.student_ci?.trim()).filter(Boolean))
  const presentCount = uniqueCis.size
  const enrolledCount = Math.max(realEnrolled, presentCount > 0 ? presentCount : 1)
  const pct = Math.min(100, Math.round((presentCount / enrolledCount) * 100))

  let status = 'normal'
  let color = 'green'
  let label = 'EN CURSO'

  if (pct < 70 && presentCount > 0 && enrolledCount > 1) {
    status = 'danger'
    color = 'red'
    label = 'ALERTA'
  } else if (pct <= 85 && presentCount > 0 && enrolledCount > 1) {
    status = 'regular'
    color = 'amber'
    label = 'REGULAR'
  } else if (pct >= 85 || presentCount >= enrolledCount) {
    status = 'normal'
    color = 'green'
    label = 'NORMAL'
  }

  const { error } = await supabase.from('classrooms').update({
    status,
    status_label: label,
    badge_color: color,
    subject: subject || 'Matemática',
    teacher: teacher || 'Prof. Roberto García',
    enrolled: enrolledCount,
    present: presentCount,
    progress_percent: pct,
    delay_minutes: 0,
    note: presentCount === 0 
      ? 'Clase iniciada • Esperando escaneos QR' 
      : `Asistencia en vivo: ${presentCount}/${enrolledCount} alumnos`,
    sub_note: 'Sesión activa iniciada desde App Docente',
    has_action: false,
    action_text: null,
    updated_at: new Date().toISOString()
  }).eq('id', id)

  if (error) console.warn('Aviso iniciando sesión de aula en Supabase:', error.message)
}

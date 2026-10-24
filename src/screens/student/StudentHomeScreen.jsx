import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native'
import { QrCode, FileText, ChevronRight, AlertCircle, LogOut, Check, RotateCcw } from 'lucide-react-native'
import { useAuth } from '../../context/AuthContext'
import { useClassSession } from '../../context/ClassSessionContext'
import { styles } from '../../styles/student/StudentHome.styles'

export default function StudentHomeScreen({ navigation }) {
  const { currentUser, logout } = useAuth()
  const { classInfo, sessionStatus, students, resetStudentAttendance } = useClassSession()

  const studentCi = currentUser?.ci || 'V-28.452.190'
  const studentFirstName = currentUser?.name ? currentUser.name.split(' ')[0] : 'Estudiante'

  const studentRecord = students.find(
    s => (currentUser?.ci && s.ci?.includes(currentUser.ci.replace(/[^0-9]/g, ''))) ||
         (currentUser?.name && s.name?.toLowerCase().includes(currentUser.name.toLowerCase()))
  ) || students[0]

  const isPresent = studentRecord?.status === 'present_qr' || studentRecord?.status === 'present_manual'
  const isLate = studentRecord?.status === 'late'
  const isInReview = studentRecord?.status === 'in_review'
  const isRejected = studentRecord?.status === 'rejected' || studentRecord?.incidentStatus === 'Rechazada'
  const isApproved = studentRecord?.incidentStatus === 'Aprobada'
  const isClosed = sessionStatus === 'closed' || sessionStatus === 'cancelled'

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header con Perfil de Alumno y Geocerca */}
        <View style={styles.header}>
          <View style={styles.profileRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{currentUser?.initials || 'DA'}</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.greeting}>¡Hola, {studentFirstName}!</Text>
              <Text style={styles.name} numberOfLines={1}>{currentUser?.name || 'Daniel Álvarez'}</Text>
            </View>
          </View>

          <View style={styles.headerRight}>
            <View style={styles.geofencePill}>
              <View style={styles.greenDot} />
              <Text style={styles.geofenceText}>En Plantel</Text>
            </View>
            <TouchableOpacity onPress={logout} style={styles.logoutBtn} activeOpacity={0.7} accessibilityLabel="Cerrar sesión">
              <LogOut size={18} color="#64748b" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tarjeta de Clase en Curso */}
        <View style={styles.currentClassCard}>
          <View style={styles.classCardHeader}>
            <View style={styles.inCourseBadge}>
              <Text style={styles.inCourseText}>
                {isClosed
                  ? 'SESIÓN FINALIZADA'
                  : isRejected
                  ? 'JUSTIFICACIÓN RECHAZADA'
                  : isApproved
                  ? 'JUSTIFICACIÓN APROBADA'
                  : isInReview
                  ? 'JUSTIFICACIÓN EN CURSO'
                  : 'CLASE EN CURSO AHORA'}
              </Text>
            </View>
            <Text style={styles.minuteBadge}>
              {isClosed
                ? 'Registro Cerrado'
                : isRejected
                ? 'Inasistencia Confirmada'
                : isApproved
                ? 'Asistencia Convalidada'
                : isInReview
                ? 'En Revisión Coord.'
                : 'Minuto 4 / 10'}
            </Text>
          </View>

          <Text style={styles.subjectTitle}>{classInfo.subject}</Text>
          <Text style={styles.teacherSub}>{classInfo.section} • {classInfo.teacher}</Text>
          <Text style={styles.roomSub}>
            {classInfo.classroom} • Bloque {classInfo.timeBlock}
          </Text>

          {isRejected ? (
            <View style={styles.closedAlert}>
              <AlertCircle size={15} color="#b91c1c" style={styles.alertIcon} />
              <View style={styles.alertTextBox}>
                <Text style={styles.closedAlertText}>
                  Justificación Rechazada por Coord. ({studentRecord?.incidentFolio || '#INC-2026-0842'})
                </Text>
                <Text style={styles.closedAlertSub}>
                  Inasistencia confirmada. {studentRecord?.incidentNotes ? `Dictamen: "${studentRecord.incidentNotes}"` : ''}
                </Text>
              </View>
            </View>
          ) : isApproved ? (
            <View style={styles.registeredAlert}>
              <Check size={15} color="#15803d" style={styles.alertIcon} />
              <View style={styles.alertTextBox}>
                <Text style={styles.registeredAlertText}>
                  ¡Justificación Aprobada por Coord.! ({studentRecord?.incidentFolio || '#INC-2026-0842'})
                </Text>
                <Text style={styles.approvedAlertSub}>
                  Asistencia convalidada oficialmente. {studentRecord?.incidentNotes ? `Nota: "${studentRecord.incidentNotes}"` : ''}
                </Text>
              </View>
            </View>
          ) : isPresent ? (
            <View style={styles.registeredAlert}>
              <Check size={15} color="#15803d" style={styles.alertIcon} />
              <Text style={styles.registeredAlertText}>
                ¡Asistencia confirmada para la clase de hoy!
              </Text>
            </View>
          ) : isLate ? (
            <View style={styles.unregisteredAlert}>
              <AlertCircle size={15} color="#b45309" style={styles.alertIcon} />
              <Text style={styles.unregisteredAlertText}>
                Asistencia registrada con Retardo (Min 14)
              </Text>
            </View>
          ) : isInReview ? (
            <View style={styles.registeredAlert}>
              <AlertCircle size={15} color="#1d4ed8" style={styles.alertIcon} />
              <Text style={styles.registeredAlertText}>
                Justificación en revisión Coord. ({studentRecord?.incidentFolio || '#INC-2026-0842'})
              </Text>
            </View>
          ) : isClosed ? (
            <View style={styles.closedAlert}>
              <AlertCircle size={15} color="#b91c1c" style={styles.alertIcon} />
              <Text style={styles.closedAlertText}>
                Sesión cerrada por el profesor • Estado: Inasistencia
              </Text>
            </View>
          ) : (
            <View style={styles.unregisteredAlert}>
              <AlertCircle size={15} color="#b45309" style={styles.alertIcon} />
              <Text style={styles.unregisteredAlertText}>
                Aún no has registrado asistencia
              </Text>
            </View>
          )}
        </View>

        {/* Botón Principal de Escaneo QR (HU06, HU07, HU08) */}
        <TouchableOpacity
          style={styles.scanBtn}
          onPress={() => {
            if (isClosed) {
              Alert.alert(
                'Sesión Cerrada',
                'El docente ya ejecutó el cierre definitivo de registro. El código QR ha quedado inerte y los alumnos pendientes pasaron a Inasistencia.'
              )
            } else {
              navigation.navigate('StudentScanner')
            }
          }}
          activeOpacity={0.88}
        >
          <View style={styles.scanIconBox}>
            <QrCode size={24} color="#1d4ed8" />
          </View>
          <View style={styles.scanBtnInfo}>
            <Text style={styles.scanBtnTitle}>Escanear Código QR</Text>
            <Text style={styles.scanBtnSub}>
              {isClosed ? 'Sesión cerrada • QR Inerte' : 'Enfoca el código del profesor'}
            </Text>
          </View>
          <ChevronRight size={22} color="#ffffff" />
        </TouchableOpacity>

        {/* Tu Asistencia Global del Año Escolar */}
        <View style={styles.attendanceCard}>
          <Text style={styles.attendanceCardTitle}>TU ASISTENCIA DEL AÑO ESCOLAR</Text>

          <View style={styles.attendanceStatsRow}>
            <View>
              <Text style={styles.attendancePct}>94%</Text>
              <Text style={styles.attendanceGrade}>Excelente</Text>
              <Text style={styles.attendanceStatus}>Estado Regular</Text>
            </View>

            <View style={styles.attendanceStatsRight}>
              <Text style={styles.attendanceCount}>24 Asistencias</Text>
              <Text style={styles.attendanceFails}>1 Retardo • 1 Falta</Text>
            </View>
          </View>

          <View style={styles.progressBarBg}>
            <View style={styles.progressBarFill} />
          </View>
        </View>

        {/* Consultar Asistencia */}
        <TouchableOpacity
          style={styles.historyBtn}
          onPress={() => navigation.navigate('StudentHistory')}
          activeOpacity={0.8}
        >
          <View style={styles.historyIconBox}>
            <FileText size={20} color="#1e3a8a" />
          </View>
          <View style={styles.historyInfo}>
            <Text style={styles.historyTitle}>Consultar Asistencia</Text>
            <Text style={styles.historySub}>Historial, justificaciones y faltas</Text>
          </View>
          <ChevronRight size={20} color="#94a3b8" />
        </TouchableOpacity>

        <Text style={styles.footerNote}>
          Recuerda escanear durante los primeros 10 min para registrar asistencia sin penalización
        </Text>

        {/* Botón Reiniciar Simulación de Prueba */}
        <TouchableOpacity
          style={styles.resetSimBtn}
          onPress={async () => {
            await resetStudentAttendance(studentCi, classInfo.classroomId)
            Alert.alert(
              'Estado del Alumno Reiniciado',
              'Tu asistencia y justificaciones se han limpiado en la nube. Ya puedes probar nuevamente el escaneo del código QR.'
            )
          }}
          activeOpacity={0.8}
        >
          <RotateCcw size={16} color="#475569" style={styles.alertIcon} />
          <Text style={styles.resetSimBtnText}>Reiniciar Estado del Alumno (Probar de nuevo)</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

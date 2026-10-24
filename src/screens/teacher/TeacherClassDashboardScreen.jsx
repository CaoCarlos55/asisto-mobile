import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  StatusBar
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { QrCode, Users, FileText, User, ChevronRight, Clock, RotateCcw, LogOut, AlertTriangle } from 'lucide-react-native'
import { useAuth } from '../../context/AuthContext'
import { useClassSession } from '../../context/ClassSessionContext'
import { startClassroomSession, closeClassroomSession } from '../../api/api'
import { styles } from '../../styles/teacher/TeacherClassDashboard.styles'

export default function TeacherClassDashboardScreen({ navigation }) {
  const { logout, currentUser } = useAuth()
  const { classInfo, metrics, resetSession, coordinationAlert, setAttendanceMode } = useClassSession()

  const activeMode = classInfo.attendanceMode || (classInfo.elapsedMinutes > 20 ? 'inasistencia' : classInfo.elapsedMinutes > 10 ? 'retardo' : 'normal')

  // Sincronizar aula activa en la nube al ingresar a la pantalla
  React.useEffect(() => {
    if (currentUser && classInfo.classroomId) {
      startClassroomSession({
        classroomId: classInfo.classroomId,
        subject: classInfo.subject,
        teacher: classInfo.teacher,
        enrolled: metrics.total || 1
      })
    }
  }, [classInfo.classroomId, classInfo.subject, classInfo.teacher, metrics.total, currentUser])

  const progressPercent = `${Math.min(100, Math.round((metrics.presents / (metrics.total || 1)) * 100))}%`

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Deseas cerrar tu sesión como docente? El aula quedará en estado disponible.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: async () => {
            await closeClassroomSession(classInfo.classroomId)
            await logout()
          }
        }
      ]
    )
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="#183b7e" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Cabecera Azul de la Clase en Curso */}
        <View style={styles.headerSection}>
          <View style={styles.topStatusRow}>
            <View style={styles.livePill}>
              <View style={styles.whiteDot} />
              <Text style={styles.livePillText}>CLASE EN CURSO</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <View style={styles.onlineRow}>
                <View style={styles.onlineDot} />
                <Text style={styles.onlineText}>En línea</Text>
              </View>

              <TouchableOpacity
                onPress={handleLogout}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  backgroundColor: 'rgba(255, 255, 255, 0.18)',
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 8
                }}
                activeOpacity={0.75}
                accessibilityLabel="Cerrar sesión"
              >
                <LogOut size={13} color="#ffffff" />
                <Text style={{ color: '#ffffff', fontSize: 12, fontWeight: '700' }}>Salir</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.classTitle}>{classInfo.subject}</Text>
          <Text style={styles.classSubtitle}>
            {classInfo.teacher} • {classInfo.section} • {classInfo.classroom}
          </Text>

          <View style={styles.elapsedRow}>
            <Clock size={14} color="#bfdbfe" style={styles.elapsedIcon} />
            <Text style={styles.elapsedText}>
              Tiempo transcurrido: {classInfo.elapsedMinutes || 5} min ({
                activeMode === 'inasistencia'
                  ? 'Modo Inasistencia'
                  : activeMode === 'retardo'
                  ? 'Modo Retardo'
                  : 'Ventana Puntual'
              })
            </Text>
          </View>
        </View>

        {/* Contenedor del Cuerpo con Fondo Claro */}
        <View style={styles.bodySection}>
          {/* Banner de Alerta de Coordinación */}
          {coordinationAlert && (
            <View style={styles.alertBanner}>
              <AlertTriangle size={20} color="#b45309" />
              <View style={{ flex: 1 }}>
                <Text style={styles.alertBannerTitle}>ALERTA DE COORDINACIÓN</Text>
                <Text style={styles.alertBannerText}>{coordinationAlert}</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('TeacherCloseClass')}
                style={styles.alertBannerBtn}
                activeOpacity={0.8}
              >
                <Text style={styles.alertBannerBtnText}>Cerrar Nómina</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Selector Rápido de Modo de Asistencia (HU06, HU07, HU08) */}
          <View style={styles.dashboardModeCard}>
            <View style={styles.dashboardModeHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Clock size={15} color="#1e40af" />
                <Text style={styles.dashboardModeTitle}>HORA Y MODO DE LA CLASE</Text>
              </View>
              <View
                style={[
                  styles.dashboardModePill,
                  activeMode === 'inasistencia'
                    ? styles.modeBadgeRed
                    : activeMode === 'retardo'
                    ? styles.modeBadgeAmber
                    : styles.modeBadgeGreen
                ]}
              >
                <Text style={styles.dashboardModePillText}>
                  {activeMode === 'inasistencia'
                    ? 'MODO INASISTENCIA'
                    : activeMode === 'retardo'
                    ? 'MODO RETARDO'
                    : 'MODO PUNTUAL'}
                </Text>
              </View>
            </View>

            <View style={styles.dashboardModeButtonsRow}>
              <TouchableOpacity
                style={[
                  styles.dashboardModeBtn,
                  activeMode === 'normal' && styles.dashboardModeBtnActiveGreen
                ]}
                onPress={() => setAttendanceMode('normal')}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.dashboardModeBtnText,
                    activeMode === 'normal' && styles.dashboardModeBtnTextActive
                  ]}
                >
                  Puntual (0-10m)
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.dashboardModeBtn,
                  activeMode === 'retardo' && styles.dashboardModeBtnActiveAmber
                ]}
                onPress={() => setAttendanceMode('retardo')}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.dashboardModeBtnText,
                    activeMode === 'retardo' && styles.dashboardModeBtnTextActive
                  ]}
                >
                  Modo Retardo (15m)
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.dashboardModeBtn,
                  activeMode === 'inasistencia' && styles.dashboardModeBtnActiveRed
                ]}
                onPress={() => setAttendanceMode('inasistencia')}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.dashboardModeBtnText,
                    activeMode === 'inasistencia' && styles.dashboardModeBtnTextActive
                  ]}
                >
                  Modo Inasistencia (&gt;20m)
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Tarjeta de Asistencia en Vivo */}
          <View style={styles.kpiCard}>
            <Text style={styles.kpiCardTitle}>ASISTENCIA REGISTRADA EN VIVO</Text>

            <View style={styles.kpiRow}>
              <View style={styles.kpiItem}>
                <Text style={styles.kpiValuePresent}>{metrics.presents}</Text>
                <Text style={styles.kpiLabelPresent}>Presentes</Text>
              </View>
              <View style={styles.kpiItem}>
                <Text style={styles.kpiValueLate}>{metrics.lates}</Text>
                <Text style={styles.kpiLabelLate}>Retardos</Text>
              </View>
              <View style={styles.kpiItem}>
                <Text style={styles.kpiValuePending}>{metrics.pending}</Text>
                <Text style={styles.kpiLabelPending}>Pendientes</Text>
              </View>
            </View>

            {/* Barra de progreso */}
            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: progressPercent }
                ]}
              />
            </View>
          </View>

          {/* Módulos de Control de Aula */}
          <Text style={styles.sectionTitle}>MÓDULOS DE CONTROL DE AULA</Text>

          {/* 1. Pase de Lista QR */}
          <TouchableOpacity
            style={styles.moduleCard}
            onPress={() => navigation.navigate('TeacherQR')}
            activeOpacity={0.8}
          >
            <View style={styles.moduleIconBoxBlue}>
              <QrCode size={22} color="#1d4ed8" />
            </View>
            <View style={styles.moduleInfo}>
              <Text style={styles.moduleTitle}>Pase de Lista QR</Text>
              <Text style={styles.moduleDesc}>Código estático visible para escaneo</Text>
              <View style={styles.qrStatusMini}>
                <View style={styles.greenMiniDot} />
                <Text style={styles.qrStatusMiniText}>Estado QR: {classInfo.qrStatus}</Text>
              </View>
            </View>
            <View style={styles.chevronCircle}>
              <ChevronRight size={16} color="#64748b" />
            </View>
          </TouchableOpacity>

          {/* 2. Control de Nómina */}
          <TouchableOpacity
            style={styles.moduleCard}
            onPress={() => navigation.navigate('TeacherRoster')}
            activeOpacity={0.8}
          >
            <View style={styles.moduleIconBoxGreen}>
              <Users size={22} color="#1d4ed8" />
            </View>
            <View style={styles.moduleInfo}>
              <Text style={styles.moduleTitle}>Control de Nómina</Text>
              <Text style={styles.moduleDesc}>
                {metrics.total} alumnos • Marcado manual auditado
              </Text>
              <Text style={styles.offlineTag}>Soporte Offline-First Activo</Text>
            </View>
            <View style={styles.chevronCircle}>
              <ChevronRight size={16} color="#64748b" />
            </View>
          </TouchableOpacity>

          {/* 3. Bitácora e Incidencias */}
          <TouchableOpacity
            style={styles.moduleCard}
            onPress={() => navigation.navigate('TeacherLogbook')}
            activeOpacity={0.8}
          >
            <View style={styles.moduleIconBoxGray}>
              <FileText size={22} color="#475569" />
            </View>
            <View style={styles.moduleInfo}>
              <Text style={styles.moduleTitle}>Bitácora e Incidencias</Text>
              <Text style={styles.moduleDesc}>
                Documentar tema dictado u observaciones | registro opcional
              </Text>
            </View>
            <View style={styles.chevronCircle}>
              <ChevronRight size={16} color="#64748b" />
            </View>
          </TouchableOpacity>

          {/* Botón Cierre Definitivo de Registro (HU05) */}
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => navigation.navigate('TeacherCloseModal')}
            activeOpacity={0.85}
          >
            <View style={styles.closeBtnContent}>
              <User size={18} color="#ffffff" style={styles.btnIcon} />
              <Text style={styles.closeBtnText}>Cierre Definitivo de Registro</Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.closeBtnNote}>
            Bloquea la nómina, invalida el QR y envía a Coordinación
          </Text>

          {/* Botón Reiniciar Nómina de Prueba */}
          <TouchableOpacity
            style={styles.resetSimBtn}
            onPress={async () => {
              await resetSession({ cleanAttendance: true })
              Alert.alert('Nómina y QR Reiniciados', 'La nómina, asistencias en la nube y el código QR han vuelto al estado inicial de prueba (0 presentes).')
            }}
            activeOpacity={0.8}
          >
            <RotateCcw size={16} color="#64748b" style={styles.btnIcon} />
            <Text style={styles.resetSimBtnText}>Reiniciar Nómina y QR (Modo Prueba)</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

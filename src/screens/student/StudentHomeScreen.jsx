import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from 'react-native'
import { QrCode, FileText, ChevronRight, AlertCircle, LogOut } from 'lucide-react-native'
import { useAuth } from '../../context/AuthContext'
import { useClassSession } from '../../context/ClassSessionContext'
import { styles } from '../../styles/student/StudentHome.styles'

export default function StudentHomeScreen({ navigation }) {
  const { currentUser, logout } = useAuth()
  const { classInfo } = useClassSession()

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header con Perfil de Alumno y Geocerca */}
        <View style={styles.header}>
          <View style={styles.profileRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{currentUser?.initials || 'DA'}</Text>
            </View>
            <View>
              <Text style={styles.greeting}>¡Hola, Daniel!</Text>
              <Text style={styles.name}>{currentUser?.name || 'Daniel Álvarez'}</Text>
            </View>
          </View>

          <View style={styles.headerRight}>
            <View style={styles.geofencePill}>
              <View style={styles.greenDot} />
              <Text style={styles.geofenceText}>En el Plantel (Aula 12)</Text>
            </View>
            <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
              <LogOut size={18} color="#64748b" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tarjeta de Clase en Curso */}
        <View style={styles.currentClassCard}>
          <View style={styles.classCardHeader}>
            <View style={styles.inCourseBadge}>
              <Text style={styles.inCourseText}>CLASE EN CURSO AHORA</Text>
            </View>
            <Text style={styles.minuteBadge}>Minuto 4 / 10</Text>
          </View>

          <Text style={styles.subjectTitle}>{classInfo.subject}</Text>
          <Text style={styles.teacherSub}>{classInfo.section} • {classInfo.teacher}</Text>
          <Text style={styles.roomSub}>
            {classInfo.classroom} • Bloque {classInfo.timeBlock}
          </Text>

          <View style={styles.unregisteredAlert}>
            <AlertCircle size={15} color="#b45309" style={styles.alertIcon} />
            <Text style={styles.unregisteredAlertText}>
              Aún no has registrado asistencia
            </Text>
          </View>
        </View>

        {/* Botón Principal de Escaneo QR (HU06, HU07, HU08) */}
        <TouchableOpacity
          style={styles.scanBtn}
          onPress={() => navigation.navigate('StudentScanner')}
          activeOpacity={0.88}
        >
          <View style={styles.scanIconBox}>
            <QrCode size={24} color="#1d4ed8" />
          </View>
          <View style={styles.scanBtnInfo}>
            <Text style={styles.scanBtnTitle}>Escanear Código QR</Text>
            <Text style={styles.scanBtnSub}>Enfoca el código del profesor</Text>
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
      </ScrollView>
    </SafeAreaView>
  )
}

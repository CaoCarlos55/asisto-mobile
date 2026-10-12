import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert
} from 'react-native'
import { QrCode, Users, FileText, Lock, ChevronRight, Clock, RotateCcw } from 'lucide-react-native'
import { useClassSession } from '../../context/ClassSessionContext'
import { styles } from '../../styles/teacher/TeacherClassDashboard.styles'

export default function TeacherClassDashboardScreen({ navigation }) {
  const { classInfo, metrics, resetSession } = useClassSession()

  const progressPercent = `${Math.min(100, Math.round((metrics.presents / (metrics.total || 1)) * 100))}%`

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Cabecera de la Clase en Curso */}
        <View style={styles.headerSection}>
          <View style={styles.topStatusRow}>
            <View style={styles.livePill}>
              <View style={styles.greenDot} />
              <Text style={styles.livePillText}>CLASE EN CURSO</Text>
            </View>

            <View style={styles.onlinePill}>
              <View style={styles.blueDot} />
              <Text style={styles.onlinePillText}>En línea</Text>
            </View>
          </View>

          <Text style={styles.classTitle}>{classInfo.subject}</Text>
          <Text style={styles.classSubtitle}>
            {classInfo.section} • {classInfo.classroom} • {classInfo.timeBlock}
          </Text>

          <View style={styles.elapsedRow}>
            <Clock size={14} color="#64748b" style={styles.elapsedIcon} />
            <Text style={styles.elapsedText}>
              Tiempo transcurrido: {classInfo.elapsedMinutes} min (Ventana Tolerancia)
            </Text>
          </View>
        </View>

        {/* Tarjeta de Asistencia en Vivo */}
        <View style={styles.kpiCard}>
          <Text style={styles.kpiCardTitle}>ASISTENCIA REGISTRADA EN VIVO</Text>

          <View style={styles.kpiRow}>
            <View style={styles.kpiItem}>
              <Text style={styles.kpiValuePresent}>{metrics.presents}</Text>
              <Text style={styles.kpiLabel}>Presentes</Text>
            </View>
            <View style={styles.kpiItem}>
              <Text style={styles.kpiValueLate}>{metrics.lates}</Text>
              <Text style={styles.kpiLabel}>Retardos</Text>
            </View>
            <View style={styles.kpiItem}>
              <Text style={styles.kpiValuePending}>{metrics.pending}</Text>
              <Text style={styles.kpiLabel}>Pendientes</Text>
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
          <ChevronRight size={20} color="#94a3b8" />
        </TouchableOpacity>

        {/* 2. Control de Nómina */}
        <TouchableOpacity
          style={styles.moduleCard}
          onPress={() => navigation.navigate('TeacherRoster')}
          activeOpacity={0.8}
        >
          <View style={styles.moduleIconBoxGreen}>
            <Users size={22} color="#059669" />
          </View>
          <View style={styles.moduleInfo}>
            <Text style={styles.moduleTitle}>Control de Nómina</Text>
            <Text style={styles.moduleDesc}>
              {metrics.total} alumnos • Marcado manual auditado
            </Text>
            <Text style={styles.offlineTag}>Soporte Offline-First Activo</Text>
          </View>
          <ChevronRight size={20} color="#94a3b8" />
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
          <ChevronRight size={20} color="#94a3b8" />
        </TouchableOpacity>

        {/* Botón Cierre Definitivo de Registro (HU05) */}
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => navigation.navigate('TeacherCloseModal')}
          activeOpacity={0.85}
        >
          <View style={styles.closeBtnContent}>
            <Lock size={18} color="#ffffff" style={styles.btnIcon} />
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
            await resetSession()
            Alert.alert('Nómina Reiniciada', 'La nómina, asistencias y código QR han vuelto al estado inicial de prueba.')
          }}
          activeOpacity={0.8}
        >
          <RotateCcw size={16} color="#64748b" style={styles.btnIcon} />
          <Text style={styles.resetSimBtnText}>Reiniciar Nómina y QR (Modo Prueba)</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { Clock, AlertTriangle, RefreshCw, LogOut, MapPin } from 'lucide-react-native'
import { useAuth } from '../../context/AuthContext'
import { useClassSession } from '../../context/ClassSessionContext'
import { styles } from '../../styles/teacher/TeacherOutOfSchedule.styles'

export default function TeacherOutOfScheduleScreen({ navigation }) {
  const { currentUser, logout } = useAuth()
  const { resetSession } = useClassSession()

  const handleSimulateClassStart = async () => {
    await resetSession()
    navigation.navigate('TeacherDashboard')
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.centerContainer}>
        {/* Top Header con perfil docente */}
        <View style={styles.header}>
          <View style={styles.profileRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{currentUser?.initials || 'RG'}</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName} numberOfLines={1}>{currentUser?.name || 'Prof. Roberto García'}</Text>
              <Text style={styles.profileDept} numberOfLines={1}>{currentUser?.dept || 'Área de Matemáticas • Año Escolar 2025-2026'}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={logout} style={styles.logoutBtn} activeOpacity={0.7} accessibilityLabel="Cerrar sesión">
            <LogOut size={18} color="#64748b" />
          </TouchableOpacity>
        </View>

        {/* Bloque Central de Estado Deshabilitado (HU01 Escenario 2) */}
        <View style={styles.centerCard}>
          <View style={styles.clockIconContainer}>
            <Clock size={40} color="#64748b" />
            <View style={styles.warningMiniBadge}>
              <AlertTriangle size={14} color="#ffffff" />
            </View>
          </View>

          <Text style={styles.centerTitle}>Sin clases programadas</Text>
          <Text style={styles.centerTag}>FUERA DEL BLOQUE OFICIAL</Text>

          <Text style={styles.centerDesc}>
            La hora actual del servidor institucional no coincide con el horario de tus asignaturas.
            {'\n\n'}
            El pase de lista y el código QR se habilitarán automáticamente al iniciar tu siguiente sesión.
          </Text>

          {/* Reloj de Servidor */}
          <View style={styles.serverTimePill}>
            <View style={styles.greenDot} />
            <Text style={styles.serverTimeText}>Reloj Servidor: Martes 29 Sep • 07:11 AM</Text>
          </View>
        </View>

        {/* Tarjeta de Próxima Clase */}
        <View style={styles.nextClassCard}>
          <Text style={styles.nextClassLabel}>PRÓXIMA CLASE EN CALENDARIO</Text>
          <Text style={styles.nextClassTitle}>Matemáticas</Text>
          <Text style={styles.nextClassSub}>4to Año • Sección B</Text>

          <View style={styles.badgeRow}>
            <View style={styles.badgeItem}>
              <MapPin size={13} color="#b91c1c" />
              <Text style={styles.badgeText}>Aula 12</Text>
            </View>
            <View style={styles.badgeItem}>
              <Clock size={13} color="#64748b" />
              <Text style={styles.badgeText}>07:30 - 09:00 AM</Text>
            </View>
            <View style={[styles.badgeItem, styles.badgeHighlight]}>
              <Text style={styles.badgeHighlightText}>En 19 min</Text>
            </View>
          </View>
        </View>

        {/* Botón Verificar / Simular Apertura de Clase */}
        <TouchableOpacity
          style={styles.verifyBtn}
          onPress={handleSimulateClassStart}
          activeOpacity={0.8}
        >
          <RefreshCw size={18} color="#1e3a8a" style={styles.btnIcon} />
          <Text style={styles.verifyBtnText}>Iniciar Clase (Restaurar Nómina)</Text>
        </TouchableOpacity>

        <Text style={styles.footerNote}>
          Si tienes una clase no reflejada, contacta a Coordinación
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}

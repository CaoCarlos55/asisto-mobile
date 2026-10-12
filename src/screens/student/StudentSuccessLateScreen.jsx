import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from 'react-native'
import { Clock, AlertTriangle } from 'lucide-react-native'
import { useClassSession } from '../../context/ClassSessionContext'
import { styles } from '../../styles/student/StudentSuccessLate.styles'

export default function StudentSuccessLateScreen({ navigation }) {
  const { classInfo } = useClassSession()

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.centerContainer}>
        {/* Icono de Retardo circular naranja */}
        <View style={styles.resultIconCircle}>
          <Clock size={48} color="#ffffff" strokeWidth={2.5} />
        </View>

        <Text style={styles.resultTitle}>Registro con Retardo</Text>

        <View style={styles.frontierPill}>
          <View style={styles.amberDot} />
          <Text style={styles.frontierPillText}>FRONTERA (11-20 MIN)</Text>
        </View>

        {/* Caja de Aviso de Reglamento Académico */}
        <View style={styles.warningBox}>
          <AlertTriangle size={18} color="#d97706" style={styles.warningIcon} />
          <View style={styles.warningContent}>
            <Text style={styles.warningTitle}>Aviso de Reglamento Académico</Text>
            <Text style={styles.warningText}>
              3 retardos = 1 inasistencia.{'\n'}
              Límite de tolerancia superado.
            </Text>
          </View>
        </View>

        {/* Tarjeta de Detalle del Registro */}
        <View style={styles.resultCard}>
          <Text style={styles.cardHeader}>DETALLE DEL REGISTRO</Text>

          <Text style={styles.fieldLabel}>Asignatura</Text>
          <Text style={styles.fieldValue}>{classInfo.subject}</Text>
          <Text style={styles.fieldSub}>{classInfo.teacher} • {classInfo.classroom}</Text>

          <View style={styles.divider} />

          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.fieldLabel}>Hora de Escaneo</Text>
              <Text style={styles.timeValue}>10:14:18 AM</Text>
              <Text style={styles.fieldSub}>Minuto 14 (Ventana Frontera)</Text>
            </View>

            <View style={styles.statusBox}>
              <Text style={styles.statusLabel}>ESTADO ASIGNADO</Text>
              <Text style={styles.statusValue}>RETARDO</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.recordHeader}>
            <Text style={styles.recordTitle}>Récord en la Materia:</Text>
            <Text style={styles.recordCount}>2 de 3 retardos</Text>
          </View>

          <View style={styles.progressBarBg}>
            <View style={styles.progressBarFill} />
          </View>
        </View>

        {/* Botones */}
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigation.navigate('StudentHome')}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryBtnText}>Entendido, ir al Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => navigation.navigate('StudentHistory')}
          activeOpacity={0.85}
        >
          <Text style={styles.secondaryBtnText}>Consultar Mi Historial</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

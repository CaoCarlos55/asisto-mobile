import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from 'react-native'
import { Check } from 'lucide-react-native'
import { useClassSession } from '../../context/ClassSessionContext'
import { styles } from '../../styles/student/StudentSuccessPresent.styles'

export default function StudentSuccessPresentScreen({ navigation }) {
  const { classInfo } = useClassSession()

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.centerContainer}>
        {/* Icono de éxito */}
        <View style={styles.resultIconCircle}>
          <Check size={48} color="#ffffff" strokeWidth={3} />
        </View>

        <Text style={styles.resultTitle}>¡Asistencia Registrada!</Text>

        <View style={styles.tolerancePill}>
          <View style={styles.greenDot} />
          <Text style={styles.tolerancePillText}>TOLERANCIA (0-10 MIN)</Text>
        </View>

        {/* Tarjeta de Comprobante Académico */}
        <View style={styles.resultCard}>
          <Text style={styles.cardHeader}>COMPROBANTE ACADÉMICO</Text>

          <Text style={styles.fieldLabel}>Asignatura</Text>
          <Text style={styles.fieldValue}>{classInfo.subject}</Text>
          <Text style={styles.fieldSub}>{classInfo.section} • Año Escolar 2025-2026</Text>

          <View style={styles.divider} />

          <Text style={styles.fieldLabel}>Docente y Aula</Text>
          <Text style={styles.fieldValue}>{classInfo.teacher}</Text>
          <Text style={styles.fieldSub}>{classInfo.classroom} • Sede Principal</Text>

          <View style={styles.divider} />

          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.fieldLabel}>Hora de Registro</Text>
              <Text style={styles.timeValue}>10:05:42 AM</Text>
              <Text style={styles.fieldSub}>Minuto 5 de tolerancia</Text>
            </View>

            <View style={styles.statusBox}>
              <Text style={styles.statusLabel}>ESTADO FINAL</Text>
              <Text style={styles.statusValue}>PRESENTE</Text>
            </View>
          </View>

          <View style={styles.qrGpsPill}>
            <View style={styles.greenDot} />
            <Text style={styles.qrGpsText}>Validado por QR Dinámico + GPS</Text>
          </View>
        </View>

        {/* Botones */}
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigation.navigate('StudentHome')}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryBtnText}>Volver al Inicio</Text>
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

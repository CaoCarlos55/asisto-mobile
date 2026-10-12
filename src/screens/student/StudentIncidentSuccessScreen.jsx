import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { Clock } from 'lucide-react-native'
import { useClassSession } from '../../context/ClassSessionContext'
import { styles } from '../../styles/student/StudentIncidentSuccess.styles'

export default function StudentIncidentSuccessScreen({ route, navigation }) {
  const { classInfo } = useClassSession()
  const { folio = '#INC-2026-0842', motive = 'Salud / Cita Médica', fileName = 'justificativo_asistencia.pdf' } =
    route.params || {}

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.centerContainer}>
        {/* Icono circular azul */}
        <View style={styles.resultIconCircle}>
          <Clock size={44} color="#ffffff" strokeWidth={2.5} />
        </View>

        <Text style={styles.resultTitle}>Justificación Enviada</Text>

        <View style={styles.folioPill}>
          <Text style={styles.folioPillText}>FOLIO: {folio}</Text>
        </View>

        {/* Banner de Revisión */}
        <View style={styles.reviewBanner}>
          <View style={styles.amberDot} />
          <View style={styles.reviewContent}>
            <Text style={styles.reviewTitle}>En Revisión por Coordinación</Text>
            <Text style={styles.reviewSub}>
              Dependencia asíncrona (HU08).{'\n'}
              Respuesta en máx. 48 horas.
            </Text>
          </View>
        </View>

        {/* Tarjeta de Detalle */}
        <View style={styles.resultCard}>
          <Text style={styles.cardHeader}>DETALLE DE LA SOLICITUD</Text>

          <Text style={styles.fieldLabel}>Asignatura y Aula</Text>
          <Text style={styles.fieldValue}>{classInfo.subject}</Text>
          <Text style={styles.fieldSub}>{classInfo.teacher} • {classInfo.classroom}</Text>

          <View style={styles.divider} />

          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.fieldLabel}>Motivo Registrado</Text>
              <Text style={styles.fieldValue}>{motive}</Text>
              <Text style={styles.fieldSub}>Doc: {fileName}</Text>
            </View>

            <View style={styles.statusBox}>
              <Text style={styles.statusLabel}>ESTADO ACTUAL</Text>
              <Text style={styles.statusValue}>EN REVISIÓN</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.hintText}>
            Si Coordinación aprueba, tu estado será: <Text style={styles.hintHighlight}>Justificado</Text>.
          </Text>
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
          <Text style={styles.secondaryBtnText}>Ver en Mis Justificaciones</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

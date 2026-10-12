import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions
} from 'react-native'
import { ChevronLeft, Zap, ZapOff, MapPin } from 'lucide-react-native'
import Svg, { Rect, Line } from 'react-native-svg'
import { useClassSession } from '../../context/ClassSessionContext'
import { styles } from '../../styles/student/StudentScanner.styles'

const { width } = Dimensions.get('window')

export default function StudentScannerScreen({ navigation }) {
  const { classInfo, registerStudentAttendance } = useClassSession()
  const [torchOn, setTorchOn] = useState(false)
  const [distanceMeters] = useState(6)

  const scannerSize = Math.min(width * 0.72, 230)

  const handleSimulateScan = (scenarioMinute = 5) => {
    if (scenarioMinute <= 10) {
      registerStudentAttendance('29.842.119', 'present_qr', '10:05 AM')
      navigation.replace('StudentSuccessPresent')
    } else if (scenarioMinute <= 20) {
      registerStudentAttendance('29.842.119', 'late', '10:14 AM')
      navigation.replace('StudentSuccessLate')
    } else {
      navigation.replace('StudentIncidentForm')
    }
  }

  return (
    <SafeAreaView style={styles.darkSafeArea}>
      <View style={styles.scannerContainer}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIconBtn}>
            <ChevronLeft size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Escanear Asistencia</Text>
          <TouchableOpacity onPress={() => setTorchOn(!torchOn)} style={styles.headerIconBtn}>
            {torchOn ? <Zap size={22} color="#f59e0b" /> : <ZapOff size={22} color="#ffffff" />}
          </TouchableOpacity>
        </View>

        {/* Banner de Geocerca Activa (HU09) */}
        <View style={styles.geofenceBanner}>
          <View style={styles.greenDot} />
          <View>
            <Text style={styles.geofenceBannerTitle}>GEOCERCA ACTIVA • AULA 12</Text>
            <Text style={styles.geofenceBannerSub}>GPS: Alta precisión (±3m)</Text>
          </View>
        </View>

        {/* Visor de Escaneo QR */}
        <View style={styles.scannerWrapper}>
          <View style={styles.scannerBox}>
            <Svg width={scannerSize} height={scannerSize} viewBox="0 0 100 100">
              <Line x1="4" y1="4" x2="25" y2="4" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
              <Line x1="4" y1="4" x2="4" y2="25" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />

              <Line x1="96" y1="4" x2="75" y2="4" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
              <Line x1="96" y1="4" x2="96" y2="25" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />

              <Line x1="4" y1="96" x2="25" y2="96" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
              <Line x1="4" y1="96" x2="4" y2="75" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />

              <Line x1="96" y1="96" x2="75" y2="96" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
              <Line x1="96" y1="96" x2="96" y2="75" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />

              <Rect x="20" y="20" width="22" height="22" rx="3" fill="rgba(255,255,255,0.7)" />
              <Rect x="24" y="24" width="14" height="14" rx="2" fill="#0a0f1d" />
              <Rect x="27" y="27" width="8" height="8" rx="1" fill="rgba(255,255,255,0.7)" />

              <Rect x="58" y="20" width="22" height="22" rx="3" fill="rgba(255,255,255,0.7)" />
              <Rect x="62" y="24" width="14" height="14" rx="2" fill="#0a0f1d" />
              <Rect x="65" y="27" width="8" height="8" rx="1" fill="rgba(255,255,255,0.7)" />

              <Rect x="20" y="58" width="22" height="22" rx="3" fill="rgba(255,255,255,0.7)" />
              <Rect x="24" y="62" width="14" height="14" rx="2" fill="#0a0f1d" />
              <Rect x="27" y="65" width="8" height="8" rx="1" fill="rgba(255,255,255,0.7)" />

              <Line x1="8" y1="50" x2="92" y2="50" stroke="#38bdf8" strokeWidth="3" />
            </Svg>
          </View>
        </View>

        {/* Textos */}
        <Text style={styles.scanSubject}>{classInfo.subject}</Text>
        <Text style={styles.scanTeacher}>Sección B • {classInfo.teacher}</Text>
        <Text style={styles.scanHint}>
          Enfoca el código QR dinámico proyectado por el docente.{'\n'}
          Se renueva cada 15 segundos
        </Text>

        {/* Tarjeta de Geocerca Validada (HU09) */}
        <View style={styles.geofenceCard}>
          <View style={styles.geofenceIconBox}>
            <MapPin size={22} color="#10b981" />
          </View>
          <View style={styles.geofenceInfo}>
            <Text style={styles.geofenceCardTitle}>
              Geocerca Validada (HU09)
            </Text>
            <Text style={styles.geofenceCardSub}>Sede Principal • Aula 12</Text>
            <Text style={styles.geofenceDistance}>
              Distancia: {distanceMeters}m (Máximo: 25m)
            </Text>
          </View>
          <View style={styles.validBadge}>
            <Text style={styles.validBadgeText}>VÁLIDO</Text>
          </View>
        </View>

        {/* Selector de Simulación de Escenarios IHC */}
        <View style={styles.simulationBar}>
          <Text style={styles.simLabel}>Probar Escenario:</Text>
          <View style={styles.simButtonsRow}>
            <TouchableOpacity
              style={styles.simBtnGreen}
              onPress={() => handleSimulateScan(5)}
            >
              <Text style={styles.simBtnText}>Min 5 (Tolerancia)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.simBtnAmber}
              onPress={() => handleSimulateScan(14)}
            >
              <Text style={styles.simBtnText}>Min 14 (Retardo)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.simBtnRed}
              onPress={() => handleSimulateScan(24)}
            >
              <Text style={styles.simBtnText}>Min 24 (Incidencia)</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

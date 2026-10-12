import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Alert
} from 'react-native'
import { ChevronLeft, Zap, ZapOff, MapPin } from 'lucide-react-native'
import Svg, { Rect, Line } from 'react-native-svg'
import { useClassSession } from '../../context/ClassSessionContext'
import { styles } from '../../styles/student/StudentScanner.styles'

const { width } = Dimensions.get('window')

export default function StudentScannerScreen({ navigation }) {
  const { classInfo, registerStudentAttendance, sessionStatus, qrToken, qrSecondsRemaining } = useClassSession()
  const [torchOn, setTorchOn] = useState(false)
  const [distanceMeters, setDistanceMeters] = useState(6)
  const isWithinGeofence = distanceMeters <= 25

  const scannerSize = Math.min(width * 0.72, 230)

  const handleSimulateScan = (scenarioMinute = 5) => {
    if (sessionStatus === 'closed' || sessionStatus === 'cancelled') {
      Alert.alert(
        'QR Inerte • Sesión Cerrada',
        'El docente ya ejecutó el cierre definitivo de la sesión. El código QR ha quedado inerte y no acepta más asistencias.'
      )
      return
    }

    if (!isWithinGeofence) {
      Alert.alert(
        'Fuera de Geocerca (HU09)',
        `Te encuentras a ${distanceMeters}m del aula (máximo permitido: 25m).\nDebes estar físicamente dentro del aula para registrar asistencia.`
      )
      return
    }

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
            <Text style={styles.geofenceBannerSub}>GPS: Alta precisión (±3m) • {isWithinGeofence ? 'Dentro de aula' : 'Fuera de rango'}</Text>
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
          Token Dinámico: #{qrToken} • Renueva en {qrSecondsRemaining}s{'\n'}
          Sincronizado con el reloj del servidor
        </Text>

        {/* Tarjeta de Geocerca Validada (HU09) */}
        <TouchableOpacity
          style={styles.geofenceCard}
          onPress={() => setDistanceMeters(prev => prev === 6 ? 45 : 6)}
          activeOpacity={0.8}
        >
          <View style={styles.geofenceIconBox}>
            <MapPin size={22} color={isWithinGeofence ? '#10b981' : '#ef4444'} />
          </View>
          <View style={styles.geofenceInfo}>
            <Text style={styles.geofenceCardTitle}>
              {isWithinGeofence ? 'Geocerca Validada (HU09)' : 'Fuera de Rango GPS (HU09)'}
            </Text>
            <Text style={styles.geofenceCardSub}>Sede Principal • Aula 12</Text>
            <Text style={[styles.geofenceDistance, !isWithinGeofence && { color: '#f87171' }]}>
              Distancia: {distanceMeters}m (Máx: 25m) • Toca para alternar
            </Text>
          </View>
          <View style={isWithinGeofence ? styles.validBadge : styles.invalidBadge}>
            <Text style={isWithinGeofence ? styles.validBadgeText : styles.invalidBadgeText}>
              {isWithinGeofence ? 'DENTRO' : 'FUERA'}
            </Text>
          </View>
        </TouchableOpacity>

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

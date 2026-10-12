import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions
} from 'react-native'
import { ChevronLeft, Maximize2, AlertOctagon, Check, Clock } from 'lucide-react-native'
import Svg, { Rect } from 'react-native-svg'
import { useClassSession } from '../../context/ClassSessionContext'
import { styles } from '../../styles/teacher/TeacherQR.styles'

const { width } = Dimensions.get('window')

export default function TeacherQRScreen({ navigation }) {
  const { classInfo, metrics } = useClassSession()
  const [seconds, setSeconds] = useState(515) // 08:35

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.centerContainer}>
        {/* Header con botón atrás y badge ACTIVO */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <ChevronLeft size={24} color="#0f172a" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Pase de Lista QR</Text>
          <View style={styles.livePill}>
            <View style={styles.greenDot} />
            <Text style={styles.livePillText}>ACTIVO</Text>
          </View>
        </View>

        <Text style={styles.subjectTitle}>{classInfo.subject} • Sec. B</Text>
        <Text style={styles.subjectSub}>
          {classInfo.classroom} • Bloque oficial {classInfo.timeBlock}
        </Text>

        {/* Tarjeta del Código QR */}
        <View style={styles.qrCard}>
          {/* Contador de tiempo */}
          <View style={styles.timerPill}>
            <Clock size={14} color="#059669" />
            <Text style={styles.timerText}>{formatTimer(seconds)} transcurridos</Text>
          </View>

          {/* Gráfico QR estilizado de alta precisión */}
          <View style={styles.qrContainer}>
            <Svg width={width * 0.62} height={width * 0.62} viewBox="0 0 120 120">
              {/* Esquinas */}
              <Rect x="10" y="10" width="30" height="30" rx="4" fill="#0f172a" />
              <Rect x="16" y="16" width="18" height="18" rx="2" fill="#ffffff" />
              <Rect x="20" y="20" width="10" height="10" rx="1" fill="#0f172a" />

              <Rect x="80" y="10" width="30" height="30" rx="4" fill="#0f172a" />
              <Rect x="86" y="16" width="18" height="18" rx="2" fill="#ffffff" />
              <Rect x="90" y="20" width="10" height="10" rx="1" fill="#0f172a" />

              <Rect x="10" y="80" width="30" height="30" rx="4" fill="#0f172a" />
              <Rect x="16" y="86" width="18" height="18" rx="2" fill="#ffffff" />
              <Rect x="20" y="90" width="10" height="10" rx="1" fill="#0f172a" />

              {/* Módulos */}
              <Rect x="50" y="15" width="20" height="8" rx="2" fill="#0f172a" />
              <Rect x="55" y="30" width="12" height="15" rx="2" fill="#0f172a" />
              <Rect x="75" y="48" width="14" height="10" rx="2" fill="#0f172a" />
              <Rect x="20" y="50" width="15" height="8" rx="2" fill="#0f172a" />
              <Rect x="42" y="52" width="18" height="16" rx="2" fill="#0f172a" />
              <Rect x="65" y="70" width="18" height="12" rx="2" fill="#0f172a" />
              <Rect x="48" y="78" width="12" height="15" rx="2" fill="#0f172a" />
              <Rect x="70" y="88" width="12" height="14" rx="2" fill="#0f172a" />
              <Rect x="88" y="78" width="14" height="8" rx="2" fill="#0f172a" />
            </Svg>
          </View>

          {/* Contador de registrados */}
          <View style={styles.registeredPill}>
            <Check size={14} color="#1d4ed8" />
            <Text style={styles.registeredPillText}>
              {metrics.presents} alumnos registrados
            </Text>
          </View>

          {/* Botón Pantalla Completa */}
          <TouchableOpacity style={styles.fullScreenBtn} activeOpacity={0.85}>
            <Maximize2 size={16} color="#ffffff" style={styles.btnIcon} />
            <Text style={styles.fullScreenBtnText}>Modo Pantalla Completa</Text>
          </TouchableOpacity>
        </View>

        {/* Sección Contingencia de Aula (HU02) */}
        <View style={styles.contingencyCard}>
          <Text style={styles.contingencyTitle}>CONTINGENCIA DE AULA</Text>
          <Text style={styles.contingencySub}>¿Ocurrió una suspensión o eventualidad?</Text>

          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => navigation.navigate('TeacherCancelModal')}
            activeOpacity={0.85}
          >
            <AlertOctagon size={18} color="#dc2626" style={styles.btnIcon} />
            <Text style={styles.cancelBtnText}>Cancelar Clase</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerNote}>
          Los estudiantes deben escanear este código desde su app móvil
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}

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
import QRCodeView from '../../components/QRCodeView'
import { useClassSession } from '../../context/ClassSessionContext'
import { styles } from '../../styles/teacher/TeacherQR.styles'

const { width } = Dimensions.get('window')

export default function TeacherQRScreen({ navigation }) {
  const { classInfo, metrics, qrToken, qrSecondsRemaining } = useClassSession()
  const [seconds, setSeconds] = useState(515) // 08:35
  const qrSize = Math.min(width * 0.62, 230)

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

        <Text style={styles.subjectTitle}>{classInfo.subject} • {classInfo.section}</Text>
        <Text style={styles.subjectSub}>
          {classInfo.classroom} • Bloque oficial {classInfo.timeBlock}
        </Text>

        {/* Tarjeta del Código QR */}
        <View style={styles.qrCard}>
          {/* Contador de tiempo y rotación dinámica */}
          <View style={styles.timerPill}>
            <Clock size={14} color="#059669" />
            <Text style={styles.timerText}>
              {formatTimer(seconds)} transcurridos • Renueva en {qrSecondsRemaining}s
            </Text>
          </View>

          {/* Gráfico QR dinámico que rota con el token activo */}
          <View style={styles.qrContainer}>
            <QRCodeView
              value={`ASISTO:${classInfo.classroom || 'aula-12'}:${qrToken}`}
              size={qrSize}
              color="#0f172a"
            />
          </View>

          {/* Semilla de Token Dinámico (HU03) */}
          <View style={styles.tokenPill}>
            <View style={styles.greenMiniDot} />
            <Text style={styles.tokenPillText}>
              TOKEN ACTIVO: #{qrToken} • {qrSecondsRemaining}s
            </Text>
          </View>

          {/* Contador de registrados */}
          <View style={styles.registeredPill}>
            <Check size={14} color="#1d4ed8" />
            <Text style={styles.registeredPillText}>
              {metrics.presents} alumnos registrados ({metrics.presentsManual} manual)
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

import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
  StatusBar,
  Platform
} from 'react-native'
import { ChevronLeft, Maximize2, Minimize2, AlertOctagon, Check, Clock } from 'lucide-react-native'
import QRCodeView from '../../components/QRCodeView'
import { useClassSession } from '../../context/ClassSessionContext'
import { styles } from '../../styles/teacher/TeacherQR.styles'

const { width } = Dimensions.get('window')

export default function TeacherQRScreen({ navigation }) {
  const { classInfo, metrics, qrToken, qrTimestamp, qrSecondsRemaining, setAttendanceMode } = useClassSession()
  const [seconds, setSeconds] = useState(515) // 08:35
  const [isFullscreen, setIsFullscreen] = useState(false)
  const qrSize = Math.min(width * 0.62, 230)
  const fullscreenQrSize = Math.min(width * 0.78, 300)

  const activeMode = classInfo.attendanceMode || (classInfo.elapsedMinutes > 20 ? 'inasistencia' : classInfo.elapsedMinutes > 10 ? 'retardo' : 'normal')

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

  const handleToggleFullscreen = () => {
    const next = !isFullscreen
    setIsFullscreen(next)
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      try {
        if (next && document.documentElement.requestFullscreen && !document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {})
        } else if (!next && document.exitFullscreen && document.fullscreenElement) {
          document.exitFullscreen().catch(() => {})
        }
      } catch (e) {
        // Ignorar excepciones en navegadores con políticas restrictivas
      }
    }
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

        {/* Panel de Control de Modo de Asistencia (HU06, HU07, HU08) */}
        <View style={styles.modeControlCard}>
          <View style={styles.modeControlHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Clock size={16} color="#1e3a8a" />
              <Text style={styles.modeControlTitle}>HORA Y MODO DE LA CLASE</Text>
            </View>
            <View
              style={[
                styles.modeStatusBadge,
                activeMode === 'inasistencia'
                  ? styles.modeBadgeRed
                  : activeMode === 'retardo'
                  ? styles.modeBadgeAmber
                  : styles.modeBadgeGreen
              ]}
            >
              <Text style={styles.modeStatusBadgeText}>
                {activeMode === 'inasistencia'
                  ? 'MODO INASISTENCIA'
                  : activeMode === 'retardo'
                  ? 'MODO RETARDO'
                  : 'MODO PUNTUAL'}
              </Text>
            </View>
          </View>

          <Text style={styles.modeControlDesc}>
            {activeMode === 'inasistencia'
              ? 'Límite de tiempo excedido (> 20 min). Al escanear el código QR, los estudiantes deberán enviar justificación obligatoria con motivos adjuntos.'
              : activeMode === 'retardo'
              ? 'Ventana de tolerancia (11-20 min). Los escaneos de código QR se registrarán oficialmente con retardo.'
              : 'Ventana inicial puntual (0-10 min). Los escaneos de código QR se registrarán como presentes sin penalización.'}
          </Text>

          <View style={styles.modeButtonsRow}>
            <TouchableOpacity
              style={[
                styles.modeBtn,
                activeMode === 'normal' && styles.modeBtnActiveGreen
              ]}
              onPress={() => setAttendanceMode('normal')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.modeBtnText,
                  activeMode === 'normal' && styles.modeBtnTextActive
                ]}
              >
                Puntual (0-10m)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.modeBtn,
                activeMode === 'retardo' && styles.modeBtnActiveAmber
              ]}
              onPress={() => setAttendanceMode('retardo')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.modeBtnText,
                  activeMode === 'retardo' && styles.modeBtnTextActive
                ]}
              >
                Modo Retardo (15m)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.modeBtn,
                activeMode === 'inasistencia' && styles.modeBtnActiveRed
              ]}
              onPress={() => setAttendanceMode('inasistencia')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.modeBtnText,
                  activeMode === 'inasistencia' && styles.modeBtnTextActive
                ]}
              >
                Modo Inasistencia (&gt;20m)
              </Text>
            </TouchableOpacity>
          </View>
        </View>

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
              value={`ASISTO:${classInfo.classroomId || '204'}:${classInfo.subject || 'Matemática'}:${qrToken}:${qrTimestamp || Date.now()}:${activeMode}`}
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
          <TouchableOpacity
            style={styles.fullScreenBtn}
            onPress={handleToggleFullscreen}
            activeOpacity={0.85}
          >
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

      {/* Modal de Pantalla Completa para Proyector / Pizarra (HU03) */}
      <Modal
        visible={isFullscreen}
        animationType="fade"
        transparent={false}
        onRequestClose={handleToggleFullscreen}
      >
        <SafeAreaView style={styles.fullscreenModalArea}>
          <StatusBar barStyle="light-content" backgroundColor="#0b1528" />

          <View style={styles.fullscreenHeader}>
            <View style={styles.fullscreenHeaderLeft}>
              <Text style={styles.fullscreenClassTitle}>{classInfo.subject}</Text>
              <Text style={styles.fullscreenClassSub}>
                {classInfo.section} • {classInfo.classroom}
              </Text>
            </View>

            <TouchableOpacity
              onPress={handleToggleFullscreen}
              style={styles.fullscreenExitBtn}
              activeOpacity={0.8}
            >
              <Minimize2 size={16} color="#ffffff" style={{ marginRight: 6 }} />
              <Text style={styles.fullscreenExitBtnText}>Salir</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.fullscreenCenter}>
            <View style={styles.fullscreenTokenBadge}>
              <View style={styles.greenMiniDot} />
              <Text style={styles.fullscreenTokenText}>
                TOKEN ACTIVO: #{qrToken} • Renueva en {qrSecondsRemaining}s
              </Text>
            </View>

            <View style={styles.fullscreenQrBox}>
              <QRCodeView
                value={`ASISTO:${classInfo.classroomId || '204'}:${classInfo.subject || 'Matemática'}:${qrToken}:${qrTimestamp || Date.now()}:${activeMode}`}
                size={fullscreenQrSize}
                color="#0b1528"
              />
            </View>

            <View style={styles.fullscreenModeRow}>
              <TouchableOpacity
                style={[
                  styles.fullscreenModeBtn,
                  activeMode === 'normal' && styles.fullscreenModeBtnActiveGreen
                ]}
                onPress={() => setAttendanceMode('normal')}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.fullscreenModeBtnText,
                    activeMode === 'normal' && styles.fullscreenModeBtnTextActive
                  ]}
                >
                  Puntual
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.fullscreenModeBtn,
                  activeMode === 'retardo' && styles.fullscreenModeBtnActiveAmber
                ]}
                onPress={() => setAttendanceMode('retardo')}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.fullscreenModeBtnText,
                    activeMode === 'retardo' && styles.fullscreenModeBtnTextActive
                  ]}
                >
                  Modo Retardo
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.fullscreenModeBtn,
                  activeMode === 'inasistencia' && styles.fullscreenModeBtnActiveRed
                ]}
                onPress={() => setAttendanceMode('inasistencia')}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.fullscreenModeBtnText,
                    activeMode === 'inasistencia' && styles.fullscreenModeBtnTextActive
                  ]}
                >
                  Modo Inasistencia
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.fullscreenLiveCountPill}>
              <Check size={16} color="#22c55e" style={{ marginRight: 6 }} />
              <Text style={styles.fullscreenLiveCountText}>
                {metrics.presents} de {metrics.total} estudiantes registrados
              </Text>
            </View>

            <Text style={styles.fullscreenHint}>
              Escanea desde la app Asisto móvil para registrar tu asistencia
            </Text>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  )
}

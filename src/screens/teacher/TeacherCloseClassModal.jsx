import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import { Lock } from 'lucide-react-native'
import { useClassSession } from '../../context/ClassSessionContext'
import { styles } from '../../styles/modals/TeacherCloseClassModal.styles'

export default function TeacherCloseClassModal({ navigation }) {
  const { metrics, executeFinalClosure } = useClassSession()

  const handleConfirmClosure = async () => {
    await executeFinalClosure()
    navigation.navigate('TeacherOutOfSchedule')
  }

  return (
    <SafeAreaView style={styles.modalOverlay}>
      <View style={styles.modalSheet}>
        {/* Tirador */}
        <View style={styles.modalNotch} />

        {/* Cabecera */}
        <View style={styles.headerRow}>
          <View style={styles.iconBox}>
            <Lock size={22} color="#0f172a" />
          </View>
          <View>
            <Text style={styles.modalTitle}>
              Cierre Definitivo de Registro
            </Text>
            <Text style={styles.consignmentTag}>
              CONSIGNACIÓN INSTITUCIONAL
            </Text>
          </View>
        </View>

        {/* Balance Final */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceTitle}>BALANCE FINAL DE LA SESIÓN</Text>

          <View style={styles.balanceRow}>
            <View style={styles.balanceItem}>
              <Text style={styles.balanceValPresent}>{metrics.presents}</Text>
              <Text style={styles.balanceLabel}>Asistieron</Text>
              <Text style={styles.balanceSub}>
                ({metrics.presentsQr} QR + {metrics.presentsManual} Manual)
              </Text>
            </View>

            <View style={styles.balanceItem}>
              <Text style={styles.balanceValLate}>{metrics.lates}</Text>
              <Text style={styles.balanceLabel}>Retardos</Text>
            </View>

            <View style={styles.balanceItem}>
              <Text style={styles.balanceValPending}>{metrics.pending}</Text>
              <Text style={styles.balanceLabel}>Inasistencias</Text>
            </View>
          </View>
        </View>

        {/* Términos del Cierre Definitivo */}
        <View style={styles.termsBox}>
          <Text style={styles.termsTitle}>Al confirmar este cierre definitivo:</Text>
          <View style={styles.termItem}>
            <Text style={styles.termHeading}>• Bloqueo Inmediato de Nómina:</Text>
            <Text style={styles.termDesc}>La lista de alumnos se congela en el servidor.</Text>
          </View>
          <View style={styles.termItem}>
            <Text style={styles.termHeading}>• Transformación a QR Inerte:</Text>
            <Text style={styles.termDesc}>Cualquier escaneo posterior será rechazado.</Text>
          </View>
          <View style={styles.termItem}>
            <Text style={styles.termHeading}>• Consignación a Coordinación:</Text>
            <Text style={styles.termDesc}>Se cancela la alerta crítica por omisión.</Text>
          </View>
        </View>

        {/* Botón Cierre */}
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={handleConfirmClosure}
          activeOpacity={0.85}
        >
          <Lock size={16} color="#ffffff" style={styles.btnIcon} />
          <Text style={styles.closeBtnText}>Ejecutar Cierre Definitivo</Text>
        </TouchableOpacity>

        {/* Botón Volver */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.85}
        >
          <Text style={styles.backBtnText}>Volver a la Clase (Revisar más tarde)</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

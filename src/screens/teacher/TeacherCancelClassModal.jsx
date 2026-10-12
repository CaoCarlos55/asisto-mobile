import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native'
import { AlertTriangle, AlertOctagon } from 'lucide-react-native'
import { useClassSession } from '../../context/ClassSessionContext'
import { styles } from '../../styles/modals/TeacherCancelClassModal.styles'

export default function TeacherCancelClassModal({ navigation }) {
  const { cancelClass } = useClassSession()
  const [reason, setReason] = useState(
    'Suspensión por corte imprevisto de suministro eléctrico en Aula 204.'
  )

  const handleConfirm = async () => {
    if (!reason.trim()) {
      Alert.alert('Motivo requerido', 'Debes ingresar un motivo para cancelar la sesión.')
      return
    }
    await cancelClass(reason)
    navigation.navigate('TeacherOutOfSchedule')
  }

  return (
    <SafeAreaView style={styles.modalOverlay}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.modalSheet}>
          {/* Tirador */}
          <View style={styles.modalNotch} />

          {/* Header */}
          <View style={styles.headerRow}>
            <View style={styles.alertIconBox}>
              <AlertTriangle size={24} color="#dc2626" />
            </View>
            <View style={styles.headerTextContainer}>
              <Text style={styles.modalTitle}>
                ¿Cancelar Sesión de Clase?
              </Text>
              <Text style={styles.destructiveTag}>
                ACCIÓN DESTRUCTIVA
              </Text>
            </View>
          </View>

          {/* Caja explicativa */}
          <View style={styles.warningBox}>
            <Text style={styles.warningBoxTitle}>
              Se anulará la sesión en el servidor central:
            </Text>
            <Text style={styles.warningBullet}>• El código QR quedará inerte de inmediato.</Text>
            <Text style={styles.warningBullet}>
              • Cualquier escaneo de los alumnos será rechazado de forma estricta.
            </Text>
          </View>

          {/* Motivo */}
          <Text style={styles.inputLabel}>MOTIVO DE LA CANCELACIÓN (OBLIGATORIO)</Text>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              value={reason}
              onChangeText={setReason}
              multiline
              maxLength={200}
              placeholder="Indica el motivo oficial de la suspensión..."
              placeholderTextColor="#94a3b8"
            />
            <Text style={styles.charCounter}>{reason.length}/200</Text>
          </View>

          <Text style={styles.syncNote}>
            Esta justificación se enviará en tiempo real al Dashboard de Coordinación.
          </Text>

          {/* Botones */}
          <TouchableOpacity
            style={styles.confirmCancelBtn}
            onPress={handleConfirm}
            activeOpacity={0.85}
          >
            <AlertOctagon size={18} color="#ffffff" style={styles.btnIcon} />
            <Text style={styles.confirmCancelBtnText}>Confirmar Cancelación de Clase</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dismissBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.85}
          >
            <Text style={styles.dismissBtnText}>Volver a la Clase (No Cancelar)</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

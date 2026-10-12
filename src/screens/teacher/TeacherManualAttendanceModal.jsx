import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import { UserCheck, Info, Check } from 'lucide-react-native'
import { useClassSession } from '../../context/ClassSessionContext'
import { styles } from '../../styles/modals/TeacherManualAttendanceModal.styles'

const CONTINGENCY_CAUSES = [
  'Falla en cámara móvil',
  'Batería agotada',
  'Sin datos / red móvil',
  'Error al enfocar QR'
]

export default function TeacherManualAttendanceModal({ route, navigation }) {
  const { studentId, student } = route.params || {}
  const { markManualAttendance } = useClassSession()
  const [selectedCause, setSelectedCause] = useState('Falla en cámara móvil')

  const handleConfirm = async () => {
    if (studentId) {
      await markManualAttendance(studentId, selectedCause)
    }
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.modalOverlay}>
      <View style={styles.modalSheet}>
        {/* Tirador */}
        <View style={styles.modalNotch} />

        {/* Cabecera */}
        <View style={styles.headerRow}>
          <View style={styles.iconBox}>
            <UserCheck size={22} color="#1d4ed8" />
          </View>
          <View>
            <Text style={styles.modalTitle}>
              Marcado Manual Asistencia
            </Text>
            <Text style={styles.contingencyTag}>
              CONTINGENCIA DE AULA
            </Text>
          </View>
        </View>

        {/* Tarjeta del Alumno */}
        <View style={styles.studentCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{student?.initials || 'SL'}</Text>
          </View>
          <View style={styles.studentInfo}>
            <Text style={styles.studentName}>
              {student?.name || 'Sofía Linares Mendoza'}
            </Text>
            <Text style={styles.studentCi}>
              {student?.ci || 'C.I. 30.012.441'} • Sección B
            </Text>
          </View>
          <View style={styles.pendingBadge}>
            <Text style={styles.pendingBadgeText}>○ Pendiente</Text>
          </View>
        </View>

        {/* Causa de Contingencia */}
        <Text style={styles.sectionLabel}>CAUSA DE LA CONTINGENCIA</Text>
        <View style={styles.chipsGrid}>
          {CONTINGENCY_CAUSES.map(cause => {
            const isSelected = selectedCause === cause
            return (
              <TouchableOpacity
                key={cause}
                style={[styles.chip, isSelected && styles.chipSelected]}
                onPress={() => setSelectedCause(cause)}
                activeOpacity={0.8}
              >
                {isSelected && <Check size={14} color="#1d4ed8" style={styles.chipIcon} />}
                <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                  {cause}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>

        {/* Etiqueta de Auditoría Automática */}
        <View style={styles.auditBox}>
          <Info size={18} color="#1d4ed8" style={styles.auditIcon} />
          <View style={styles.auditContent}>
            <Text style={styles.auditTitle}>Etiqueta de Auditoría Automática:</Text>
            <Text style={styles.auditDesc}>
              Se guardará como "Asistió" con la etiqueta oficial "Registro Manual por el Profesor" para Coordinación.
            </Text>
          </View>
        </View>

        {/* Botones */}
        <TouchableOpacity
          style={styles.confirmBtn}
          onPress={handleConfirm}
          activeOpacity={0.85}
        >
          <Check size={16} color="#ffffff" style={styles.btnIcon} />
          <Text style={styles.confirmBtnText}>Confirmar Asistencia Manual</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.85}
        >
          <Text style={styles.cancelBtnText}>Cancelar (Volver a la Nómina)</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

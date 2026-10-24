import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native'
import { ChevronLeft, Upload } from 'lucide-react-native'
import * as DocumentPicker from 'expo-document-picker'
import { useAuth } from '../../context/AuthContext'
import { useClassSession } from '../../context/ClassSessionContext'
import { sendIncidentReport } from '../../api/api'
import { styles } from '../../styles/student/StudentIncidentForm.styles'

const MOTIVES = ['Salud / Médico', 'Transporte', 'Fuerza Mayor']

export default function StudentIncidentFormScreen({ navigation, route }) {
  const { currentUser } = useAuth()
  const { classInfo, registerIncident } = useClassSession()
  const { autoReason, elapsedMinutes } = route?.params || {}
  const displayMin = elapsedMinutes || classInfo.elapsedMinutes || 25
  const scanTimeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const [selectedMotive, setSelectedMotive] = useState('Salud / Médico')
  const [description, setDescription] = useState(
    'Retraso justificado por contingencia en el traslado matutino hacia la institución.'
  )
  const [attachedFile, setAttachedFile] = useState({
    name: 'justificativo_asistencia.pdf',
    size: '240 KB'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
        copyToCacheDirectory: true
      })
      if (!res.canceled && res.assets && res.assets.length > 0) {
        const file = res.assets[0]
        setAttachedFile({
          name: file.name,
          size: file.size ? `${Math.round(file.size / 1024)} KB` : 'Archivo adjunto'
        })
      }
    } catch (e) {
      console.warn('Error seleccionando documento:', e)
    }
  }

  const handleSubmit = async () => {
    if (!description.trim()) {
      Alert.alert('Justificación requerida', 'Debes ingresar una descripción de la causa del retraso.')
      return
    }
    setIsSubmitting(true)
    try {
      const studentName = currentUser?.name || 'Daniel Álvarez'
      const studentCi = currentUser?.ci || 'V-28.452.190'
      const yearLevel = currentUser?.yearLevel || '5to Año'
      const subject = classInfo.subject || currentUser?.subject || 'Matemática'
      const teacher = classInfo.teacher || 'Prof. Roberto García'
      const room = classInfo.classroom || (currentUser?.classroomId ? `Aula ${currentUser.classroomId}` : 'Aula 204')

      const result = await sendIncidentReport({
        studentName,
        studentCi,
        yearLevel,
        subject,
        teacher,
        room,
        statement: description,
        pdfName: attachedFile?.name || 'justificativo_asistencia.pdf',
        tagType: selectedMotive
      })

      const folio = result?.folio || `INC-2026-${Math.floor(1000 + Math.random() * 9000)}`
      await registerIncident(
        studentCi,
        folio,
        selectedMotive,
        description,
        attachedFile?.name || 'justificativo_asistencia.pdf'
      )

      navigation.replace('StudentIncidentSuccess', {
        folio: folio.startsWith('#') ? folio : `#${folio}`,
        motive: selectedMotive,
        fileName: attachedFile?.name || 'justificativo_asistencia.pdf'
      })
    } catch (err) {
      console.warn('Error al registrar incidencia:', err)
      Alert.alert('Error', 'No se pudo enviar la justificación.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <ChevronLeft size={20} color="#1e3a8a" />
              <Text style={styles.backText}>Cancelar</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Incidencia</Text>
            <View style={styles.headerSpacer} />
          </View>

          {/* Banner de Tiempo Límite Excedido */}
          <View style={styles.alertBanner}>
            <View style={styles.alertIconCircle}>
              <Text style={styles.alertExclamation}>!</Text>
            </View>
            <View style={styles.alertTextContainer}>
              <Text style={styles.alertTitle}>Tiempo Límite Excedido (&gt; 20m • Inasistencia)</Text>
              <Text style={styles.alertSub}>
                Escaneo: {scanTimeStr} (Minuto {displayMin}){'\n'}
                Justificación obligatoria exigida por el sistema
              </Text>
            </View>
          </View>

          {/* Card Formulario */}
          <View style={styles.card}>
            <Text style={styles.cardHeader}>FORMULARIO DE JUSTIFICACIÓN</Text>
            <Text style={styles.cardTitle}>Registrar Causa</Text>

            {/* Asignatura Vinculada */}
            <View style={styles.subjectBox}>
              <View style={styles.subjectInfo}>
                <Text style={styles.subjectLabel}>ASIGNATURA VINCULADA</Text>
                <Text style={styles.subjectName} numberOfLines={1}>
                  {classInfo.subject} • {classInfo.teacher}
                </Text>
              </View>
              <View style={styles.roomBadge}>
                <Text style={styles.roomBadgeText}>{classInfo.classroom}</Text>
              </View>
            </View>

            {/* Motivo Principal */}
            <Text style={styles.sectionLabel}>Motivo Principal *</Text>
            <View style={styles.motivesRow}>
              {MOTIVES.map(m => {
                const isSelected = selectedMotive === m
                return (
                  <TouchableOpacity
                    key={m}
                    style={[styles.motiveChip, isSelected && styles.motiveChipSelected]}
                    onPress={() => setSelectedMotive(m)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[styles.motiveChipText, isSelected && styles.motiveChipTextSelected]}
                    >
                      {m}
                    </Text>
                  </TouchableOpacity>
                )
              })}
            </View>

            {/* Descripción */}
            <Text style={styles.sectionLabel}>Descripción de la Causa *</Text>
            <View style={styles.textAreaBox}>
              <TextInput
                style={styles.textArea}
                value={description}
                onChangeText={setDescription}
                multiline
                maxLength={250}
                placeholder="Explica detalladamente la causa de tu llegada tardía..."
                placeholderTextColor="#94a3b8"
              />
              <Text style={styles.charCounter}>{description.length}/250</Text>
            </View>

            {/* Comprobante */}
            <Text style={styles.sectionLabel}>Comprobante (Opcional)</Text>
            {attachedFile ? (
              <TouchableOpacity style={styles.fileCard} onPress={pickDocument}>
                <View style={styles.pdfBadge}>
                  <Text style={styles.pdfBadgeText}>PDF</Text>
                </View>
                <View style={styles.fileDetails}>
                  <Text style={styles.fileName}>{attachedFile.name}</Text>
                  <Text style={styles.fileSub}>Adjuntado con éxito ({attachedFile.size})</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.uploadBtn} onPress={pickDocument}>
                <Upload size={16} color="#1e3a8a" style={styles.uploadIcon} />
                <Text style={styles.uploadBtnText}>Adjuntar Constancia o Reposo (PDF / Imagen)</Text>
              </TouchableOpacity>
            )}

            {/* Aviso de Coordinación */}
            <View style={styles.reviewPill}>
              <View style={styles.greenDot} />
              <Text style={styles.reviewPillText}>
                Revisión por Coordinación • Resolución en 24 a 48 horas.
              </Text>
            </View>
          </View>

          {/* Botones */}
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.85}>
            <Text style={styles.submitBtnText}>Enviar Justificación</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.omitBtn}
            onPress={() => navigation.navigate('StudentHome')}
            activeOpacity={0.8}
          >
            <Text style={styles.omitBtnText}>Omitir (Quedará como Falta)</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

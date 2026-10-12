import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native'
import { ChevronLeft, Check, Bold, Italic, List } from 'lucide-react-native'
import { useClassSession } from '../../context/ClassSessionContext'
import { styles } from '../../styles/teacher/TeacherLogbook.styles'

const INCIDENT_TYPES = [
  'Clase sin novedades',
  'Incidencia de conducta',
  'Falla de infraestructura',
  'Consulta pedagógica'
]

export default function TeacherLogbookScreen({ navigation }) {
  const { logbook, saveLogbook, classInfo } = useClassSession()
  const [topic, setTopic] = useState(logbook.topic || 'Tema programático del día\nDesarrollo de contenidos y actividades prácticas')
  const [selectedIncident, setSelectedIncident] = useState(logbook.incidentType || 'Clase sin novedades')
  const [observations, setObservations] = useState(
    logbook.observations ||
      'Desarrollo normal de la sesión pedagógica según la planificación curricular. Participación activa de los estudiantes en las actividades propuestas.'
  )

  const handleSave = async () => {
    await saveLogbook(topic, selectedIncident, observations)
    Alert.alert('Bitácora guardada', 'La información se vinculó a la sesión del día.')
    navigation.goBack()
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
              <ChevronLeft size={24} color="#0f172a" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Bitácora e Incidencias</Text>
            <View style={styles.optionalBadge}>
              <Text style={styles.optionalBadgeText}>Opcional</Text>
            </View>
          </View>

          <Text style={styles.subjectTitle}>{classInfo.subject} • {classInfo.section} • {classInfo.classroom}</Text>
          <Text style={styles.subjectSub}>
            Martes 29 Sep 2026 • Sesión vinculada al pase de lista
          </Text>

          {/* 1. Tema del Día */}
          <Text style={styles.sectionLabel}>TEMA DEL DÍA (CONTENIDO PEDAGÓGICO)</Text>
          <View style={styles.richEditorCard}>
            <View style={styles.toolbar}>
              <View style={styles.toolBtn}>
                <Bold size={14} color="#475569" />
              </View>
              <View style={styles.toolBtn}>
                <Italic size={14} color="#475569" />
              </View>
              <View style={styles.toolBtn}>
                <List size={14} color="#475569" />
              </View>
              <Text style={styles.editorHint}>Editor enriquecido</Text>
            </View>

            <TextInput
              style={styles.topicInput}
              value={topic}
              onChangeText={setTopic}
              multiline
              placeholder="Escribe el contenido pedagógico visto en clase..."
              placeholderTextColor="#94a3b8"
            />
          </View>

          {/* 2. Incidencias en Aula */}
          <Text style={styles.sectionLabel}>INCIDENCIAS EN AULA (OPCIONAL)</Text>
          <View style={styles.chipsGrid}>
            {INCIDENT_TYPES.map(type => {
              const isSelected = selectedIncident === type
              return (
                <TouchableOpacity
                  key={type}
                  style={[styles.chip, isSelected && styles.chipSelected]}
                  onPress={() => setSelectedIncident(type)}
                  activeOpacity={0.8}
                >
                  {isSelected && <Check size={14} color="#1d4ed8" style={styles.chipIcon} />}
                  <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>

          {/* 3. Observaciones y Notas */}
          <Text style={styles.sectionLabel}>OBSERVACIONES Y NOTAS DE AULA</Text>
          <View style={styles.obsContainer}>
            <TextInput
              style={styles.obsInput}
              value={observations}
              onChangeText={setObservations}
              multiline
              maxLength={500}
              placeholder="Añade notas del comportamiento, acuerdos o recordatorios..."
              placeholderTextColor="#94a3b8"
            />
            <Text style={styles.charCounter}>{observations.length}/500</Text>
          </View>

          {/* Banner de Vinculación */}
          <View style={styles.linkBanner}>
            <View style={styles.greenDot} />
            <Text style={styles.linkBannerText}>
              Se vinculará a la asistencia del día y al histórico docente
            </Text>
          </View>

          {/* Botones */}
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.85}>
            <Check size={16} color="#ffffff" style={styles.btnIcon} />
            <Text style={styles.saveBtnText}>Guardar Bitácora de Clase</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.skipBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.85}
          >
            <Text style={styles.skipBtnText}>Continuar sin registrar bitácora (Opcional)</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

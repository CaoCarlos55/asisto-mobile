import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList
} from 'react-native'
import { ChevronLeft } from 'lucide-react-native'
import { styles } from '../../styles/student/StudentHistory.styles'

const HISTORY_DATA = [
  {
    id: 'h1',
    subject: 'Matemáticas',
    filterKey: 'mat',
    sub: '4to Año B • Aula 12 • Prof. Roberto García',
    time: 'Hoy 07:35 AM • Asistencia puntual en aula',
    status: 'present_qr',
    statusText: 'Asistió (QR)'
  },
  {
    id: 'h2',
    subject: 'Física',
    filterKey: 'fis',
    sub: '4to Año B • Aula 12 • Prof. Méndez',
    time: 'Ayer 08:44 AM • Registro con retardo',
    status: 'late',
    statusText: 'Retardo'
  },
  {
    id: 'h3',
    subject: 'Química',
    filterKey: 'qui',
    sub: '4to Año B • Lab. Ciencias • Prof. Silva',
    time: 'Vie 25 Sep • 09:15 AM • Asistencia puntual en aula',
    status: 'present_qr',
    statusText: 'Asistió (QR)'
  },
  {
    id: 'h4',
    subject: 'Castellano y Literatura',
    filterKey: 'cas',
    sub: '4to Año B • Aula 12 • Prof. Rivas',
    time: 'Mar 22 Sep • Causa médica informada',
    note: 'Justificativo médico en validación',
    status: 'in_review',
    statusText: 'En revisión Coord.'
  },
  {
    id: 'h5',
    subject: 'Biología',
    filterKey: 'bio',
    sub: '4to Año B • Lab. Ciencias • Prof. García',
    time: 'Lun 21 Sep • 07:32 AM • Asistencia puntual en aula',
    status: 'present_qr',
    statusText: 'Asistió (QR)'
  }
]

export default function StudentHistoryScreen({ navigation }) {
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredHistory = activeFilter === 'all'
    ? HISTORY_DATA
    : HISTORY_DATA.filter(item => item.filterKey === activeFilter)

  const renderItem = ({ item }) => {
    const isPresent = item.status === 'present_qr'
    const isLate = item.status === 'late'
    const isInReview = item.status === 'in_review'

    return (
      <View style={styles.historyCard}>
        <View style={styles.historyLeft}>
          <Text style={styles.historySubject}>{item.subject}</Text>
          <Text style={styles.historySub}>{item.sub}</Text>
          <Text style={styles.historyTime}>{item.time}</Text>
          {item.note && <Text style={styles.historyNote}>{item.note}</Text>}
        </View>

        <View style={styles.historyRight}>
          {isPresent && (
            <View style={styles.presentBadge}>
              <View style={styles.greenDot} />
              <Text style={styles.presentBadgeText}>{item.statusText}</Text>
            </View>
          )}

          {isLate && (
            <View style={styles.lateBadge}>
              <View style={styles.amberDot} />
              <Text style={styles.lateBadgeText}>{item.statusText}</Text>
            </View>
          )}

          {isInReview && (
            <View style={styles.reviewBadge}>
              <Text style={styles.reviewBadgeText}>{item.statusText}</Text>
            </View>
          )}
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.contentContainer}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBackBtn}>
            <ChevronLeft size={24} color="#0f172a" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            Historial de Asistencia
          </Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Desglose General */}
        <View style={styles.kpiCard}>
          <Text style={styles.kpiCardTitle}>DESGLOSE GENERAL DE ASISTENCIA</Text>
          <View style={styles.kpiRow}>
            <View>
              <Text style={styles.kpiPct}>94%</Text>
              <Text style={styles.kpiGrade}>Regular</Text>
              <Text style={styles.kpiStatus}>Sin riesgo</Text>
            </View>
            <View style={styles.kpiRight}>
              <Text style={styles.kpiCount}>24 Asistencias (QR)</Text>
              <Text style={styles.kpiFails}>1 Retardo • 1 Justificada</Text>
            </View>
          </View>

          <View style={styles.progressBarBg}>
            <View style={styles.progressBarFill} />
          </View>
        </View>

        {/* Chips de Asignaturas */}
        <View style={styles.filtersRow}>
          <TouchableOpacity
            style={[styles.filterChip, activeFilter === 'all' && styles.filterChipActive]}
            onPress={() => setActiveFilter('all')}
          >
            <Text style={[styles.filterChipText, activeFilter === 'all' && styles.filterChipTextActive]}>
              Todas (26)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterChip, activeFilter === 'mat' && styles.filterChipActive]}
            onPress={() => setActiveFilter('mat')}
          >
            <Text style={[styles.filterChipText, activeFilter === 'mat' && styles.filterChipTextActive]}>
              Matemáticas
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterChip, activeFilter === 'fis' && styles.filterChipActive]}
            onPress={() => setActiveFilter('fis')}
          >
            <Text style={[styles.filterChipText, activeFilter === 'fis' && styles.filterChipTextActive]}>
              Física
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterChip, activeFilter === 'qui' && styles.filterChipActive]}
            onPress={() => setActiveFilter('qui')}
          >
            <Text style={[styles.filterChipText, activeFilter === 'qui' && styles.filterChipTextActive]}>
              Química
            </Text>
          </TouchableOpacity>
        </View>

        {/* Lista Histórica */}
        <FlatList
          data={filteredHistory}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        <Text style={styles.footerNote}>
          Los registros se sincronizan con las actas de Coordinación
        </Text>
      </View>
    </SafeAreaView>
  )
}

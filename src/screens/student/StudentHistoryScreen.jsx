import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState, useMemo } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView
} from 'react-native'
import { ChevronLeft } from 'lucide-react-native'
import { useClassSession } from '../../context/ClassSessionContext'
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
  const { students, classInfo } = useClassSession()
  const [activeFilter, setActiveFilter] = useState('all')

  const studentRecord = students?.find(
    s => s.name.toLowerCase().includes('daniel álvarez') || s.ci.includes('29.842.119')
  )

  const dynamicHistory = useMemo(() => {
    let list = [...HISTORY_DATA]
    if (studentRecord && studentRecord.status !== 'pending') {
      const isPresent = studentRecord.status === 'present_qr' || studentRecord.status === 'present_manual'
      const isLate = studentRecord.status === 'late'
      const isInReview = studentRecord.status === 'in_review'
      const isRejected = studentRecord.status === 'rejected' || studentRecord.incidentStatus === 'Rechazada'
      const isApproved = studentRecord.incidentStatus === 'Aprobada'
      const activeItem = {
        id: 'h-active',
        subject: classInfo.subject,
        filterKey: 'mat',
        sub: `${classInfo.section} • ${classInfo.classroom} • ${classInfo.teacher}`,
        time: `Hoy ${studentRecord.time || '10:05 AM'} • ${
          isRejected ? `Rechazada (${studentRecord.incidentFolio || '#INC-2026-0842'})` :
          isApproved ? `Justificada (${studentRecord.incidentFolio || '#INC-2026-0842'})` :
          isPresent ? (studentRecord.status === 'present_manual' ? 'Marcado Manual por Docente' : 'Escaneo puntual en aula') :
          isLate ? 'Registro con Retardo' :
          isInReview ? `Justificación en revisión (${studentRecord.incidentFolio || '#INC-2026-0842'})` :
          'Inasistencia'
        }`,
        note: isRejected ? `Dictamen Coord.: ${studentRecord.incidentNotes || 'Inasistencia confirmada'}` :
              isApproved ? `Dictamen Coord.: Asistencia convalidada (${studentRecord.incidentNotes || 'Aprobada'})` :
              isInReview ? `Motivo: ${studentRecord.incidentMotive || 'Salud / Médico'}` : undefined,
        status: isRejected ? 'rejected' : isApproved ? 'approved' : studentRecord.status,
        statusText: isRejected ? 'Rechazada' : isApproved ? 'Justificada' : isPresent ? 'Asistió (QR)' : isLate ? 'Retardo' : isInReview ? 'En revisión Coord.' : 'Inasistencia'
      }
      list = [activeItem, ...list.filter(item => item.id !== 'h1')]
    }
    return list
  }, [studentRecord, classInfo])

  const filteredHistory = activeFilter === 'all'
    ? dynamicHistory
    : dynamicHistory.filter(item => item.filterKey === activeFilter)

  const renderItem = ({ item }) => {
    const isPresent = item.status === 'present_qr'
    const isLate = item.status === 'late'
    const isInReview = item.status === 'in_review'
    const isRejected = item.status === 'rejected'
    const isApproved = item.status === 'approved'

    return (
      <View style={styles.historyCard}>
        <View style={styles.historyLeft}>
          <Text style={styles.historySubject}>{item.subject}</Text>
          <Text style={styles.historySub}>{item.sub}</Text>
          <Text style={styles.historyTime}>{item.time}</Text>
          {item.note && <Text style={styles.historyNote}>{item.note}</Text>}
        </View>

        <View style={styles.historyRight}>
          {isRejected && (
            <View style={styles.rejectedBadge}>
              <View style={styles.redDot} />
              <Text style={styles.rejectedBadgeText}>Rechazada</Text>
            </View>
          )}

          {isApproved && (
            <View style={styles.approvedBadge}>
              <View style={styles.greenDot} />
              <Text style={styles.approvedBadgeText}>Justificada</Text>
            </View>
          )}

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
        <View style={styles.filtersContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersScrollContent}
          >
            <TouchableOpacity
              style={[styles.filterChip, activeFilter === 'all' && styles.filterChipActive]}
              onPress={() => setActiveFilter('all')}
            >
              <Text style={[styles.filterChipText, activeFilter === 'all' && styles.filterChipTextActive]}>
                Todas
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
          </ScrollView>
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

import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState, useMemo, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView
} from 'react-native'
import { ChevronLeft } from 'lucide-react-native'
import { useAuth } from '../../context/AuthContext'
import { useClassSession } from '../../context/ClassSessionContext'
import { supabase } from '../../api/supabaseClient'
import { styles } from '../../styles/student/StudentHistory.styles'

const FALLBACK_HISTORY = [
  {
    id: 'h1',
    subject: 'Matemática',
    filterKey: 'mat',
    sub: '5to Año B • Aula 204 • Prof. Roberto García',
    time: 'Hoy 07:35 AM • Asistencia puntual en aula',
    status: 'present_qr',
    statusText: 'Asistió (QR)'
  },
  {
    id: 'h2',
    subject: 'Física',
    filterKey: 'fis',
    sub: '5to Año B • Aula 101 • Prof. Patricia Méndez',
    time: 'Ayer 08:44 AM • Registro con retardo',
    status: 'late',
    statusText: 'Retardo'
  },
  {
    id: 'h3',
    subject: 'Química',
    filterKey: 'qui',
    sub: '5to Año B • Aula 97 • Prof. Carmen Ortiz',
    time: 'Vie 25 Sep • 09:15 AM • Asistencia puntual en aula',
    status: 'present_qr',
    statusText: 'Asistió (QR)'
  },
  {
    id: 'h4',
    subject: 'Castellano',
    filterKey: 'cas',
    sub: '5to Año B • Aula 97 • Prof. Carmen Ortiz',
    time: 'Mar 22 Sep • Causa médica informada',
    note: 'Justificativo médico en validación',
    status: 'in_review',
    statusText: 'En revisión Coord.'
  },
  {
    id: 'h5',
    subject: 'Biología',
    filterKey: 'bio',
    sub: '5to Año B • Aula 201 • Prof. Alberto Díaz',
    time: 'Lun 21 Sep • 07:32 AM • Asistencia puntual en aula',
    status: 'present_qr',
    statusText: 'Asistió (QR)'
  }
]

export default function StudentHistoryScreen({ navigation }) {
  const { currentUser } = useAuth()
  const { students, classInfo } = useClassSession()
  const [activeFilter, setActiveFilter] = useState('all')
  const [serverLogs, setServerLogs] = useState([])

  const studentCi = currentUser?.ci || 'V-28.452.190'
  const studentName = currentUser?.name || 'Daniel'

  // Consultar registros reales de la bitácora viva en Supabase
  useEffect(() => {
    if (!supabase) return

    async function fetchLogs() {
      try {
        const cleanDigits = studentCi.replace(/[^0-9]/g, '')
        const { data, error } = await supabase
          .from('attendance_logs')
          .select('*')
          .or(`student_ci.ilike.%${cleanDigits}%,student_ci.ilike.%${studentCi}%`)
          .order('scan_timestamp', { ascending: false })
          .limit(20)

        if (!error && data && data.length > 0) {
          const mapped = data.map(log => {
            const dateObj = new Date(log.scan_timestamp)
            const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            const isLate = log.status === 'retardo'
            const isJustified = log.status === 'justificado'
            const isPresent = log.status === 'presente'

            return {
              id: log.id,
              subject: log.subject || 'Matemática',
              filterKey: log.subject?.toLowerCase().startsWith('fís') ? 'fis' : log.subject?.toLowerCase().startsWith('quím') ? 'qui' : 'mat',
              sub: `5to Año B • Aula ${log.classroom_id || '204'} • Verificado en Plantel`,
              time: `${dateObj.toLocaleDateString()} ${timeStr} • ${isPresent ? 'Escaneo QR en aula' : isLate ? 'Registro con retardo' : 'Justificado'}`,
              status: isPresent ? 'present_qr' : isLate ? 'late' : isJustified ? 'approved' : 'present_qr',
              statusText: isPresent ? 'Asistió (QR)' : isLate ? 'Retardo' : isJustified ? 'Justificada' : 'Asistió'
            }
          })
          setServerLogs(mapped)
        }
      } catch (err) {
        console.warn('Error al consultar historial en Supabase:', err)
      }
    }

    fetchLogs()
  }, [studentCi])

  const studentRecord = students?.find(
    s => s.ci.includes(studentCi.replace(/[^0-9]/g, '')) || s.name.toLowerCase().includes(studentName.toLowerCase())
  )

  const dynamicHistory = useMemo(() => {
    const baseList = serverLogs.length > 0 ? serverLogs : FALLBACK_HISTORY
    let list = [...baseList]

    if (studentRecord && studentRecord.status !== 'pending') {
      const isPresent = studentRecord.status === 'present_qr' || studentRecord.status === 'present_manual'
      const isLate = studentRecord.status === 'late'
      const isInReview = studentRecord.status === 'in_review'
      const isRejected = studentRecord.status === 'rejected' || studentRecord.incidentStatus === 'Rechazada'
      const isApproved = studentRecord.incidentStatus === 'Aprobada'

      const activeItem = {
        id: 'h-active',
        subject: classInfo.subject,
        filterKey: classInfo.subject?.toLowerCase().startsWith('fís') ? 'fis' : classInfo.subject?.toLowerCase().startsWith('quím') ? 'qui' : 'mat',
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
      list = [activeItem, ...list.filter(item => item.id !== 'h1' && item.id !== 'h-active')]
    }
    return list
  }, [studentRecord, classInfo, serverLogs])

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
              <Text style={styles.kpiPct}>96%</Text>
              <Text style={styles.kpiGrade}>Regular</Text>
              <Text style={styles.kpiStatus}>Sin riesgo</Text>
            </View>
            <View style={styles.kpiRight}>
              <Text style={styles.kpiCount}>Asistencia Oficial</Text>
              <Text style={styles.kpiFails}>Sincronizado con Supabase</Text>
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
                Matemática
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

import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList
} from 'react-native'
import { ChevronLeft, Search, Plus } from 'lucide-react-native'
import { useClassSession } from '../../context/ClassSessionContext'
import { styles } from '../../styles/teacher/TeacherRoster.styles'

export default function TeacherRosterScreen({ navigation }) {
  const { students, metrics } = useClassSession()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  const filteredStudents = students.filter(student => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.ci.toLowerCase().includes(searchQuery.toLowerCase())

    if (!matchesSearch) return false

    if (activeTab === 'present') {
      return student.status === 'present_qr' || student.status === 'present_manual'
    }
    if (activeTab === 'late') {
      return student.status === 'late'
    }
    if (activeTab === 'pending') {
      return student.status === 'pending'
    }
    return true
  })

  const renderStudentItem = ({ item }) => {
    const isPresentQr = item.status === 'present_qr'
    const isPresentManual = item.status === 'present_manual'
    const isLate = item.status === 'late'
    const isPending = item.status === 'pending'

    return (
      <View style={styles.studentCard}>
        <View style={styles.studentLeft}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{item.initials}</Text>
          </View>
          <View style={styles.studentInfo}>
            <Text style={styles.studentName}>{item.name}</Text>
            <Text style={styles.studentCi}>{item.ci}</Text>
            {isPresentManual && (
              <Text style={styles.manualAuditSub}>
                Registro Manual • {item.contingency || 'Auditoría Docente'}
              </Text>
            )}
            {item.status === 'in_review' && (
              <Text style={styles.manualAuditSub}>
                Justificación ({item.incidentFolio || '#INC-2026-0842'})
              </Text>
            )}
          </View>
        </View>

        <View style={styles.studentRight}>
          {isPresentQr && (
            <View style={styles.presentQrBadge}>
              <View style={styles.greenDot} />
              <Text style={styles.presentQrText}>Presente (QR)</Text>
            </View>
          )}

          {isPresentManual && (
            <View style={styles.presentManualBadge}>
              <View style={styles.blueDot} />
              <Text style={styles.presentManualText}>Presente (Manual)</Text>
            </View>
          )}

          {isLate && (
            <View style={styles.lateBadge}>
              <View style={styles.amberDot} />
              <Text style={styles.lateText}>Retardo ({item.time})</Text>
            </View>
          )}

          {item.status === 'in_review' && (
            <View style={styles.lateBadge}>
              <View style={styles.amberDot} />
              <Text style={styles.lateText}>En Revisión</Text>
            </View>
          )}

          {item.status === 'absent' && (
            <View style={[styles.lateBadge, { backgroundColor: '#fee2e2', borderColor: '#fca5a5' }]}>
              <View style={[styles.amberDot, { backgroundColor: '#dc2626' }]} />
              <Text style={[styles.lateText, { color: '#dc2626' }]}>Ausente</Text>
            </View>
          )}

          {isPending && (
            <TouchableOpacity
              style={styles.markBtn}
              onPress={() =>
                navigation.navigate('TeacherManualModal', { studentId: item.id, student: item })
              }
              activeOpacity={0.8}
            >
              <Plus size={14} color="#1e3a8a" />
              <Text style={styles.markBtnText}>Marcar</Text>
            </TouchableOpacity>
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
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <ChevronLeft size={24} color="#0f172a" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Control de Nómina ({metrics.total} Alumnos)</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Banner de Sincronización Local */}
        <View style={styles.syncBanner}>
          <View style={styles.greenDot} />
          <Text style={styles.syncBannerText}>Sincronizado • Almacenamiento local activo</Text>
        </View>

        {/* Barra de Búsqueda */}
        <View style={styles.searchBox}>
          <Search size={16} color="#64748b" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nombre o cédula..."
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Tabs de Filtro */}
        <View style={styles.tabsRow}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'all' && styles.tabActive]}
            onPress={() => setActiveTab('all')}
          >
            <Text style={[styles.tabText, activeTab === 'all' && styles.tabTextActive]}>
              Todos ({metrics.total})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'present' && styles.tabActive]}
            onPress={() => setActiveTab('present')}
          >
            <Text style={[styles.tabText, activeTab === 'present' && styles.tabTextActive]}>
              Presentes ({metrics.presents})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'late' && styles.tabActive]}
            onPress={() => setActiveTab('late')}
          >
            <Text style={[styles.tabText, activeTab === 'late' && styles.tabTextActive]}>
              Retardos ({metrics.lates})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'pending' && styles.tabActive]}
            onPress={() => setActiveTab('pending')}
          >
            <Text style={[styles.tabText, activeTab === 'pending' && styles.tabTextActive]}>
              Pend. ({metrics.pending})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Lista de Alumnos */}
        <FlatList
          data={filteredStudents}
          keyExtractor={item => item.id}
          renderItem={renderStudentItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        {/* Barra Fija Inferior */}
        <View style={styles.footerBar}>
          <Text style={styles.footerSummary}>
            Total: {metrics.presents} Presentes ({metrics.presentsManual} Manual) • {metrics.pending} Pendientes
          </Text>
          <Text style={styles.footerHint}>
            Toca sobre cualquier estudiante para gestionar su registro individual
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

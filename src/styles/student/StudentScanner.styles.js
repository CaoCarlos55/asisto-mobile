import { StyleSheet, Dimensions } from 'react-native'
import { theme } from '../theme'

const { width } = Dimensions.get('window')

export const styles = StyleSheet.create({
  darkSafeArea: {
    flex: 1,
    backgroundColor: '#0a0f1d'
  },
  scannerContainer: {
    flex: 1,
    padding: theme.spacing.xl,
    alignItems: 'center'
  },
  headerRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md
  },
  headerIconBtn: {
    padding: 6
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff'
  },
  geofenceBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(5, 150, 105, 0.2)',
    borderWidth: 1,
    borderColor: '#059669',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: theme.borderRadius.full,
    marginBottom: theme.spacing.lg
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981',
    marginRight: 8
  },
  geofenceBannerTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#34d399',
    letterSpacing: 0.5
  },
  geofenceBannerSub: {
    fontSize: 10,
    color: '#a7f3d0'
  },
  scannerWrapper: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scannerBox: {
    width: Math.min(width * 0.72, 240),
    height: Math.min(width * 0.72, 240),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  scanSubject: {
    fontSize: 17,
    fontWeight: '800',
    color: '#ffffff',
    marginTop: 8,
    marginBottom: 2
  },
  scanTeacher: {
    fontSize: 13,
    color: '#94a3b8',
    marginBottom: 6
  },
  scanHint: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: theme.spacing.md
  },
  geofenceCard: {
    width: '100%',
    backgroundColor: '#131b2e',
    borderRadius: theme.borderRadius.lg,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1e293b',
    marginBottom: 14
  },
  geofenceIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  geofenceInfo: {
    flex: 1
  },
  geofenceCardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 2
  },
  geofenceCardSub: {
    fontSize: 11,
    color: '#94a3b8'
  },
  geofenceDistance: {
    fontSize: 11,
    color: '#34d399',
    fontWeight: '600',
    marginTop: 2
  },
  validBadge: {
    backgroundColor: '#064e3b',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#059669'
  },
  validBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#34d399'
  },
  invalidBadge: {
    backgroundColor: '#450a0a',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#dc2626'
  },
  invalidBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#f87171'
  },
  simulationBar: {
    width: '100%',
    backgroundColor: '#131b2e',
    borderRadius: theme.borderRadius.md,
    padding: 10,
    alignItems: 'center'
  },
  simLabel: {
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: '600',
    marginBottom: 6
  },
  simButtonsRow: {
    flexDirection: 'row',
    gap: 6
  },
  simBtnGreen: {
    backgroundColor: '#059669',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8
  },
  simBtnAmber: {
    backgroundColor: '#d97706',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8
  },
  simBtnRed: {
    backgroundColor: '#dc2626',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8
  },
  simBtnText: {
    color: '#ffffff',
    fontSize: 10.5,
    fontWeight: '700'
  },
  manualEntryBtn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.4)',
    borderRadius: theme.borderRadius.lg,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12
  },
  btnIcon: {
    marginRight: 8
  },
  manualEntryBtnText: {
    color: '#38bdf8',
    fontSize: 13,
    fontWeight: '700'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.78)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  modalCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#131b2e',
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: '#1e293b'
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  modalHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
    marginLeft: 6
  },
  modalCloseBtn: {
    padding: 4
  },
  modalSubtitle: {
    fontSize: 12.5,
    color: '#94a3b8',
    lineHeight: 18,
    marginBottom: 14
  },
  modalGeofenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(5, 150, 105, 0.15)',
    borderWidth: 1,
    borderColor: '#059669',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginBottom: 14
  },
  modalGeofenceText: {
    fontSize: 11,
    color: '#34d399',
    fontWeight: '700',
    marginLeft: 6
  },
  modalInput: {
    backgroundColor: '#0a0f1d',
    borderWidth: 1.5,
    borderColor: '#38bdf8',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 6,
    marginBottom: 10
  },
  modalTokenHint: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginBottom: 10
  },
  modalTokenHintText: {
    fontSize: 11.5,
    color: '#34d399',
    fontWeight: '600'
  },
  modalQuickFillBtn: {
    alignItems: 'center',
    paddingVertical: 6,
    marginBottom: 14
  },
  modalQuickFillText: {
    fontSize: 12,
    color: '#38bdf8',
    fontWeight: '700',
    textDecorationLine: 'underline'
  },
  modalSubmitBtn: {
    backgroundColor: '#0284c7',
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8
  },
  modalSubmitBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800'
  },
  modalCancelBtn: {
    borderRadius: 12,
    paddingVertical: 8,
    alignItems: 'center'
  },
  modalCancelBtnText: {
    color: '#64748b',
    fontSize: 13,
    fontWeight: '600'
  }
})

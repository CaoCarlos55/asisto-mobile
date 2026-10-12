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
  }
})

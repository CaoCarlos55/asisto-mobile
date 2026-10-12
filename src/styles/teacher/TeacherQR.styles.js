import { StyleSheet } from 'react-native'
import { theme } from '../theme'

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  centerContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
    alignItems: 'center'
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md
  },
  backBtn: {
    padding: theme.spacing.xs
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.textPrimary
  },
  livePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.successBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.successBorder
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.success,
    marginRight: 6
  },
  livePillText: {
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.successText,
    letterSpacing: 0.5
  },
  subjectTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    marginBottom: 2
  },
  subjectSub: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg
  },
  qrCard: {
    width: '100%',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.xl,
    ...theme.shadows.card
  },
  timerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.successBg,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    marginBottom: theme.spacing.lg
  },
  timerText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.successText,
    marginLeft: 6
  },
  qrContainer: {
    padding: 16,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.lg
  },
  registeredPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primaryGhost,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    marginBottom: theme.spacing.lg
  },
  registeredPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.primary,
    marginLeft: 6
  },
  tokenPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: '#cbd5e1'
  },
  tokenPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#334155',
    letterSpacing: 0.3
  },
  greenMiniDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10b981',
    marginRight: 6
  },
  fullScreenBtn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    height: 48,
    ...theme.shadows.floating
  },
  btnIcon: {
    marginRight: theme.spacing.sm
  },
  fullScreenBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.textWhite
  },
  contingencyCard: {
    width: '100%',
    backgroundColor: theme.colors.dangerBg,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.dangerBorder,
    marginBottom: theme.spacing.xl
  },
  contingencyTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.danger,
    letterSpacing: 0.5,
    marginBottom: 2
  },
  contingencySub: {
    fontSize: 12,
    color: theme.colors.dangerText,
    marginBottom: theme.spacing.md
  },
  cancelBtn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.dangerBorder,
    height: 44
  },
  cancelBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.danger
  },
  footerNote: {
    fontSize: 11,
    color: theme.colors.textMuted,
    textAlign: 'center'
  },
  fullscreenModalArea: {
    flex: 1,
    backgroundColor: '#0b1528',
    justifyContent: 'space-between',
    padding: 20
  },
  fullscreenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 16
  },
  fullscreenHeaderLeft: {
    flex: 1
  },
  fullscreenClassTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 2
  },
  fullscreenClassSub: {
    fontSize: 13,
    color: '#94a3b8',
    fontWeight: '500'
  },
  fullscreenExitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.full
  },
  fullscreenExitBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700'
  },
  fullscreenCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10
  },
  fullscreenTokenBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 20
  },
  fullscreenTokenText: {
    color: '#22c55e',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5
  },
  fullscreenQrBox: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 8,
    marginBottom: 20
  },
  fullscreenLiveCountPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#13233f',
    borderWidth: 1,
    borderColor: '#1e3a8a',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.full,
    marginBottom: 16
  },
  fullscreenLiveCountText: {
    color: '#bfdbfe',
    fontSize: 13,
    fontWeight: '700'
  },
  fullscreenHint: {
    color: '#64748b',
    fontSize: 12,
    textAlign: 'center',
    maxWidth: 280
  }
})

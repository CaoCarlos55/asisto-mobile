import { StyleSheet } from 'react-native'
import { theme } from '../theme'

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  container: {
    padding: theme.spacing.xl
  },
  headerSection: {
    marginBottom: theme.spacing.xl
  },
  topStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md
  },
  livePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eff6ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.primaryBorder
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.success,
    marginRight: 6
  },
  livePillText: {
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.primary,
    letterSpacing: 0.5
  },
  onlinePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceAlt,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full
  },
  blueDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.primaryLight,
    marginRight: 6
  },
  onlinePillText: {
    fontSize: 11,
    color: theme.colors.textSecondary,
    fontWeight: '600'
  },
  classTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    marginBottom: 4
  },
  classSubtitle: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    fontWeight: '500',
    marginBottom: theme.spacing.sm
  },
  elapsedRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  elapsedIcon: {
    marginRight: 6
  },
  elapsedText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginLeft: 6
  },
  kpiCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.xl,
    ...theme.shadows.card
  },
  kpiCardTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: theme.spacing.lg
  },
  kpiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg
  },
  kpiItem: {
    alignItems: 'center',
    flex: 1
  },
  kpiValue: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 2
  },
  kpiValuePresent: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 2,
    color: theme.colors.success
  },
  kpiValueLate: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 2,
    color: theme.colors.warning
  },
  kpiValuePending: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 2,
    color: theme.colors.textSecondary
  },
  kpiLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textSecondary
  },
  progressBarBg: {
    height: 8,
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: 4,
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: theme.colors.success,
    borderRadius: 4
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: theme.spacing.md
  },
  moduleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.md,
    ...theme.shadows.card
  },
  moduleIconBox: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.lg
  },
  moduleIconBoxBlue: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.lg,
    backgroundColor: '#eff6ff'
  },
  moduleIconBoxGreen: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.lg,
    backgroundColor: '#f0fdf4'
  },
  moduleIconBoxGray: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.lg,
    backgroundColor: '#f8fafc'
  },
  moduleInfo: {
    flex: 1
  },
  moduleTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: 2
  },
  moduleDesc: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: 4
  },
  qrStatusMini: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  greenMiniDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.success,
    marginRight: 6
  },
  qrStatusMiniText: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.colors.success
  },
  offlineTag: {
    fontSize: 10,
    fontWeight: '700',
    color: theme.colors.primary,
    letterSpacing: 0.3
  },
  closeBtn: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
    ...theme.shadows.floating
  },
  closeBtnContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  btnIcon: {
    marginRight: theme.spacing.sm
  },
  closeBtnText: {
    color: theme.colors.textWhite,
    fontSize: 15,
    fontWeight: '700'
  },
  closeBtnNote: {
    fontSize: 11,
    color: theme.colors.textMuted,
    textAlign: 'center',
    marginBottom: theme.spacing.md
  },
  resetSimBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    paddingVertical: 12,
    marginBottom: theme.spacing.xl
  },
  resetSimBtnText: {
    color: '#475569',
    fontSize: 13,
    fontWeight: '700'
  }
})

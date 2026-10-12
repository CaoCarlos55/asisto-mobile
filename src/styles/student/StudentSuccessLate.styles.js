import { StyleSheet } from 'react-native'
import { theme } from '../theme'

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  centerContainer: {
    padding: theme.spacing.xl,
    alignItems: 'center'
  },
  resultIconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: theme.colors.warning,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
    ...theme.shadows.floating
  },
  resultTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
    textAlign: 'center'
  },
  frontierPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.warningBg,
    borderWidth: 1,
    borderColor: theme.colors.warningBorder,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: theme.borderRadius.full,
    marginBottom: theme.spacing.lg
  },
  amberDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.warning,
    marginRight: 6
  },
  frontierPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.warningText,
    letterSpacing: 0.5
  },
  warningBox: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: theme.colors.warningBg,
    borderWidth: 1,
    borderColor: theme.colors.warningBorder,
    borderRadius: theme.borderRadius.lg,
    padding: 14,
    marginBottom: theme.spacing.xl
  },
  warningIcon: {
    marginRight: 8,
    marginTop: 2
  },
  warningContent: {
    flex: 1
  },
  warningTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#92400e',
    marginBottom: 2
  },
  warningText: {
    fontSize: 12,
    color: theme.colors.warningText,
    lineHeight: 18
  },
  resultCard: {
    width: '100%',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.xl,
    ...theme.shadows.card
  },
  cardHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: theme.spacing.md
  },
  fieldLabel: {
    fontSize: 11,
    color: theme.colors.textSecondary,
    marginBottom: 2
  },
  fieldValue: {
    fontSize: 15,
    fontWeight: '800',
    color: theme.colors.textPrimary
  },
  fieldSub: {
    fontSize: 11.5,
    color: theme.colors.textSecondary,
    marginTop: 2
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.borderLight,
    marginVertical: theme.spacing.md
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  timeValue: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.textPrimary
  },
  statusBox: {
    backgroundColor: theme.colors.warningBg,
    borderWidth: 1,
    borderColor: theme.colors.warningBorder,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: 'center'
  },
  statusLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: theme.colors.warning,
    letterSpacing: 0.5
  },
  statusValue: {
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.warning
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  recordTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.textPrimary
  },
  recordCount: {
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.warning
  },
  progressBarBg: {
    height: 8,
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: 4,
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    width: '66%',
    backgroundColor: theme.colors.warning,
    borderRadius: 4
  },
  primaryBtn: {
    width: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    ...theme.shadows.floating
  },
  primaryBtnText: {
    color: theme.colors.textWhite,
    fontSize: 14,
    fontWeight: '700'
  },
  secondaryBtn: {
    width: '100%',
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.borderDark,
    borderRadius: theme.borderRadius.md,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center'
  },
  secondaryBtnText: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    fontWeight: '600'
  }
})

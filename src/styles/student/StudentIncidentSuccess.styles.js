import { StyleSheet } from 'react-native'
import { theme } from '../theme'

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  centerContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
    alignItems: 'center'
  },
  resultIconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#4338ca',
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
  folioPill: {
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#bfdbfe',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: theme.borderRadius.full,
    marginBottom: theme.spacing.xl
  },
  folioPillText: {
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.primaryLight,
    letterSpacing: 0.5
  },
  reviewBanner: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: theme.colors.warningBg,
    borderWidth: 1,
    borderColor: theme.colors.warningBorder,
    borderRadius: theme.borderRadius.lg,
    padding: 14,
    alignItems: 'flex-start',
    marginBottom: theme.spacing.xl
  },
  amberDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.warning,
    marginRight: 10,
    marginTop: 4
  },
  reviewContent: {
    flex: 1
  },
  reviewTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#92400e',
    marginBottom: 2
  },
  reviewSub: {
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
  statusBox: {
    backgroundColor: theme.colors.dangerBg,
    borderWidth: 1,
    borderColor: theme.colors.dangerBorder,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: 'center'
  },
  statusLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: theme.colors.dangerText,
    letterSpacing: 0.5
  },
  statusValue: {
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.dangerText
  },
  hintText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    textAlign: 'center'
  },
  hintHighlight: {
    fontWeight: '700',
    color: theme.colors.success
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

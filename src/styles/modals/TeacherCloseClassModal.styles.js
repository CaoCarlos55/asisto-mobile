import { StyleSheet } from 'react-native'
import { theme } from '../theme'

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: theme.colors.modalOverlay,
    justifyContent: 'flex-end'
  },
  modalSheet: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    paddingBottom: 36
  },
  modalNotch: {
    width: 38,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.borderDark,
    alignSelf: 'center',
    marginBottom: theme.spacing.lg
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: theme.spacing.lg
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.textPrimary
  },
  consignmentTag: {
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    letterSpacing: 0.5
  },
  balanceCard: {
    backgroundColor: theme.colors.surfaceAlt,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg
  },
  balanceTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.textSecondary,
    letterSpacing: 0.5,
    marginBottom: theme.spacing.md
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  balanceItem: {
    flex: 1
  },
  balanceValPresent: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 2,
    color: theme.colors.success
  },
  balanceValLate: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 2,
    color: theme.colors.warning
  },
  balanceValPending: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 2,
    color: theme.colors.danger
  },
  balanceLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.textPrimary
  },
  balanceSub: {
    fontSize: 10,
    color: theme.colors.textSecondary,
    marginTop: 2
  },
  termsBox: {
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: theme.borderRadius.lg,
    padding: 14,
    marginBottom: theme.spacing.xl
  },
  termsTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm
  },
  termItem: {
    marginBottom: 6
  },
  termHeading: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155'
  },
  termDesc: {
    fontSize: 11.5,
    color: theme.colors.textSecondary,
    marginLeft: 10
  },
  closeBtn: {
    backgroundColor: theme.colors.textPrimary,
    borderRadius: theme.borderRadius.md,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    ...theme.shadows.floating
  },
  btnIcon: {
    marginRight: theme.spacing.sm
  },
  closeBtnText: {
    color: theme.colors.textWhite,
    fontSize: 14,
    fontWeight: '700'
  },
  backBtn: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.borderDark,
    borderRadius: theme.borderRadius.md,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center'
  },
  backBtnText: {
    color: '#475569',
    fontSize: 13,
    fontWeight: '600'
  }
})

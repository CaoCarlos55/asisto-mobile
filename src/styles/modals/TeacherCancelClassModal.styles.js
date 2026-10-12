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
  alertIconBox: {
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.dangerBg,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTextContainer: {
    flex: 1
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.textPrimary
  },
  destructiveTag: {
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.danger,
    letterSpacing: 0.5
  },
  warningBox: {
    backgroundColor: theme.colors.dangerBg,
    borderWidth: 1,
    borderColor: theme.colors.dangerBorder,
    borderRadius: theme.borderRadius.md,
    padding: 14,
    marginBottom: theme.spacing.lg
  },
  warningBoxTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.dangerText,
    marginBottom: 6
  },
  warningBullet: {
    fontSize: 12,
    color: '#b91c1c',
    lineHeight: 18
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
    letterSpacing: 0.5
  },
  textAreaContainer: {
    borderWidth: 1,
    borderColor: theme.colors.borderDark,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    height: 100,
    marginBottom: theme.spacing.sm
  },
  textArea: {
    flex: 1,
    fontSize: 13,
    color: theme.colors.textPrimary,
    textAlignVertical: 'top'
  },
  charCounter: {
    fontSize: 11,
    color: theme.colors.textMuted,
    textAlign: 'right'
  },
  syncNote: {
    fontSize: 11,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xl
  },
  confirmCancelBtn: {
    backgroundColor: theme.colors.danger,
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
  confirmCancelBtnText: {
    color: theme.colors.textWhite,
    fontSize: 15,
    fontWeight: '700'
  },
  dismissBtn: {
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: theme.borderRadius.md,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dismissBtnText: {
    color: theme.colors.textPrimary,
    fontSize: 14,
    fontWeight: '600'
  }
})

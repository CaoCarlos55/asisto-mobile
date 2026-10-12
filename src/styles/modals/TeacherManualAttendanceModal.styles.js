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
    backgroundColor: theme.colors.primaryGhost,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.textPrimary
  },
  contingencyTag: {
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.primaryLight,
    letterSpacing: 0.5
  },
  studentCard: {
    backgroundColor: theme.colors.surfaceAlt,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#475569'
  },
  studentInfo: {
    flex: 1
  },
  studentName: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: 2
  },
  studentCi: {
    fontSize: 11,
    color: theme.colors.textSecondary
  },
  pendingBadge: {
    backgroundColor: theme.colors.surfaceAlt,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  pendingBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.colors.textSecondary
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
    letterSpacing: 0.5
  },
  chipsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: theme.spacing.lg
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.borderDark,
    borderRadius: theme.borderRadius.md,
    paddingVertical: 8,
    paddingHorizontal: 12
  },
  chipSelected: {
    backgroundColor: '#eff6ff',
    borderColor: '#1d4ed8'
  },
  chipIcon: {
    marginRight: 6
  },
  chipText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600'
  },
  chipTextSelected: {
    color: '#1d4ed8',
    fontWeight: '700'
  },
  auditBox: {
    flexDirection: 'row',
    backgroundColor: theme.colors.primaryGhost,
    borderWidth: 1,
    borderColor: theme.colors.primaryBorder,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.xl
  },
  auditIcon: {
    marginTop: 2,
    marginRight: 8
  },
  auditContent: {
    flex: 1
  },
  auditTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1e40af',
    marginBottom: 2
  },
  auditDesc: {
    fontSize: 11.5,
    color: '#1d4ed8',
    lineHeight: 16
  },
  confirmBtn: {
    backgroundColor: theme.colors.primary,
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
  confirmBtnText: {
    color: theme.colors.textWhite,
    fontSize: 14,
    fontWeight: '700'
  },
  cancelBtn: {
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: theme.borderRadius.md,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cancelBtnText: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    fontWeight: '600'
  }
})

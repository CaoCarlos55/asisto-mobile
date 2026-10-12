import { StyleSheet } from 'react-native'
import { theme } from '../theme'

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  keyboardView: {
    flex: 1
  },
  container: {
    padding: theme.spacing.xl
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  backText: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: '700'
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: theme.colors.textPrimary
  },
  headerSpacer: {
    width: 60
  },
  alertBanner: {
    flexDirection: 'row',
    backgroundColor: theme.colors.dangerBg,
    borderWidth: 1,
    borderColor: theme.colors.dangerBorder,
    borderRadius: theme.borderRadius.lg,
    padding: 14,
    alignItems: 'center',
    marginBottom: theme.spacing.lg
  },
  alertIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md
  },
  alertExclamation: {
    color: theme.colors.textWhite,
    fontWeight: '800',
    fontSize: 16
  },
  alertTextContainer: {
    flex: 1
  },
  alertTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.dangerText,
    marginBottom: 2
  },
  alertSub: {
    fontSize: 11.5,
    color: '#b91c1c',
    lineHeight: 16
  },
  card: {
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
    marginBottom: 4
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.lg
  },
  subjectBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg
  },
  subjectLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: theme.colors.textSecondary,
    marginBottom: 2
  },
  subjectName: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.textPrimary
  },
  roomBadge: {
    backgroundColor: theme.colors.dangerBg,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8
  },
  roomBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.danger
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm
  },
  motivesRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: theme.spacing.lg
  },
  motiveChip: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.borderDark,
    alignItems: 'center'
  },
  motiveChipSelected: {
    backgroundColor: '#eff6ff',
    borderColor: '#1d4ed8'
  },
  motiveChipText: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '600'
  },
  motiveChipTextSelected: {
    color: '#1d4ed8',
    fontWeight: '700'
  },
  textAreaBox: {
    borderWidth: 1,
    borderColor: theme.colors.borderDark,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    height: 90,
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing.lg
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
  fileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceAlt,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg
  },
  pdfBadge: {
    backgroundColor: theme.colors.dangerBg,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginRight: 10
  },
  pdfBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.danger
  },
  fileDetails: {
    flex: 1
  },
  fileName: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.textPrimary
  },
  fileSub: {
    fontSize: 11,
    color: theme.colors.success,
    marginTop: 2
  },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: theme.colors.borderDark,
    borderRadius: theme.borderRadius.md,
    height: 48,
    marginBottom: theme.spacing.lg
  },
  uploadIcon: {
    marginRight: theme.spacing.sm
  },
  uploadBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.primary
  },
  reviewPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eff6ff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.success,
    marginRight: 6
  },
  reviewPillText: {
    fontSize: 11,
    color: '#1e40af',
    fontWeight: '600'
  },
  submitBtn: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    ...theme.shadows.floating
  },
  submitBtnText: {
    color: theme.colors.textWhite,
    fontSize: 15,
    fontWeight: '700'
  },
  omitBtn: {
    paddingVertical: 10,
    alignItems: 'center'
  },
  omitBtnText: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    fontWeight: '600'
  }
})

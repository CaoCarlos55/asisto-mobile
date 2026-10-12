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
    marginBottom: theme.spacing.sm
  },
  backBtn: {
    padding: theme.spacing.xs
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.textPrimary
  },
  optionalBadge: {
    backgroundColor: theme.colors.surfaceAlt,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  optionalBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.textSecondary
  },
  subjectTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    marginBottom: 2
  },
  subjectSub: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
    letterSpacing: 0.5
  },
  richEditorCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.borderDark,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.card
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: theme.colors.borderLight,
    paddingBottom: theme.spacing.sm,
    marginBottom: theme.spacing.sm
  },
  toolBtn: {
    padding: 6,
    marginRight: 6,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.background
  },
  editorHint: {
    fontSize: 11,
    color: theme.colors.textMuted,
    marginLeft: 'auto'
  },
  topicInput: {
    fontSize: 14,
    color: theme.colors.textPrimary,
    minHeight: 60,
    textAlignVertical: 'top'
  },
  chipsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 8,
    marginBottom: theme.spacing.lg
  },
  chip: {
    width: '48.5%',
    minHeight: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surface,
    borderWidth: 1.5,
    borderColor: theme.colors.borderDark,
    borderRadius: theme.borderRadius.md,
    paddingVertical: 8,
    paddingHorizontal: 6
  },
  chipSelected: {
    backgroundColor: '#eff6ff',
    borderColor: '#1d4ed8'
  },
  chipIcon: {
    marginRight: 6
  },
  chipText: {
    fontSize: 11.5,
    color: '#475569',
    fontWeight: '600',
    textAlign: 'center'
  },
  chipTextSelected: {
    color: '#1d4ed8',
    fontWeight: '700'
  },
  obsContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.borderDark,
    padding: theme.spacing.md,
    height: 110,
    marginBottom: theme.spacing.md,
    ...theme.shadows.card
  },
  obsInput: {
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
  linkBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.successBg,
    borderWidth: 1,
    borderColor: theme.colors.successBorder,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.lg
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.success,
    marginRight: 6
  },
  linkBannerText: {
    fontSize: 11.5,
    color: theme.colors.successText,
    fontWeight: '600',
    marginLeft: 4
  },
  saveBtn: {
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
  saveBtnText: {
    color: theme.colors.textWhite,
    fontSize: 14,
    fontWeight: '700'
  },
  skipBtn: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.borderDark,
    borderRadius: theme.borderRadius.md,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center'
  },
  skipBtnText: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    fontWeight: '600'
  }
})

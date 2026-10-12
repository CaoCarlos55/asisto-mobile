import { StyleSheet } from 'react-native'
import { theme } from '../theme'

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.md
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md
  },
  backBtn: {
    padding: theme.spacing.xs
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.textPrimary
  },
  headerSpacer: {
    width: 24
  },
  syncBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.successBg,
    borderWidth: 1,
    borderColor: theme.colors.successBorder,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.success,
    marginRight: 6
  },
  blueDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primaryLight,
    marginRight: 6
  },
  amberDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.warning,
    marginRight: 6
  },
  syncBannerText: {
    fontSize: 12,
    color: theme.colors.successText,
    fontWeight: '600'
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.borderDark,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    height: 44,
    marginBottom: theme.spacing.md
  },
  searchIcon: {
    marginRight: theme.spacing.sm
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: theme.colors.textPrimary
  },
  tabsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: theme.spacing.md
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  tabActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary
  },
  tabText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.textSecondary
  },
  tabTextActive: {
    color: theme.colors.textWhite
  },
  studentCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 8,
    ...theme.shadows.card
  },
  studentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  studentInfo: {
    flex: 1
  },
  studentRight: {
    alignItems: 'flex-end'
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  avatarText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569'
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
  manualAuditSub: {
    fontSize: 10.5,
    color: theme.colors.primaryLight,
    fontWeight: '600',
    marginTop: 2
  },
  presentQrBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.successBg,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.successBorder
  },
  presentQrText: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.success
  },
  presentManualBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primaryGhost,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.primaryBorder
  },
  presentManualText: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.primaryLight
  },
  lateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.warningBg,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.warningBorder
  },
  lateText: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.warning
  },
  absentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fee2e2',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: '#fca5a5'
  },
  redDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#dc2626',
    marginRight: 6
  },
  absentText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#dc2626'
  },
  rejectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fee2e2',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: '#fca5a5'
  },
  rejectedText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#dc2626'
  },
  markBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    paddingVertical: 6,
    paddingHorizontal: 12,
    gap: 4
  },
  markBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.primary
  },
  listContent: {
    paddingBottom: 80
  },
  footerBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  footerSummary: {
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    marginBottom: 2
  },
  footerHint: {
    fontSize: 11,
    color: theme.colors.textSecondary
  }
})

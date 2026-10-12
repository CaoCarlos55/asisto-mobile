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
    marginBottom: theme.spacing.lg
  },
  headerBackBtn: {
    padding: theme.spacing.xs
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: theme.colors.textPrimary
  },
  headerSpacer: {
    width: 24
  },
  kpiCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.card
  },
  kpiCardTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: theme.spacing.md
  },
  kpiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md
  },
  kpiPct: {
    fontSize: 26,
    fontWeight: '800',
    color: theme.colors.success
  },
  kpiGrade: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.textPrimary
  },
  kpiStatus: {
    fontSize: 11,
    color: theme.colors.textSecondary
  },
  kpiRight: {
    alignItems: 'flex-end'
  },
  kpiCount: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.textPrimary
  },
  kpiFails: {
    fontSize: 11,
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
    width: '94%',
    backgroundColor: theme.colors.success,
    borderRadius: 4
  },
  filtersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: theme.spacing.lg
  },
  filterChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.borderDark
  },
  filterChipActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textSecondary
  },
  filterChipTextActive: {
    color: theme.colors.textWhite,
    fontWeight: '700'
  },
  historyCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 10,
    ...theme.shadows.card
  },
  historyLeft: {
    flex: 1,
    marginRight: 10
  },
  historySubject: {
    fontSize: 15,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    marginBottom: 2
  },
  historySub: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: 4
  },
  historyTime: {
    fontSize: 11.5,
    color: '#475569',
    fontWeight: '500'
  },
  historyNote: {
    fontSize: 11,
    color: theme.colors.primaryLight,
    fontWeight: '600',
    marginTop: 4
  },
  historyRight: {
    alignItems: 'flex-end'
  },
  presentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.successBg,
    paddingVertical: 4,
    paddingHorizontal: 8,
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
  presentBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.success
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
  amberDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.warning,
    marginRight: 6
  },
  lateBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.warning
  },
  reviewBadge: {
    backgroundColor: theme.colors.primaryGhost,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.primaryBorder
  },
  reviewBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.primaryLight
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
  redDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#dc2626',
    marginRight: 6
  },
  rejectedBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#dc2626'
  },
  approvedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecfdf5',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: '#a7f3d0'
  },
  approvedBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669'
  },
  listContent: {
    paddingBottom: 40
  },
  footerNote: {
    fontSize: 11,
    color: theme.colors.textMuted,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.md
  }
})

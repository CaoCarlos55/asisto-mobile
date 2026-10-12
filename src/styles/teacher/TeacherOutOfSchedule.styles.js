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
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xl
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md
  },
  avatarText: {
    color: theme.colors.textWhite,
    fontSize: 16,
    fontWeight: '800'
  },
  profileInfo: {
    justifyContent: 'center'
  },
  profileName: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.textPrimary
  },
  profileDept: {
    fontSize: 12,
    color: theme.colors.textSecondary
  },
  logoutBtn: {
    padding: theme.spacing.sm
  },
  centerCard: {
    width: '100%',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xxl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.xl,
    ...theme.shadows.card
  },
  clockIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
    position: 'relative'
  },
  warningMiniBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.warning,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: theme.colors.surface
  },
  centerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
    textAlign: 'center'
  },
  centerTag: {
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.textMuted,
    letterSpacing: 1,
    marginBottom: theme.spacing.md
  },
  centerDesc: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: theme.spacing.xl
  },
  serverTimePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceAlt,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.success,
    marginRight: 6
  },
  serverTimeText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textSecondary
  },
  nextClassCard: {
    width: '100%',
    backgroundColor: '#eff6ff',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.primaryBorder,
    marginBottom: theme.spacing.xl
  },
  nextClassLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.primary,
    letterSpacing: 0.5,
    marginBottom: theme.spacing.xs
  },
  nextClassTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.primary,
    marginBottom: 2
  },
  nextClassSub: {
    fontSize: 13,
    color: '#3b82f6',
    marginBottom: theme.spacing.md
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8
  },
  badgeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginLeft: 4
  },
  badgeHighlight: {
    backgroundColor: '#dbeafe',
    borderColor: '#93c5fd'
  },
  badgeHighlightText: {
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.primary
  },
  verifyBtn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surface,
    borderWidth: 1.5,
    borderColor: theme.colors.primaryBorder,
    borderRadius: theme.borderRadius.md,
    height: 48,
    marginBottom: theme.spacing.md
  },
  btnIcon: {
    marginRight: theme.spacing.sm
  },
  verifyBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.primary
  },
  footerNote: {
    fontSize: 11,
    color: theme.colors.textMuted,
    textAlign: 'center'
  }
})

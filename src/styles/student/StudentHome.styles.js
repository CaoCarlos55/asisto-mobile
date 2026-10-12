import { StyleSheet } from 'react-native'
import { theme } from '../theme'

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  container: {
    padding: theme.spacing.xl
  },
  header: {
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
  greeting: {
    fontSize: 12,
    color: theme.colors.textSecondary
  },
  name: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.textPrimary
  },
  headerRight: {
    alignItems: 'flex-end',
    gap: 6
  },
  geofencePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.successBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
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
  geofenceText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: theme.colors.successText
  },
  logoutBtn: {
    padding: theme.spacing.xs
  },
  currentClassCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.card
  },
  classCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md
  },
  inCourseBadge: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.primaryBorder
  },
  inCourseText: {
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.primary,
    letterSpacing: 0.5
  },
  minuteBadge: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.primaryLight
  },
  subjectTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    marginBottom: 4
  },
  teacherSub: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginBottom: 2
  },
  roomSub: {
    fontSize: 12,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.lg
  },
  unregisteredAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.warningBg,
    borderWidth: 1,
    borderColor: theme.colors.warningBorder,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  alertIcon: {
    marginRight: 6
  },
  unregisteredAlertText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.warningText,
    marginLeft: 6
  },
  scanBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
    ...theme.shadows.floating
  },
  scanIconBox: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md
  },
  scanBtnInfo: {
    flex: 1
  },
  scanBtnTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.textWhite,
    marginBottom: 2
  },
  scanBtnSub: {
    fontSize: 12,
    color: '#bfdbfe'
  },
  attendanceCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.card
  },
  attendanceCardTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: theme.spacing.md
  },
  attendanceStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: theme.spacing.md
  },
  attendanceStatsRight: {
    alignItems: 'flex-end'
  },
  attendancePct: {
    fontSize: 28,
    fontWeight: '800',
    color: theme.colors.success
  },
  attendanceGrade: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.textPrimary
  },
  attendanceStatus: {
    fontSize: 11,
    color: theme.colors.textSecondary
  },
  attendanceCount: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.textPrimary
  },
  attendanceFails: {
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
  historyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.xl,
    ...theme.shadows.card
  },
  historyIconBox: {
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.md,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md
  },
  historyInfo: {
    flex: 1
  },
  historyTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: 2
  },
  historySub: {
    fontSize: 12,
    color: theme.colors.textSecondary
  },
  footerNote: {
    fontSize: 11,
    color: theme.colors.textMuted,
    textAlign: 'center',
    marginBottom: theme.spacing.xl
  }
})

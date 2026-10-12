import { StyleSheet } from 'react-native'
import { theme } from '../theme'

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg
  },
  profileRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10
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
    flex: 1,
    justifyContent: 'center'
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  geofencePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.successBg,
    paddingHorizontal: 9,
    paddingVertical: 5,
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
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.successText
  },
  logoutBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2
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
    marginBottom: theme.spacing.md,
    flexWrap: 'wrap',
    gap: 8
  },
  inCourseBadge: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: '#bfdbfe',
    maxWidth: '100%'
  },
  inCourseText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#1d4ed8',
    letterSpacing: 0.5
  },
  minuteBadge: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.textSecondary
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
    alignItems: 'flex-start',
    backgroundColor: theme.colors.warningBg,
    borderWidth: 1,
    borderColor: theme.colors.warningBorder,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  alertIcon: {
    marginRight: 8,
    marginTop: 2
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
    marginBottom: theme.spacing.sm,
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
  manualEntryLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    marginBottom: theme.spacing.lg
  },
  manualEntryLinkText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: theme.colors.primary,
    marginLeft: 6
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
    marginBottom: theme.spacing.md
  },
  registeredAlert: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f0fdf4',
    borderWidth: 1,
    borderColor: '#bbf7d0',
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  registeredAlertText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#15803d',
    flex: 1
  },
  closedAlert: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  closedAlertText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#b91c1c',
    flex: 1
  },
  alertTextBox: {
    flex: 1,
    marginLeft: 6
  },
  closedAlertSub: {
    fontSize: 11,
    color: '#991b1b',
    marginTop: 2
  },
  approvedAlertSub: {
    fontSize: 11,
    color: '#166534',
    marginTop: 2
  },
  resetSimBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    paddingVertical: 11,
    marginBottom: theme.spacing.xl
  },
  resetSimBtnText: {
    color: '#475569',
    fontSize: 13,
    fontWeight: '700'
  }
})

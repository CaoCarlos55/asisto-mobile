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
    flexGrow: 1,
    justifyContent: 'center',
    padding: theme.spacing.xl
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl
  },
  brandIconBox: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#1d4ed8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: -0.5,
    marginBottom: 2
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: 4
  },
  subtitle: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    textAlign: 'center'
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.card
  },
  cardTitle: {
    fontSize: theme.typography.titleSmall.fontSize,
    fontWeight: theme.typography.titleSmall.fontWeight,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs
  },
  cardSubtitle: {
    fontSize: theme.typography.bodySmall.fontSize,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg
  },
  inputLabel: {
    fontSize: theme.typography.caption.fontSize,
    fontWeight: '700',
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
    letterSpacing: 0.5
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    height: 48
  },
  inputIcon: {
    marginRight: theme.spacing.sm
  },
  input: {
    flex: 1,
    fontSize: theme.typography.bodyRegular.fontSize,
    color: theme.colors.textPrimary
  },
  eyeBtn: {
    padding: theme.spacing.xs
  },
  forgotPass: {
    alignSelf: 'flex-end',
    marginBottom: theme.spacing.lg
  },
  forgotPassText: {
    fontSize: theme.typography.bodySmall.fontSize,
    color: theme.colors.primaryLight,
    fontWeight: '600'
  },
  loginBtn: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
    ...theme.shadows.floating
  },
  loginBtnText: {
    color: theme.colors.textWhite,
    fontSize: theme.typography.bodyLarge.fontSize,
    fontWeight: '700'
  },
  disclaimer: {
    fontSize: 11,
    color: theme.colors.textMuted,
    textAlign: 'center'
  },
  switchRoleBtn: {
    marginTop: theme.spacing.xl,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.primaryBorder,
    alignItems: 'center'
  },
  switchRoleText: {
    fontSize: theme.typography.bodySmall.fontSize,
    color: theme.colors.textSecondary,
    fontWeight: '500'
  },
  switchRoleTextHighlight: {
    color: theme.colors.primaryLight,
    fontWeight: '700'
  },
  statusPillTeacher: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.lg,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: '#eff6ff',
    borderRadius: theme.borderRadius.full,
    alignSelf: 'center'
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.success,
    marginRight: 6
  },
  statusPillTextTeacher: {
    fontSize: 11,
    color: theme.colors.primary,
    fontWeight: '600'
  }
})

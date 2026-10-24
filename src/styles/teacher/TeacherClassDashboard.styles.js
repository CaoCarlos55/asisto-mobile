import { StyleSheet } from 'react-native'
import { theme } from '../theme'

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#183b7e'
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#f8fafc'
  },
  scrollContent: {
    flexGrow: 1
  },
  headerSection: {
    backgroundColor: '#183b7e',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 22
  },
  topStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    flexWrap: 'wrap',
    gap: 8
  },
  livePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#009b5a',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20
  },
  whiteDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#ffffff',
    marginRight: 6
  },
  livePillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 0.5
  },
  onlineRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#22c55e',
    marginRight: 6
  },
  onlineText: {
    fontSize: 12,
    color: '#bfdbfe',
    fontWeight: '600'
  },
  classTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4
  },
  classSubtitle: {
    fontSize: 13,
    color: '#bfdbfe',
    fontWeight: '500',
    marginBottom: 8
  },
  elapsedRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  elapsedIcon: {
    marginRight: 6
  },
  elapsedText: {
    fontSize: 12,
    color: '#bfdbfe'
  },
  bodySection: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 40
  },
  kpiCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20,
    ...theme.shadows.card
  },
  kpiCardTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748b',
    letterSpacing: 0.5,
    marginBottom: 14
  },
  kpiRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 14,
    flexWrap: 'wrap',
    gap: 8
  },
  kpiItem: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    flexShrink: 1
  },
  kpiValuePresent: {
    fontSize: 24,
    fontWeight: '800',
    color: '#009b5a'
  },
  kpiLabelPresent: {
    fontSize: 13,
    fontWeight: '700',
    color: '#009b5a'
  },
  kpiValueLate: {
    fontSize: 24,
    fontWeight: '800',
    color: '#d97706'
  },
  kpiLabelLate: {
    fontSize: 13,
    fontWeight: '700',
    color: '#d97706'
  },
  kpiValuePending: {
    fontSize: 24,
    fontWeight: '800',
    color: '#475569'
  },
  kpiLabelPending: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569'
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#009b5a',
    borderRadius: 4
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: 0.5,
    marginBottom: 12
  },
  moduleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 12,
    ...theme.shadows.card
  },
  moduleIconBoxBlue: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    backgroundColor: '#eff6ff'
  },
  moduleIconBoxGreen: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    backgroundColor: '#eff6ff'
  },
  moduleIconBoxGray: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    backgroundColor: '#f8fafc'
  },
  moduleInfo: {
    flex: 1
  },
  moduleTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 2
  },
  moduleDesc: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4
  },
  qrStatusMini: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  greenMiniDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#009b5a',
    marginRight: 6
  },
  qrStatusMiniText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#009b5a'
  },
  offlineTag: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563eb',
    letterSpacing: 0.2
  },
  chevronCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeBtn: {
    backgroundColor: '#0b1528',
    borderRadius: 12,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
    marginBottom: 8,
    ...theme.shadows.floating
  },
  closeBtnContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  btnIcon: {
    marginRight: 8
  },
  closeBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700'
  },
  closeBtnNote: {
    fontSize: 11,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 16
  },
  resetSimBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    paddingVertical: 12,
    marginBottom: 20
  },
  resetSimBtnText: {
    color: '#475569',
    fontSize: 13,
    fontWeight: '700'
  },
  alertBanner: {
    backgroundColor: '#fef3c7',
    borderWidth: 1,
    borderColor: '#f59e0b',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  alertBannerTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#92400e',
    marginBottom: 2
  },
  alertBannerText: {
    fontSize: 12,
    color: '#78350f',
    lineHeight: 16
  },
  alertBannerBtn: {
    backgroundColor: '#b45309',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8
  },
  alertBannerBtnText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700'
  },
  dashboardModeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 14,
    marginBottom: 14,
    ...theme.shadows.card
  },
  dashboardModeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  dashboardModeTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1e3a8a',
    letterSpacing: 0.5
  },
  dashboardModePill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10
  },
  dashboardModePillText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0f172a'
  },
  modeBadgeGreen: {
    backgroundColor: '#dcfce7',
    borderWidth: 1,
    borderColor: '#86efac'
  },
  modeBadgeAmber: {
    backgroundColor: '#fef3c7',
    borderWidth: 1,
    borderColor: '#fcd34d'
  },
  modeBadgeRed: {
    backgroundColor: '#fee2e2',
    borderWidth: 1,
    borderColor: '#fca5a5'
  },
  dashboardModeButtonsRow: {
    flexDirection: 'row',
    gap: 8,
    width: '100%'
  },
  dashboardModeBtn: {
    flex: 1,
    paddingVertical: 9,
    paddingHorizontal: 4,
    backgroundColor: '#f1f5f9',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#cbd5e1'
  },
  dashboardModeBtnActiveGreen: {
    backgroundColor: '#15803d',
    borderColor: '#15803d'
  },
  dashboardModeBtnActiveAmber: {
    backgroundColor: '#b45309',
    borderColor: '#b45309'
  },
  dashboardModeBtnActiveRed: {
    backgroundColor: '#b91c1c',
    borderColor: '#b91c1c'
  },
  dashboardModeBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
    textAlign: 'center'
  },
  dashboardModeBtnTextActive: {
    color: '#ffffff'
  }
})

export const theme = {
  colors: {
    primary: '#1e3a8a',
    primaryLight: '#2563eb',
    primaryLighter: '#3b82f6',
    primaryGhost: '#eff6ff',
    primaryBorder: '#bfdbfe',
    
    background: '#f8fafc',
    surface: '#ffffff',
    surfaceAlt: '#f1f5f9',
    
    textPrimary: '#0f172a',
    textSecondary: '#64748b',
    textMuted: '#94a3b8',
    textWhite: '#ffffff',
    
    border: '#e2e8f0',
    borderLight: '#f1f5f9',
    borderDark: '#cbd5e1',
    
    success: '#059669',
    successLight: '#10b981',
    successBg: '#ecfdf5',
    successBorder: '#a7f3d0',
    successText: '#065f46',
    
    warning: '#d97706',
    warningBg: '#fffbeb',
    warningBorder: '#fde68a',
    warningText: '#92400e',
    
    danger: '#dc2626',
    dangerBg: '#fef2f2',
    dangerBorder: '#fecaca',
    dangerText: '#991b1b',
    
    scannerOverlay: 'rgba(15, 23, 42, 0.85)',
    modalOverlay: 'rgba(15, 23, 42, 0.65)'
  },
  typography: {
    titleLarge: {
      fontSize: 24,
      fontWeight: '800'
    },
    titleMedium: {
      fontSize: 20,
      fontWeight: '800'
    },
    titleSmall: {
      fontSize: 18,
      fontWeight: '700'
    },
    bodyLarge: {
      fontSize: 16,
      fontWeight: '500'
    },
    bodyRegular: {
      fontSize: 14,
      fontWeight: '400'
    },
    bodySmall: {
      fontSize: 12,
      fontWeight: '400'
    },
    caption: {
      fontSize: 11,
      fontWeight: '600'
    }
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32
  },
  borderRadius: {
    sm: 6,
    md: 10,
    lg: 14,
    xl: 18,
    full: 9999
  },
  shadows: {
    card: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2
    },
    floating: {
      shadowColor: '#1e3a8a',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.2,
      shadowRadius: 14,
      elevation: 6
    }
  }
}

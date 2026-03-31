import { useEditorTheme } from './ThemeContext'

export function useThemeClasses() {
  const { theme } = useEditorTheme()
  
  return {
    primary: theme.primary,
    accent: theme.accent,
    
    primaryBg: {
      backgroundColor: theme.primary
    },
    primaryText: {
      color: theme.primary
    },
    accentBg: {
      backgroundColor: theme.accent
    },
    accentText: {
      color: theme.accent
    },
    
    primaryWithOpacity: (opacity: number) => ({
      backgroundColor: `${theme.primary}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`
    }),
    accentWithOpacity: (opacity: number) => ({
      backgroundColor: `${theme.accent}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`
    }),
  }
}

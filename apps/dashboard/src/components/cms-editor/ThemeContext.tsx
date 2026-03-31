import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { apiFetch } from '@/lib/api'

export interface ThemeColors {
  primary: string
  accent: string
}

export interface EditorThemeContextType {
  theme: ThemeColors
  isLoading: boolean
  error: string | null
  refetch: () => void
}

const defaultTheme: ThemeColors = {
  primary: '#6366f1',
  accent: '#ff6b35'
}

const EditorThemeContext = createContext<EditorThemeContextType>({
  theme: defaultTheme,
  isLoading: false,
  error: null,
  refetch: () => {}
})

export function useEditorTheme() {
  return useContext(EditorThemeContext)
}

interface EditorThemeProviderProps {
  children: ReactNode
  initialTheme?: ThemeColors
}

export function EditorThemeProvider({ children, initialTheme }: EditorThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeColors>(initialTheme || defaultTheme)
  const [isLoading, setIsLoading] = useState(!initialTheme)
  const [error, setError] = useState<string | null>(null)

  const fetchTheme = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await apiFetch('/settings')
      if (res.ok) {
        const data = await res.json()
        setTheme({
          primary: data.primaryColor || defaultTheme.primary,
          accent: data.accentColor || defaultTheme.accent
        })
      }
    } catch (e) {
      setError('Failed to fetch theme settings')
      console.error('Theme fetch error:', e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!initialTheme) {
      fetchTheme()
    }
  }, [])

  return (
    <EditorThemeContext.Provider value={{ theme, isLoading, error, refetch: fetchTheme }}>
      {children}
    </EditorThemeContext.Provider>
  )
}

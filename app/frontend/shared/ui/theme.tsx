import { ReactNode, createContext, useCallback, useContext, useState } from 'react'
import { setCookie } from 'typescript-cookie'

import { ThemeType } from '~/widgets/Layout/helpers'

type Theme = 'dark' | 'light' | 'system'

type ThemeProviderProps = {
  children: ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)
// TODO: move it to theme slice
export function ThemeProvider({
  children,
  defaultTheme,
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  const changeTheme = useCallback(
    (themeToChange: ThemeType) => {
      const root = window.document.documentElement

      root.classList.remove('light', 'dark')

      if (themeToChange === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        setTheme(systemTheme)
        root.classList.add(systemTheme)
        setCookie(storageKey, systemTheme)
        return
      }
      setTheme(themeToChange)
      root.classList.add(themeToChange)
      setCookie(storageKey, themeToChange)
    },
    [storageKey]
  )

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      changeTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider')

  return context
}

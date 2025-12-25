export type ThemeType = 'dark' | 'light' | 'system'

export const getTheme = (): ThemeType => {
  const theme = `${localStorage?.getItem('theme')}` as ThemeType

  const isIncludeTheme = ['light', 'dark'].includes(theme)
  if (isIncludeTheme) return theme

  const userMedia = matchMedia('(prefers-color-scheme: dark)')

  if (userMedia.matches) return 'dark'

  return 'light'
}

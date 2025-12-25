import { STATIC_PATH } from '~/shared/constants/pages'
import { LANG_REGIONS } from '~/shared/constants/regions'

export const getCookies = (cookieStr: string) =>
  cookieStr
    .split(';')
    .map((str) => str.trim().split(/=(.+)/))
    .reduce((acc, curr) => {
      acc[curr[0]] = curr[1]
      return acc
    }, {})

// leave string type because of ts issue: regionsValues.includes(e)
const regionsValues: string[] = LANG_REGIONS.map((e) => e.value)

export const getDefaultLocaleFromUrl = (url: string) => {
  return (
    url
      .split('/')
      .filter((e) => !!e)
      .find((e) => regionsValues.includes(e)) ?? 'en'
  )
}

export const getUpdatedURLWithLocale = (url: string, locale: string, origin: string) => {
  let parsedUrl: URL
  try {
    parsedUrl = new URL(url)
  } catch {
    // TODO: fix that
    parsedUrl = new URL(url, `${origin}/`)
  }
  const pathParts = parsedUrl.pathname.split('/').filter(Boolean)
  if (pathParts.length > 0 && ['en', ...regionsValues].includes(pathParts[0])) {
    pathParts[0] = locale
  } else {
    pathParts.unshift(locale)
  }

  parsedUrl.pathname = '/' + pathParts.join('/')
  return parsedUrl.pathname.toString() + parsedUrl.search + parsedUrl.hash
}

export const defineStaticPage = (pageName: string) => pageName.indexOf(STATIC_PATH) === 0

import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import { getDefaultLocaleFromUrl } from '~/app/helpers'
import en from '~/locales/en.locale.json'
import es from '~/locales/es.locale.json'
import { LANG_REGIONS } from '~/shared/constants/regions'

const regionsValues: string[] = LANG_REGIONS.map((e) => e.value)

export const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
}

const useI18nInit = ({ url }: { url: string }) => {
  const locale = getDefaultLocaleFromUrl(url)
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      supportedLngs: ['en', ...regionsValues],
      detection: {
        order: ['path', 'localStorage', 'htmlTag', 'cookie'],
        caches: ['localStorage', 'cookie'],
      },
      resources,
      fallbackLng: 'en',
      lng: locale,
      interpolation: {
        escapeValue: false,
      },
    })
  return i18n
}

export default useI18nInit

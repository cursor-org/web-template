import { config } from '@fortawesome/fontawesome-svg-core'
import { ReactNode } from 'react'
// TODO: uncomment after GTM and GA are implemented
// import ReactGA from 'react-ga4'
// import TagManager from 'react-gtm-module'
import { I18nextProvider } from 'react-i18next'
// import * as pkg from 'react-microsoft-clarity'
import { Provider } from 'react-redux'

import { store } from '~/app/Redux/store'
import { useOnComponentDidMount } from '~/shared/models/hooks'
import { ThemeProvider } from '~/shared/ui/theme'

import { ThemeType } from '../../widgets/Layout/helpers'
import useI18nInit from '../i18n'

// const { clarity } = pkg

const GlobalProvider = ({
  children,
  url,
  theme,
}: {
  children: ReactNode
  url: string
  theme: ThemeType
}) => {
  useOnComponentDidMount(() => {
    if (import.meta.env.MODE === 'production') {
      // clarity.init(window.gon.clarityProjectId ?? '')
      // TagManager.initialize({ gtmId: window.gon.googleTagManagerContainerId ?? '' })
      // TODO: since we use GTM this should be removed after pageview event transferred
      // ReactGA.initialize(window.gon.googleAnalyticsMeasurementId ?? '')
    }
  })

  const i18n = useI18nInit({ url })
  config.autoAddCss = false

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider defaultTheme={theme} storageKey="ui-theme">
        <Provider store={store} children={children} />
      </ThemeProvider>
    </I18nextProvider>
  )
}

export default GlobalProvider

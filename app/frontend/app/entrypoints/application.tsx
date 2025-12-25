import { createInertiaApp } from '@inertiajs/react'
import { hydrateRoot } from 'react-dom/client'

import GlobalProvider from '~/app/Providers/GlobalProvider.js'
import PageObserver from '~/app/Providers/PageObserverProvider'
import Layout from '~/widgets/Layout/Layout'
import { ThemeType } from '~/widgets/Layout/helpers'

import { defineStaticPage } from '../helpers'
import '../index.scss'

const PATH = '../../pages'
const MODULE_LOAD_ERROR = 'Failed to fetch dynamically imported module'

createInertiaApp({
  title: (title) => title,
  resolve: (name) => {
    const pages = import.meta.glob(`../../pages/**/*.tsx`, { eager: false })

    return pages[`${PATH}/${name}.tsx`]().catch((e) => {
      const error = new Error(e)
      if (error.message.includes(MODULE_LOAD_ERROR)) {
        window.location.reload()
      }
    })
  },
  setup({ el, App, props: setupProps }) {
    // TODO: declare custom module with all types "declare module '@inertiajs/core'"
    const theme = setupProps.initialPage.props?.['ui-theme'] as ThemeType
    hydrateRoot(
      el,
      <GlobalProvider url={setupProps.initialPage.url} theme={theme}>
        <App
          {...setupProps}
          // refactor this peace of shit
          children={(root) => {
            const { key, Component, props } = root
            const isStaticPage = defineStaticPage(setupProps.initialPage.component)
            if (isStaticPage) return <Component {...props} key={key} />
            return (
              <PageObserver>
                <Layout>
                  <Component {...props} key={key} />
                </Layout>
              </PageObserver>
            )
          }}
        />
      </GlobalProvider>
    )
  },
})

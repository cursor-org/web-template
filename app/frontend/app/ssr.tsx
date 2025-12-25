import { createInertiaApp } from '@inertiajs/react'
import cjsCreateServer from '@inertiajs/server'
import ReactDOMServer from 'react-dom/server'

import GlobalProvider from '~/app/Providers/GlobalProvider'
import PageObserver from '~/app/Providers/PageObserverProvider'
import Layout from '~/widgets/Layout/Layout'
import { ThemeType } from '~/widgets/Layout/helpers'

import { defineStaticPage } from './helpers'

// TODO: remove ts-ignore, find out why the doc incompatible with the real state
const createServer =
  // @ts-expect-error @ts-ignore
  typeof cjsCreateServer === 'function' ? cjsCreateServer : cjsCreateServer.default
createServer((page) => {
  return createInertiaApp({
    title: (title) => title,
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = import.meta.glob('../pages/**/*.tsx', { eager: false })
      return pages[`../pages/${name}.tsx`]()
    },
    setup: ({ App, props: setupProps }) => {
      const theme = setupProps.initialPage.props?.['ui-theme'] as ThemeType
      return (
        // TODO: declare custom module with all types "declare module '@inertiajs/core'"
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
})

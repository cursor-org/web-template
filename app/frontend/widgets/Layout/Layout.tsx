import { Head } from '@inertiajs/react'
import { ReactNode } from 'react'

import '~/app/applications.css'
import { useMeta } from '~/shared/models/hooks'
import { Toaster } from '~/shared/ui/sonner'

import { Header } from '../App/Header'

const Layout = ({ children }: { children: ReactNode }) => {
  const { title, description, keywords, canonical, robots, error } = useMeta()

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{title}</title>

        {/* CLEANER IMPLEMENTATIONS DON'T WORK WITH SSR */}
        {error || <meta name="keywords" content={keywords} />}
        {error || <meta name="description" content={description} />}
        {error || <meta property="og:site_name" content="Botable" />}
        {error || <meta property="og:type" content="website" />}
        {error || <meta property="og:url" content={canonical} />}
        {/* TODO: add og:image */}
        {error || <meta property="og:image" content="/favicon.ico" />}
        {error || <meta property="og:image:width" content="256" />}
        {error || <meta property="og:image:height" content="256" />}
        {error || (robots && <meta name="robots" content={robots} />)}
        {error || <link rel="canonical" href={canonical} />}
        {/* CLEANER IMPLEMENTATIONS DON'T WORK WITH SSR */}
      </Head>
      <Header />
      <main className="h-full flex-col flex flex-1 scroll-smooth">{children}</main>
      <Toaster className="bg-red-500" />
    </div>
  )
}

export default Layout

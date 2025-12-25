import { usePage } from '@inertiajs/react'
import { useMemo } from 'react'

import { MetaTags } from '~/shared/types/props'

export const useMeta = () => {
  const { props } = usePage<{ meta: MetaTags }>()

  const title = useMemo(() => (props?.meta.title ? props?.meta.title : ''), [props?.meta.title])
  const keywords = useMemo(() => props?.meta?.keywords?.join(',') ?? '', [props?.meta?.keywords])
  const description = useMemo(() => props?.meta?.description ?? '', [props?.meta?.description])
  const canonical = useMemo(() => props?.meta?.canonical ?? '', [props?.meta?.canonical])
  const robots = useMemo(() => props?.meta?.robots ?? '', [props?.meta?.robots])
  const error = useMemo(() => props?.meta?.error ?? false, [props?.meta?.error])

  return {
    title,
    keywords,
    description,
    canonical,
    robots,
    error,
  }
}

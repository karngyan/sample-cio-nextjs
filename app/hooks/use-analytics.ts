'use client'

import { AnalyticsBrowser } from '@customerio/cdp-analytics-browser'
import { useEffect, useState } from 'react'

export const useAnalyticsBrowser = () => {
  const [cio, setCio] = useState<AnalyticsBrowser | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadCio = async () => {
      try {
        const mod = await import('@customerio/cdp-analytics-browser')
        const cdp = mod.AnalyticsBrowser
        const cioInstance = cdp.load({
          writeKey: 'sample-write-key',
          // integrations: {
          //   'Customer.io In-App Plugin': {
          //     siteId: 'sample-site-id',
          //   },
          // },
        })

        if (isMounted) {
          setCio(cioInstance)
        }
      } catch (error) {
        console.error('Error loading Customer.io AnalyticsBrowser', error)
      }
    }

    loadCio()

    return () => {
      isMounted = false
    }
  }, [])

  return { cio }
}

'use client'

import {
  AnalyticsBrowser,
  InitOptions,
} from '@customerio/cdp-analytics-browser'
import { createContext, useContext, useMemo } from 'react'

const AnalyticsContext = createContext<AnalyticsBrowser | null>(null)

type AnalyticsProvidersProps = {
  writeKey: string
  enableInAppPlugin?: boolean
  siteId?: string
}

export const AnalyticsProvider = ({
  writeKey,
  enableInAppPlugin,
  siteId,
  children,
}: React.PropsWithChildren<AnalyticsProvidersProps>) => {
  const analytics = useMemo(() => {
    const options: InitOptions | undefined = enableInAppPlugin
      ? {
          integrations: {
            'Customer.io In-App Plugin': { siteId: siteId ?? '' },
          },
        }
      : undefined

    return AnalyticsBrowser.load({ writeKey }, options)
  }, [writeKey, enableInAppPlugin, siteId])

  return (
    <AnalyticsContext.Provider value={analytics}>
      {children}
    </AnalyticsContext.Provider>
  )
}

export const useAnalytics = () => {
  const result = useContext(AnalyticsContext)
  if (!result) {
    throw new Error('useAnalytics must be used within a AnalyticsProvider')
  }

  return result
}

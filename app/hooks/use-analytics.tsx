'use client'

import {
  AnalyticsBrowser,
  InitOptions,
} from '@customerio/cdp-analytics-browser'
import { createContext, useContext, useMemo } from 'react'

const AnalyticsContext = createContext<AnalyticsBrowser | null>(null)

type AnalyticsProvidersProps = {
  writeKey: string
  options?: InitOptions
}

export const AnalyticsProvider = ({
  writeKey,
  options,
  children,
}: React.PropsWithChildren<AnalyticsProvidersProps>) => {
  const analytics = useMemo(() => {
    return AnalyticsBrowser.load({ writeKey }, options)
  }, [writeKey, options])

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

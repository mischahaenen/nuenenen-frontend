export interface AnalyticsEvent {
  action: string
  category: string
  label?: string
  value?: number
  custom_parameters?: Record<string, any>
}

export interface PageViewData {
  page_title: string
  page_location: string
  page_referrer?: string
  content_group1?: string
  content_group2?: string
  custom_map?: Record<string, any>
}

export function useEnhancedAnalytics() {
  const { gtag } = useGtag()
  const route = useRoute()
  const { $device } = useNuxtApp()

  // Enhanced page view tracking
  const trackPageView = (customData?: Partial<PageViewData>) => {
    const defaultData: PageViewData = {
      page_title: document.title,
      page_location: window.location.href,
      page_referrer: document.referrer,
      content_group1: route.name?.toString() || 'unknown',
      content_group2: route.params.slug
        ? Array.isArray(route.params.slug)
          ? route.params.slug.join('/')
          : route.params.slug
        : 'home',
      custom_map: {
        user_agent: navigator.userAgent,
        screen_resolution: `${screen.width}x${screen.height}`,
        viewport_size: `${window.innerWidth}x${window.innerHeight}`,
        device_type: $device?.isMobile
          ? 'mobile'
          : $device?.isTablet
          ? 'tablet'
          : 'desktop',
        color_scheme: window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light',
        connection_type:
          (navigator as any).connection?.effectiveType || 'unknown',
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        timestamp: new Date().toISOString(),
      },
    }

    gtag('config', 'GA_MEASUREMENT_ID', {
      ...defaultData,
      ...customData,
    })

    gtag('event', 'page_view', {
      ...defaultData,
      ...customData,
    })
  }

  const trackEvent = (eventData: AnalyticsEvent) => {
    const enhancedData = {
      event_category: eventData.category,
      event_label: eventData.label,
      value: eventData.value,
      page_path: route.path,
      page_title: document.title,
      timestamp: new Date().toISOString(),
      session_id:
        sessionStorage.getItem('analytics_session_id') || generateSessionId(),
      user_engagement: 'true',
      ...eventData.custom_parameters,
    }

    gtag('event', eventData.action, enhancedData)
  }

  // User interaction tracking
  const trackInteraction = (
    element: string,
    action: string,
    additionalData?: Record<string, any>
  ) => {
    trackEvent({
      action: `${action}_${element}`,
      category: 'user_interaction',
      label: element,
      custom_parameters: {
        interaction_type: action,
        element_type: element,
        page_section: route.hash || 'main',
        ...additionalData,
      },
    })
  }

  // Form tracking
  const trackFormEvent = (
    formName: string,
    action: 'start' | 'submit' | 'error' | 'abandon',
    additionalData?: Record<string, any>
  ) => {
    trackEvent({
      action: `form_${action}`,
      category: 'form_interaction',
      label: formName,
      custom_parameters: {
        form_name: formName,
        form_action: action,
        ...additionalData,
      },
    })
  }

  // Content engagement tracking
  const trackContentEngagement = (
    contentType: string,
    contentId: string,
    action: string,
    value?: number
  ) => {
    trackEvent({
      action: `content_${action}`,
      category: 'content_engagement',
      label: `${contentType}_${contentId}`,
      value,
      custom_parameters: {
        content_type: contentType,
        content_id: contentId,
        engagement_type: action,
      },
    })
  }

  // Download tracking
  const trackDownload = (
    fileName: string,
    fileType: string,
    downloadUrl: string
  ) => {
    trackEvent({
      action: 'file_download',
      category: 'downloads',
      label: fileName,
      custom_parameters: {
        file_name: fileName,
        file_type: fileType,
        download_url: downloadUrl,
        file_size: 'unknown', // Could be enhanced to get actual file size
      },
    })
  }

  // External link tracking
  const trackExternalLink = (url: string, linkText?: string) => {
    trackEvent({
      action: 'external_link_click',
      category: 'outbound_links',
      label: url,
      custom_parameters: {
        link_url: url,
        link_text: linkText,
        link_domain: new URL(url).hostname,
      },
    })
  }

  // Search tracking
  const trackSearch = (
    searchTerm: string,
    resultsCount?: number,
    searchType?: string
  ) => {
    trackEvent({
      action: 'search',
      category: 'site_search',
      label: searchTerm,
      value: resultsCount,
      custom_parameters: {
        search_term: searchTerm,
        search_results_count: resultsCount,
        search_type: searchType || 'general',
      },
    })
  }

  // Error tracking
  const trackError = (
    errorType: string,
    errorMessage: string,
    errorContext?: Record<string, any>
  ) => {
    trackEvent({
      action: 'error_occurred',
      category: 'errors',
      label: errorType,
      custom_parameters: {
        error_type: errorType,
        error_message: errorMessage,
        error_context: JSON.stringify(errorContext),
        stack_trace: new Error().stack,
      },
    })
  }

  // Performance tracking
  const trackPerformance = (metricName: string, value: number, unit = 'ms') => {
    trackEvent({
      action: 'performance_metric',
      category: 'performance',
      label: metricName,
      value: Math.round(value),
      custom_parameters: {
        metric_name: metricName,
        metric_unit: unit,
        performance_timing: JSON.stringify(window.performance.timing),
      },
    })
  }

  // Custom dimensions and metrics
  const setCustomDimension = (index: number, value: string) => {
    gtag('config', 'GA_MEASUREMENT_ID', {
      [`custom_map.dimension${index}`]: value,
    })
  }

  const setCustomMetric = (index: number, value: number) => {
    gtag('event', 'custom_metric', {
      [`metric${index}`]: value,
    })
  }

  // Session management
  const generateSessionId = () => {
    const sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    sessionStorage.setItem('analytics_session_id', sessionId)
    return sessionId
  }

  // User properties
  const setUserProperty = (propertyName: string, value: string) => {
    gtag('set', 'user_properties', {
      [propertyName]: value,
    })
  }

  // Scroll depth tracking
  const trackScrollDepth = (percentage: number) => {
    trackEvent({
      action: 'scroll_depth',
      category: 'engagement',
      label: `${percentage}%`,
      value: percentage,
      custom_parameters: {
        scroll_percentage: percentage,
        page_height: document.body.scrollHeight,
        viewport_height: window.innerHeight,
      },
    })
  }

  // Time on page tracking
  const trackTimeOnPage = (timeInSeconds: number) => {
    trackEvent({
      action: 'time_on_page',
      category: 'engagement',
      value: timeInSeconds,
      custom_parameters: {
        time_seconds: timeInSeconds,
        time_minutes: Math.round((timeInSeconds / 60) * 100) / 100,
      },
    })
  }

  return {
    trackPageView,
    trackEvent,
    trackInteraction,
    trackFormEvent,
    trackContentEngagement,
    trackDownload,
    trackExternalLink,
    trackSearch,
    trackError,
    trackPerformance,
    trackScrollDepth,
    trackTimeOnPage,
    setCustomDimension,
    setCustomMetric,
    setUserProperty,
    generateSessionId,
  }
}

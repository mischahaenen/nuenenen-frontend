export default defineNuxtPlugin(() => {
  const { 
    trackPageView, 
    trackInteraction, 
    trackDownload, 
    trackExternalLink, 
    trackScrollDepth, 
    trackTimeOnPage,
    trackError,
    trackPerformance,
    generateSessionId 
  } = useEnhancedAnalytics()

  // Initialize session
  generateSessionId()

  // Auto-track page views on route change
  const router = useRouter()
  router.afterEach((to) => {
    nextTick(() => {
      trackPageView({
        page_title: document.title,
        page_location: window.location.href,
        content_group1: to.name?.toString() || 'unknown',
        content_group2: to.params.slug ? Array.isArray(to.params.slug) ? to.params.slug.join('/') : to.params.slug : 'home'
      })
    })
  })

  // Track page load performance
  window.addEventListener('load', () => {
    // Track various performance metrics
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    
    if (navigation) {
      trackPerformance('page_load_time', navigation.loadEventEnd - navigation.fetchStart)
      trackPerformance('dom_content_loaded', navigation.domContentLoadedEventEnd - navigation.fetchStart)
      trackPerformance('first_byte', navigation.responseStart - navigation.fetchStart)
    }

    // Track Largest Contentful Paint
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          trackPerformance('largest_contentful_paint', lastEntry.startTime)
        })
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

        // Track First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry) => {
            trackPerformance('first_input_delay', entry.processingStart - entry.startTime)
          })
        })
        fidObserver.observe({ entryTypes: ['first-input'] })

        // Track Cumulative Layout Shift
        let clsValue = 0
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries() as PerformanceEntry[]
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value
            }
          })
          trackPerformance('cumulative_layout_shift', clsValue * 1000) // Convert to milliseconds for consistency
        })
        clsObserver.observe({ entryTypes: ['layout-shift'] })
      } catch (e) {
        console.warn('Performance Observer not fully supported')
      }
    }
  })

  // Auto-track clicks on buttons and links
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement
    
    // Track button clicks
    if (target.matches('button, .btn') || target.closest('button, .btn')) {
      const button = target.matches('button, .btn') ? target : target.closest('button, .btn')!
      const buttonText = button.textContent?.trim() || 'unknown'
      const buttonClass = button.className
      
      trackInteraction('button', 'click', {
        button_text: buttonText,
        button_class: buttonClass,
        button_id: button.id || 'no_id'
      })
    }

    // Track external links
    if (target.matches('a[href]') || target.closest('a[href]')) {
      const link = (target.matches('a[href]') ? target : target.closest('a[href]')) as HTMLAnchorElement
      const href = link.href
      const linkText = link.textContent?.trim() || 'unknown'
      
      // Check if it's an external link
      if (href && !href.startsWith(window.location.origin) && !href.startsWith('/') && !href.startsWith('#')) {
        trackExternalLink(href, linkText)
      }
      
      // Check if it's a download link
      const downloadAttribute = link.getAttribute('download')
      const isDownloadLink = downloadAttribute !== null || 
        /\.(pdf|doc|docx|xls|xlsx|ppt|pptx|zip|rar|mp3|mp4|avi|mov|jpg|jpeg|png|gif|svg)$/i.test(href)
      
      if (isDownloadLink) {
        const fileName = downloadAttribute || href.split('/').pop() || 'unknown'
        const fileType = fileName.split('.').pop() || 'unknown'
        trackDownload(fileName, fileType, href)
      }
    }
  })

  // Track scroll depth
  let maxScrollDepth = 0
  let scrollDepthTracked = [25, 50, 75, 90, 100]
  let trackedDepths: number[] = []

  const trackScroll = () => {
    const scrollTop = window.pageYOffset
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = Math.round((scrollTop / documentHeight) * 100)
    
    if (scrollPercent > maxScrollDepth) {
      maxScrollDepth = scrollPercent
      
      // Track specific milestones
      scrollDepthTracked.forEach(milestone => {
        if (scrollPercent >= milestone && !trackedDepths.includes(milestone)) {
          trackedDepths.push(milestone)
          trackScrollDepth(milestone)
        }
      })
    }
  }

  let scrollTimeout: NodeJS.Timeout
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(trackScroll, 100)
  })

  // Track time on page
  let pageStartTime = Date.now()
  let lastActiveTime = Date.now()
  let timeOnPageTracked = false

  // Update last active time on user interaction
  const updateActiveTime = () => {
    lastActiveTime = Date.now()
  }

  document.addEventListener('mousemove', updateActiveTime)
  document.addEventListener('scroll', updateActiveTime)
  document.addEventListener('keypress', updateActiveTime)
  document.addEventListener('click', updateActiveTime)

  // Track time on page when user leaves
  const trackTimeBeforeLeave = () => {
    if (!timeOnPageTracked) {
      const timeOnPage = Math.round((lastActiveTime - pageStartTime) / 1000)
      if (timeOnPage > 5) { // Only track if user spent more than 5 seconds
        trackTimeOnPage(timeOnPage)
        timeOnPageTracked = true
      }
    }
  }

  window.addEventListener('beforeunload', trackTimeBeforeLeave)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      trackTimeBeforeLeave()
    } else {
      // Reset timer when page becomes visible again
      pageStartTime = Date.now()
      lastActiveTime = Date.now()
      timeOnPageTracked = false
    }
  })

  // Track JavaScript errors
  window.addEventListener('error', (event) => {
    trackError('javascript_error', event.message, {
      filename: event.filename,
      line_number: event.lineno,
      column_number: event.colno
    })
  })

  // Track unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    trackError('unhandled_promise_rejection', event.reason?.toString() || 'Unknown promise rejection', {
      promise: event.promise
    })
  })

  // Track form interactions
  document.addEventListener('focusin', (event) => {
    const target = event.target as HTMLElement
    if (target.matches('input, textarea, select')) {
      const form = target.closest('form')
      const formName = form?.getAttribute('name') || form?.className || 'unknown_form'
      
      // Track form start (only once per form per session)
      const formStartKey = `form_start_${formName}`
      if (!sessionStorage.getItem(formStartKey)) {
        sessionStorage.setItem(formStartKey, 'true')
        const { trackFormEvent } = useEnhancedAnalytics()
        trackFormEvent(formName, 'start')
      }
    }
  })

  // Track form submissions
  document.addEventListener('submit', (event) => {
    const form = event.target as HTMLFormElement
    const formName = form.getAttribute('name') || form.className || 'unknown_form'
    const { trackFormEvent } = useEnhancedAnalytics()
    trackFormEvent(formName, 'submit')
  })
})
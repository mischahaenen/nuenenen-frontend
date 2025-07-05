// Examples of how to use the enhanced analytics in your components

import { useEnhancedAnalytics } from '../useEnhancedAnalytics'

// Example 1: Track content engagement in a blog component
export const useBlogAnalytics = () => {
  const { trackContentEngagement, trackInteraction } = useEnhancedAnalytics()

  const trackBlogView = (blogTitle: string, blogId: string) => {
    trackContentEngagement('blog_post', blogId, 'view')
  }

  const trackBlogShare = (blogTitle: string, blogId: string, shareMethod: string) => {
    trackInteraction('share_button', 'click', {
      content_type: 'blog_post',
      content_id: blogId,
      content_title: blogTitle,
      share_method: shareMethod
    })
  }

  const trackBlogReadTime = (blogId: string, timeInSeconds: number) => {
    trackContentEngagement('blog_post', blogId, 'read_time', timeInSeconds)
  }

  return {
    trackBlogView,
    trackBlogShare,
    trackBlogReadTime
  }
}

// Example 2: Track slider/gallery interactions
export const useSliderAnalytics = () => {
  const { trackInteraction, trackContentEngagement } = useEnhancedAnalytics()

  const trackSlideChange = (currentSlide: number, totalSlides: number, method: 'click' | 'auto' | 'keyboard') => {
    trackInteraction('slider', 'navigate', {
      slide_number: currentSlide,
      total_slides: totalSlides,
      navigation_method: method,
      slide_percentage: Math.round((currentSlide / totalSlides) * 100)
    })
  }

  const trackSliderFullscreen = (imageId: string) => {
    trackContentEngagement('image', imageId, 'fullscreen_view')
  }

  const trackSliderAutoplay = (action: 'start' | 'stop' | 'pause') => {
    trackInteraction('slider_autoplay', action)
  }

  return {
    trackSlideChange,
    trackSliderFullscreen,
    trackSliderAutoplay
  }
}

// Example 3: Track navigation and menu usage
export const useNavigationAnalytics = () => {
  const { trackInteraction, trackEvent } = useEnhancedAnalytics()

  const trackMenuOpen = (menuType: 'main' | 'mobile' | 'dropdown') => {
    trackInteraction('menu', 'open', {
      menu_type: menuType
    })
  }

  const trackMenuItemClick = (itemLabel: string, itemLevel: number, destination: string) => {
    trackInteraction('menu_item', 'click', {
      menu_item_label: itemLabel,
      menu_level: itemLevel,
      destination_url: destination
    })
  }

  const trackBreadcrumbClick = (breadcrumbLabel: string, position: number) => {
    trackInteraction('breadcrumb', 'click', {
      breadcrumb_label: breadcrumbLabel,
      breadcrumb_position: position
    })
  }

  return {
    trackMenuOpen,
    trackMenuItemClick,
    trackBreadcrumbClick
  }
}

// Example 4: Track search functionality
export const useSearchAnalytics = () => {
  const { trackSearch, trackInteraction } = useEnhancedAnalytics()

  const trackSearchQuery = (query: string, resultsCount: number, searchType: string = 'general') => {
    trackSearch(query, resultsCount, searchType)
  }

  const trackSearchResultClick = (query: string, resultTitle: string, resultPosition: number, resultUrl: string) => {
    trackInteraction('search_result', 'click', {
      search_query: query,
      result_title: resultTitle,
      result_position: resultPosition,
      result_url: resultUrl
    })
  }

  const trackSearchFilterUse = (filterType: string, filterValue: string) => {
    trackInteraction('search_filter', 'apply', {
      filter_type: filterType,
      filter_value: filterValue
    })
  }

  return {
    trackSearchQuery,
    trackSearchResultClick,
    trackSearchFilterUse
  }
}

// Example 5: Track video/media interactions
export const useMediaAnalytics = () => {
  const { trackContentEngagement, trackEvent } = useEnhancedAnalytics()

  const trackVideoPlay = (videoId: string, videoTitle: string) => {
    trackContentEngagement('video', videoId, 'play')
  }

  const trackVideoPause = (videoId: string, currentTime: number, duration: number) => {
    const watchPercentage = Math.round((currentTime / duration) * 100)
    trackContentEngagement('video', videoId, 'pause', watchPercentage)
  }

  const trackVideoComplete = (videoId: string, duration: number) => {
    trackContentEngagement('video', videoId, 'complete', Math.round(duration))
  }

  return {
    trackVideoPlay,
    trackVideoPause,
    trackVideoComplete
  }
}

// Example usage in a Vue component:
/*
<script setup>
import { useBlogAnalytics } from '~/composables/examples/analytics-usage-examples'

const { trackBlogView, trackBlogShare } = useBlogAnalytics()

const blogPost = {
  id: 'blog-123',
  title: 'My Blog Post'
}

// Track when blog post is viewed
onMounted(() => {
  trackBlogView(blogPost.title, blogPost.id)
})

// Track when share button is clicked
const handleShare = (method: string) => {
  trackBlogShare(blogPost.title, blogPost.id, method)
  // ... actual sharing logic
}
</script>

<template>
  <div>
    <h1>{{ blogPost.title }}</h1>
    <button @click="handleShare('facebook')">Share on Facebook</button>
    <button @click="handleShare('twitter')">Share on Twitter</button>
  </div>
</template>
*/
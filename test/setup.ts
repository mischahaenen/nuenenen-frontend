import { config } from '@vue/test-utils'
import { vi } from 'vitest'
import { computed, ref } from 'vue'

// Mock Nuxt composables
const mockNuxtComposables = {
  useAsyncData: vi.fn((key, fn, opts) => {
    // Return immediate resolved promise for testing
    const mockData = null
    const result = {
      data: { value: mockData },
      error: { value: null },
      pending: { value: false },
      refresh: vi.fn()
    }
    
    // Apply transform if provided
    if (opts?.transform && mockData) {
      result.data.value = opts.transform({ data: mockData })
    } else if (opts?.transform) {
      result.data.value = opts.transform(null)
    }
    
    return Promise.resolve(result)
  }),
  useRuntimeConfig: vi.fn(() => ({
    public: {
      strapi: {
        url: 'http://localhost:1337'
      }
    }
  })),
  useHead: vi.fn(),
  useSeoMeta: vi.fn(),
  useRoute: vi.fn(() => ({
    params: {},
    query: {},
    path: '/',
    fullPath: '/',
    meta: {}
  })),
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn()
  })),
  navigateTo: vi.fn(),
  useState: vi.fn(),
  computed,
  ref,
  reactive: vi.fn(),
  nextTick: vi.fn(),
  onMounted: vi.fn(),
  onUnmounted: vi.fn(),
  watch: vi.fn(),
  watchEffect: vi.fn(),
  createError: vi.fn(),
  showError: vi.fn(),
  clearError: vi.fn(),
  isNuxtError: vi.fn(),
  useNuxtApp: vi.fn(() => ({
    $router: {
      push: vi.fn(),
      replace: vi.fn()
    }
  })),
  useRequestHeaders: vi.fn(() => ({})),
  useCookie: vi.fn(),
  useLocalStorage: vi.fn(),
  useSessionStorage: vi.fn(),
  useNuxtData: vi.fn(),
  refreshCookie: vi.fn(),
  callOnce: vi.fn(),
  useImage: vi.fn(),
  $img: vi.fn(),
  resolveComponent: vi.fn((name) => {
    // Return a simple component for any resolved component
    return {
      name,
      template: `<div class="${name.toLowerCase().replace('icon', 'icon-')}"></div>`
    }
  }),
  toRefs: vi.fn((props) => {
    const refs = {}
    for (const key in props) {
      refs[key] = { value: props[key] }
    }
    return refs
  }),
  useStepsApi: vi.fn(),
  useBlogApi: vi.fn(),
  useReadingTime: vi.fn(() => ({
    calculateBlocksReadingTime: vi.fn(() => 5)
  })),
  useContactForm: vi.fn(),
  useColorMode: vi.fn(() => ({ value: 'light' })),
  useScrollY: vi.fn(() => ({ value: 0 }))
}

// Mock Nuxt Image component
const NuxtImg = {
  template: '<img :src="src" :alt="alt" />',
  props: ['src', 'alt', 'format', 'provider', 'sizes', 'modifiers']
}

// Mock Nuxt Link component
const NuxtLink = {
  template: '<a :href="to"><slot /></a>',
  props: ['to']
}

// Global mocks
Object.assign(global, mockNuxtComposables)

// Configure Vue Test Utils
config.global.mocks = {
  ...mockNuxtComposables
}

config.global.stubs = {
  NuxtImg,
  NuxtLink,
  'nuxt-img': NuxtImg,
  'nuxt-link': NuxtLink,
  ReadingTime: true,
  RichTextComponent: true,
  TitleComponent: true,
  SliderComponent: true,
  ClientOnly: {
    template: '<div class="client-only"><slot /></div>'
  }
}

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))
import { mount, type VueWrapper } from '@vue/test-utils'
import type { Component } from 'vue'
import { vi } from 'vitest'

interface TestWrapperOptions {
  props?: Record<string, any>
  slots?: Record<string, any>
  global?: {
    mocks?: Record<string, any>
    stubs?: Record<string, any>
    provide?: Record<string, any>
  }
}

export function createTestWrapper(component: Component, options: TestWrapperOptions = {}) {
  const defaultMocks = {
    useAsyncData: vi.fn().mockResolvedValue({
      data: { value: null },
      error: { value: null },
      pending: { value: false },
      refresh: vi.fn()
    }),
    useRuntimeConfig: vi.fn(() => ({
      public: {
        strapi: {
          url: 'http://localhost:1337'
        }
      }
    })),
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
    computed: vi.fn((fn) => ({ value: fn() })),
    ref: vi.fn((val) => ({ value: val })),
    toRefs: vi.fn((props: any) => {
      const refs: Record<string, any> = {}
      for (const key in props) {
        refs[key] = { value: props[key] }
      }
      return refs
    }),
    useStepsApi: vi.fn(),
    useBlogApi: vi.fn(),
    useReadingTime: vi.fn(),
    useContactForm: vi.fn()
  }

  const wrapper = mount(component, {
    props: options.props,
    slots: options.slots,
    global: {
      mocks: {
        ...defaultMocks,
        ...options.global?.mocks
      },
      stubs: {
        NuxtImg: true,
        NuxtLink: true,
        TitleComponent: true,
        RichTextComponent: true,
        ReadingTime: true,
        SliderComponent: true,
        ...options.global?.stubs
      },
      provide: options.global?.provide
    }
  })

  return wrapper
}

export function createMockStepData() {
  return {
    id: 1,
    Name: 'Test Step',
    Description: 'Test description',
    Slug: 'test-step',
    logo: {
      hash: 'test-hash',
      ext: '.webp',
      name: 'Test Logo'
    }
  }
}

export function createMockStepZone() {
  return {
    Title: 'Test Zone',
    Description: 'Test zone description',
    steps: [
      { id: 1 },
      { id: 2 }
    ]
  }
}

export function createMockApiResponse<T>(data: T) {
  return {
    data,
    error: null,
    pending: false,
    refresh: vi.fn()
  }
}

export async function waitForAsyncData(wrapper: VueWrapper<any>) {
  await wrapper.vm.$nextTick()
  await new Promise(resolve => setTimeout(resolve, 0))
}
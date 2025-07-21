import { mount } from '@vue/test-utils'
import { Suspense, defineComponent, h } from 'vue'
import { vi } from 'vitest'
import type { Component } from 'vue'

export function createAsyncWrapper(component: Component, options: any = {}) {
  // Create a wrapper component that includes Suspense
  const AsyncTestWrapper = defineComponent({
    setup() {
      return () => h(Suspense, {}, {
        default: () => h(component, options.props || {}),
        fallback: () => h('div', { class: 'loading' }, 'Loading...')
      })
    }
  })

  return mount(AsyncTestWrapper, {
    global: {
      mocks: {
        useAsyncData: vi.fn().mockImplementation((key, fn, opts) => {
          // Return resolved async data immediately for testing
          const result = {
            data: { value: options.asyncData?.data || null },
            error: { value: options.asyncData?.error || null },
            pending: { value: false },
            refresh: vi.fn()
          }
          
          // Apply transform if provided
          if (opts?.transform && result.data.value) {
            result.data.value = opts.transform({ data: result.data.value })
          }
          
          return Promise.resolve(result)
        }),
        useRoute: vi.fn(() => options.route || {
          params: {},
          query: {},
          path: '/',
          fullPath: '/',
          meta: {}
        }),
        useBlogApi: vi.fn(() => ({
          getBlogPost: vi.fn().mockResolvedValue({
            data: options.asyncData?.data || []
          })
        })),
        useStepsApi: vi.fn(() => ({
          getSteps: vi.fn().mockResolvedValue({
            data: options.asyncData?.data || []
          })
        })),
        useHead: vi.fn(),
        computed: vi.fn((fn) => ({ value: fn() })),
        toRefs: vi.fn((props) => {
          const refs = {}
          for (const key in props) {
            refs[key] = { value: props[key] }
          }
          return refs
        }),
        useReadingTime: vi.fn(() => ({
          calculateBlocksReadingTime: vi.fn(() => 5)
        })),
        useColorMode: vi.fn(() => ({ value: 'light' })),
        useScrollY: vi.fn(() => ({ value: 0 }))
      },
      stubs: {
        SliderComponent: {
          template: '<div class="slider-component" :images="images"></div>',
          props: ['images']
        },
        RichTextComponent: {
          template: '<div class="rich-text-component" :content="content"></div>',
          props: ['content']
        },
        TitleComponent: {
          template: '<div class="title-component" :title="title" :index="index"></div>',
          props: ['title', 'index']
        },
        NuxtLink: {
          template: '<a :href="to" class="nuxt-link"><slot /></a>',
          props: ['to']
        },
        NuxtImg: {
          template: '<img :src="src" :alt="alt" class="nuxt-img" />',
          props: ['src', 'alt', 'format', 'provider', 'sizes', 'loading', 'fetchpriority', 'quality', 'width', 'height', 'modifiers']
        },
        ReadingTime: {
          template: '<span class="reading-time">{{ time }} {{ unit }}</span>',
          props: ['time', 'unit']
        },
        ClientOnly: {
          template: '<div class="client-only"><slot /></div>'
        },
        ...options.global?.stubs
      },
      ...options.global
    }
  })
}

export async function waitForAsyncComponent(wrapper: any) {
  // Wait for Suspense to resolve
  await new Promise(resolve => setTimeout(resolve, 0))
  await wrapper.vm.$nextTick()
  
  // Wait a bit more for async data to settle
  await new Promise(resolve => setTimeout(resolve, 10))
}
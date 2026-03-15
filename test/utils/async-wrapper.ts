import { mount, flushPromises } from '@vue/test-utils'
import { defineComponent, ref } from 'vue'
import { vi } from 'vitest'
import type { Component } from 'vue'

export async function createAsyncWrapper(component: Component, options: any = {}) {
  // Override useAsyncData globally so <script setup> code picks it up
  ;(globalThis as any).useAsyncData = vi.fn().mockImplementation((_key: string, _fn: any, opts: any) => {
    const rawData = options.asyncData?.data ?? null
    let data = rawData
    if (opts?.transform && rawData !== null) {
      data = opts.transform({ data: rawData })
    }
    return Promise.resolve({
      data: ref(data),
      error: ref(options.asyncData?.error ?? null),
      pending: ref(false),
      refresh: vi.fn()
    })
  })

  // Override useRoute globally
  if (options.route) {
    ;(globalThis as any).useRoute = vi.fn(() => options.route)
  }

  const Wrapper = defineComponent({
    components: { AsyncComponent: component },
    template: '<Suspense><AsyncComponent v-bind="componentProps" /></Suspense>',
    setup() {
      return { componentProps: options.props || {} }
    }
  })

  const wrapper = mount(Wrapper, {
    global: {
      stubs: {
        SliderComponent: {
          name: 'SliderComponent',
          template: '<div class="slider-component"></div>',
          props: ['images']
        },
        RichTextComponent: {
          name: 'RichTextComponent',
          template: '<div class="rich-text-component"></div>',
          props: ['content']
        },
        TitleComponent: {
          name: 'TitleComponent',
          template: '<div class="title-component"></div>',
          props: ['title', 'index']
        },
        NuxtLink: {
          name: 'NuxtLink',
          template: '<a :href="to" class="nuxt-link"><slot /></a>',
          props: ['to']
        },
        NuxtImg: {
          name: 'NuxtImg',
          template: '<img :src="src" :alt="alt" class="nuxt-img" />',
          props: ['src', 'alt', 'format', 'provider', 'sizes', 'loading', 'fetchpriority', 'quality', 'width', 'height', 'modifiers']
        },
        ReadingTime: {
          name: 'ReadingTime',
          template: '<span class="reading-time"></span>',
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

  await flushPromises()
  return wrapper
}

export async function waitForAsyncComponent(wrapper: any) {
  await flushPromises()
}

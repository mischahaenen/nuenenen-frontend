import { expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseBanner from '~/components/BaseBanner.vue'

const createWrapper = (props = {}) => {
  const defaultProps = {
    title: 'Welcome Title',
    description: 'Welcome to our site',
    image: {
      hash: 'test-hash',
      ext: '.webp',
      name: 'test-banner.webp',
      alternativeText: 'Test banner'
    }
  }

  return mount(BaseBanner, {
    props: { ...defaultProps, ...props },
    global: {
      mocks: {
        useColorMode: vi.fn(() => ({ value: 'light' })),
        useScrollY: vi.fn(() => ({ value: 0 })),
        computed: vi.fn((fn) => ({ value: fn() }))
      },
      stubs: {
        NuxtImg: {
          template: '<img :src="src" :alt="alt" class="nuxt-img" />',
          props: ['src', 'alt', 'format', 'provider', 'sizes', 'quality', 'loading', 'width', 'height', 'modifiers']
        },
        NuxtLink: {
          template: '<a :href="to" class="nuxt-link"><slot /></a>',
          props: ['to']
        },
        ClientOnly: {
          template: '<div class="client-only"><slot /></div>'
        }
      }
    }
  })
}

test('renders the component with banner image and text', () => {
  const wrapper = createWrapper()
  expect(wrapper.exists()).toBe(true)
  expect(wrapper.find('.banner').exists()).toBe(true)
})

test('renders NuxtImg with correct props', () => {
  const image = {
    hash: 'custom-hash',
    ext: '.jpg',
    name: 'custom-banner.jpg',
    alternativeText: 'Custom banner alt text'
  }
  
  const wrapper = createWrapper({ image })
  const img = wrapper.findComponent({ name: 'NuxtImg' })
  
  expect(img.exists()).toBe(true)
  expect(img.props('src')).toBe('custom-hash.jpg')
  expect(img.props('alt')).toBe('Custom banner alt text')
  expect(img.props('format')).toBe('webp')
  expect(img.props('provider')).toBe('strapi')
})

test('renders banner text correctly', () => {
  const title = 'Custom Banner Title'
  const description = 'Custom banner description'
  const wrapper = createWrapper({ title, description })
  
  const titleElement = wrapper.find('h1')
  const descElement = wrapper.find('.subtitle')
  expect(titleElement.exists()).toBe(true)
  expect(titleElement.text()).toBe(title)
  expect(descElement.text()).toBe(description)
})

test('handles missing banner image gracefully', () => {
  const wrapper = createWrapper({ image: null })
  
  // Component should still render even without image
  expect(wrapper.exists()).toBe(true)
  // Should render default logo instead
  const imgs = wrapper.findAllComponents({ name: 'NuxtImg' })
  expect(imgs.length).toBeGreaterThan(0)
})

test('handles missing banner text gracefully', () => {
  const wrapper = createWrapper({ title: null, description: null })
  
  expect(wrapper.exists()).toBe(true)
  const titleElement = wrapper.find('h1')
  const descElement = wrapper.find('.subtitle')
  expect(titleElement.text()).toBe('')
  expect(descElement.text()).toBe('')
})

test('handles empty banner text', () => {
  const wrapper = createWrapper({ title: '', description: '' })
  
  const titleElement = wrapper.find('h1')
  const descElement = wrapper.find('.subtitle')
  expect(titleElement.text()).toBe('')
  expect(descElement.text()).toBe('')
})

test('applies correct CSS classes', () => {
  const wrapper = createWrapper()
  
  expect(wrapper.find('.banner').exists()).toBe(true)
  expect(wrapper.find('.container').exists()).toBe(true)
  expect(wrapper.find('.home-text').exists()).toBe(true)
})

test('has proper semantic structure', () => {
  const wrapper = createWrapper()
  
  // Should be wrapped in a section or similar semantic element
  const banner = wrapper.find('.banner')
  expect(banner.exists()).toBe(true)
  
  // Should have proper image and content structure
  expect(wrapper.find('.banner-image').exists()).toBe(true)
  expect(wrapper.find('.banner-content').exists()).toBe(true)
})

test('handles different image formats', () => {
  const testCases = [
    { ext: '.webp', expected: 'test-hash.webp' },
    { ext: '.jpg', expected: 'test-hash.jpg' },
    { ext: '.png', expected: 'test-hash.png' }
  ]

  testCases.forEach(({ ext, expected }) => {
    const bannerImage = {
      hash: 'test-hash',
      ext,
      name: `test-banner${ext}`,
      alternativeText: 'Test banner'
    }
    
    const wrapper = createWrapper({ bannerImage })
    const img = wrapper.findComponent({ name: 'NuxtImg' })
    expect(img.props('src')).toBe(expected)
  })
})

test('sets correct image optimization props', () => {
  const wrapper = createWrapper()
  const img = wrapper.findComponent({ name: 'NuxtImg' })
  
  expect(img.props('format')).toBe('webp')
  expect(img.props('provider')).toBe('strapi')
  expect(img.props('quality')).toBe(80)
  expect(img.props('sizes')).toBe('100vw')
})

test('handles long banner text', () => {
  const longText = 'This is a very long banner text that should still render correctly and not break the layout or component functionality'
  const wrapper = createWrapper({ bannerText: longText })
  
  const textElement = wrapper.find('.banner-text')
  expect(textElement.text()).toBe(longText)
})

test('renders with both image and text', () => {
  const wrapper = createWrapper({
    bannerImage: {
      hash: 'test-hash',
      ext: '.webp',
      name: 'test.webp',
      alternativeText: 'Test'
    },
    bannerText: 'Test banner text'
  })
  
  expect(wrapper.findComponent({ name: 'NuxtImg' }).exists()).toBe(true)
  expect(wrapper.find('.banner-text').exists()).toBe(true)
  expect(wrapper.find('.banner-text').text()).toBe('Test banner text')
})
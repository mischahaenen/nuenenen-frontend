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
      alternativeText: 'Test banner',
    },
  }

  return mount(BaseBanner, {
    props: { ...defaultProps, ...props },
    global: {
      mocks: {
        useColorMode: vi.fn(() => ({ value: 'light' })),
        useScrollY: vi.fn(() => ({ value: 0 })),
      },
      stubs: {
        NuxtImg: {
          name: 'NuxtImg',
          template: '<img :src="src" :alt="alt" class="nuxt-img" />',
          props: [
            'src',
            'alt',
            'format',
            'provider',
            'sizes',
            'quality',
            'loading',
            'width',
            'height',
            'modifiers',
          ],
        },
        NuxtLink: {
          name: 'NuxtLink',
          template: '<a :href="to" class="nuxt-link"><slot /></a>',
          props: ['to'],
        },
        ClientOnly: {
          template: '<div class="client-only"><slot /></div>',
        },
      },
    },
  })
}

test('renders the component with banner image and text', () => {
  const wrapper = createWrapper()
  expect(wrapper.exists()).toBe(true)
  expect(wrapper.find('.banner').exists()).toBe(true)
})

test('renders NuxtImg with correct props when image is provided', () => {
  const image = {
    hash: 'custom-hash',
    ext: '.jpg',
    name: 'custom-banner.jpg',
    alternativeText: 'Custom banner alt text',
  }

  const wrapper = createWrapper({ image })
  const imgs = wrapper.findAllComponents({ name: 'NuxtImg' })

  expect(imgs.length).toBeGreaterThan(0)
  const bannerImg = imgs.find((i) => i.props('src') === 'custom-hash.jpg')
  expect(bannerImg).toBeTruthy()
  expect(bannerImg!.props('alt')).toContain('Custom banner alt text')
  expect(bannerImg!.props('format')).toBe('webp')
  expect(bannerImg!.props('provider')).toBe('strapi')
})

test('renders banner title and description correctly', () => {
  const title = 'Custom Banner Title'
  const description = 'Custom banner description'
  const wrapper = createWrapper({ title, description })

  const titleElement = wrapper.find('h1')
  const descElement = wrapper.find('.subtitle')
  expect(titleElement.exists()).toBe(true)
  expect(titleElement.text()).toBe(title)
  expect(descElement.text()).toBe(description)
})

test('shows default logo when no image is provided', () => {
  const wrapper = createWrapper({ image: null })

  expect(wrapper.exists()).toBe(true)
  const imgs = wrapper.findAllComponents({ name: 'NuxtImg' })
  expect(imgs.length).toBeGreaterThan(0)
  const logoImg = imgs.find((i) =>
    (i.props('src') as string)?.includes('nuenenen_logo')
  )
  expect(logoImg).toBeTruthy()
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

  const banner = wrapper.find('.banner')
  expect(banner.exists()).toBe(true)
  expect(wrapper.find('.home-text').exists()).toBe(true)
  expect(wrapper.find('.subtitle').exists()).toBe(true)
})

test('shows custom-background-image class when image is provided', () => {
  const wrapper = createWrapper()
  const imgs = wrapper.findAllComponents({ name: 'NuxtImg' })
  const customImg = imgs.find((i) =>
    (i.props('src') as string)?.includes('test-hash')
  )
  expect(customImg).toBeTruthy()
})

test('renders action button as anchor when link starts with #', () => {
  const wrapper = createWrapper({
    actionButtonLink: '#Blog',
    actionButtonName: 'Zum Blog',
  })
  const anchor = wrapper.find('a.btn')
  expect(anchor.exists()).toBe(true)
  expect(anchor.attributes('href')).toBe('#Blog')
  expect(anchor.text()).toBe('Zum Blog')
})

test('renders action button as NuxtLink for regular routes', () => {
  const wrapper = createWrapper({
    actionButtonLink: '/blog',
    actionButtonName: 'Blog',
  })
  const nuxtLink = wrapper.findComponent({ name: 'NuxtLink' })
  expect(nuxtLink.exists()).toBe(true)
  expect(nuxtLink.props('to')).toBe('/blog')
})

test('does not render action button when props are missing', () => {
  const wrapper = createWrapper({
    actionButtonLink: null,
    actionButtonName: null,
  })
  const btn = wrapper.find('.btn-link')
  expect(btn.exists()).toBe(false)
})

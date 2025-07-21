import { expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import PostComponent from '~/components/PostComponent.vue'

// Mock the useReadingTime composable
vi.mock('~/composables/useReadingTime', () => ({
  useReadingTime: () => ({
    calculateBlocksReadingTime: vi.fn(() => 5)
  })
}))

// Mock Vue's reactivity functions
global.toRefs = vi.fn((props) => {
  const refs = {}
  for (const key in props) {
    refs[key] = { value: props[key] }
  }
  return refs
})

global.computed = vi.fn((fn) => ({ value: fn() }))

const createWrapper = (props = {}) => {
  const defaultProps = {
    post: {
      id: 1,
      title: 'Test Post Title',
      slug: 'test-post-slug',
      description: [
        {
          type: 'paragraph',
          children: [{ type: 'text', text: 'Test post description content' }]
        }
      ],
      createdAt: '2023-01-01T10:00:00.000Z',
      images: [
        {
          hash: 'test-image-hash',
          ext: '.webp',
          name: 'test-image.webp',
          alternativeText: 'Test image alt text'
        }
      ],
      step: {
        id: 1,
        Name: 'Test Step'
      }
    },
    isFirst: false
  }

  return mount(PostComponent, {
    props: { ...defaultProps, ...props },
    global: {
      mocks: {
        toRefs: vi.fn((props) => {
          const refs = {}
          for (const key in props) {
            refs[key] = { value: props[key] }
          }
          return refs
        }),
        computed: vi.fn((fn) => ({ value: fn() })),
        useReadingTime: vi.fn(() => ({
          calculateBlocksReadingTime: vi.fn(() => 5)
        }))
      },
      stubs: {
        NuxtLink: {
          template: '<a :href="to" class="nuxt-link"><slot /></a>',
          props: ['to']
        },
        NuxtImg: {
          template: '<img :src="src" :alt="alt" class="nuxt-img" />',
          props: ['src', 'alt', 'format', 'provider', 'sizes', 'loading', 'fetchpriority']
        },
        ReadingTime: {
          template: '<span class="reading-time">{{ time }} {{ unit }}</span>',
          props: ['time', 'unit']
        },
        RichTextComponent: {
          template: '<div class="rich-text">{{ content }}</div>',
          props: ['content', 'isPreview', 'previewLines']
        }
      }
    }
  })
}

test('renders the component with post data', () => {
  const wrapper = createWrapper()
  expect(wrapper.exists()).toBe(true)
  expect(wrapper.find('article').exists()).toBe(true)
  expect(wrapper.find('.post-link').exists()).toBe(true)
})

test('renders NuxtLink with correct href', () => {
  const wrapper = createWrapper()
  const nuxtLink = wrapper.findComponent({ name: 'NuxtLink' })
  expect(nuxtLink.props('to')).toBe('/blog/test-post-slug')
})

test('renders post title correctly', () => {
  const wrapper = createWrapper()
  const title = wrapper.find('.card-title')
  expect(title.text()).toBe('Test Post Title')
})

test('renders post image with correct props', () => {
  const wrapper = createWrapper()
  const image = wrapper.findComponent({ name: 'NuxtImg' })
  expect(image.exists()).toBe(true)
  expect(image.props('src')).toBe('test-image-hash.webp')
  expect(image.props('alt')).toBe('Test image alt text')
  expect(image.props('format')).toBe('webp')
  expect(image.props('provider')).toBe('strapi')
})

test('renders placeholder when no images are available', () => {
  const postWithoutImages = {
    post: {
      id: 1,
      title: 'Test Post',
      slug: 'test-post',
      description: [],
      createdAt: '2023-01-01T10:00:00.000Z',
      images: [],
      step: null
    }
  }
  
  const wrapper = createWrapper(postWithoutImages)
  const placeholder = wrapper.find('.card-image-placeholder')
  expect(placeholder.exists()).toBe(true)
  expect(wrapper.findComponent({ name: 'NuxtImg' }).exists()).toBe(false)
})

test('applies featured class when isFirst is true', () => {
  const wrapper = createWrapper({ isFirst: true })
  const article = wrapper.find('article')
  expect(article.classes()).toContain('card--featured')
})

test('applies preview class when isFirst is false', () => {
  const wrapper = createWrapper({ isFirst: false })
  const article = wrapper.find('article')
  expect(article.classes()).toContain('card--preview')
})

test('renders reading time component', () => {
  const wrapper = createWrapper()
  const readingTime = wrapper.findComponent({ name: 'ReadingTime' })
  expect(readingTime.exists()).toBe(true)
})

test('renders step tag when step is available', () => {
  const wrapper = createWrapper()
  const stepTag = wrapper.find('.card-tag')
  expect(stepTag.exists()).toBe(true)
  expect(stepTag.text()).toBe('#Test Step')
})

test('does not render step tag when step is not available', () => {
  const postWithoutStep = {
    post: {
      id: 1,
      title: 'Test Post',
      slug: 'test-post',
      description: [],
      createdAt: '2023-01-01T10:00:00.000Z',
      images: [],
      step: null
    }
  }
  
  const wrapper = createWrapper(postWithoutStep)
  const stepTag = wrapper.find('.card-tag')
  expect(stepTag.exists()).toBe(false)
})

test('renders RichTextComponent with correct props', () => {
  const wrapper = createWrapper({ isFirst: false })
  const richTextComponent = wrapper.findComponent({ name: 'RichTextComponent' })
  expect(richTextComponent.exists()).toBe(true)
  expect(richTextComponent.props('isPreview')).toBe(true)
  expect(richTextComponent.props('previewLines')).toBe(3)
})

test('renders RichTextComponent with more preview lines when isFirst is true', () => {
  const wrapper = createWrapper({ isFirst: true })
  const richTextComponent = wrapper.findComponent({ name: 'RichTextComponent' })
  expect(richTextComponent.props('previewLines')).toBe(4)
})

test('sets correct image loading attributes for first post', () => {
  const wrapper = createWrapper({ isFirst: true })
  const image = wrapper.findComponent({ name: 'NuxtImg' })
  expect(image.props('loading')).toBe('eager')
  expect(image.props('fetchpriority')).toBe('high')
})

test('sets correct image loading attributes for subsequent posts', () => {
  const wrapper = createWrapper({ isFirst: false })
  const image = wrapper.findComponent({ name: 'NuxtImg' })
  expect(image.props('loading')).toBe('lazy')
  expect(image.props('fetchpriority')).toBe('auto')
})

test('handles undefined post gracefully', () => {
  const wrapper = createWrapper({ post: undefined })
  // Component should not render anything when post is undefined
  expect(wrapper.findComponent({ name: 'NuxtLink' }).exists()).toBe(false)
})

test('renders correct aria-label for accessibility', () => {
  const wrapper = createWrapper()
  const link = wrapper.findComponent({ name: 'NuxtLink' })
  expect(link.attributes('aria-label')).toBe('Artikel lesen: Test Post Title')
})

test('has correct card structure', () => {
  const wrapper = createWrapper()
  
  // Check main structure elements
  expect(wrapper.find('.card').exists()).toBe(true)
  expect(wrapper.find('.card-image-wrapper').exists()).toBe(true)
  expect(wrapper.find('.card-content').exists()).toBe(true)
  expect(wrapper.find('.card-header').exists()).toBe(true)
  expect(wrapper.find('.card-description').exists()).toBe(true)
})

test('renders date and meta information', () => {
  const wrapper = createWrapper()
  
  expect(wrapper.find('.card-meta').exists()).toBe(true)
  expect(wrapper.find('.card-date').exists()).toBe(true)
  expect(wrapper.find('.meta-separator').exists()).toBe(true)
})

test('handles missing post properties gracefully', () => {
  const incompletePost = {
    post: {
      id: 1,
      title: 'Test Post',
      slug: 'test-post',
      description: null,
      createdAt: null,
      images: null,
      step: null
    }
  }

  const wrapper = createWrapper(incompletePost)
  expect(wrapper.exists()).toBe(true)
  expect(wrapper.find('.card-title').text()).toBe('Test Post')
  expect(wrapper.find('.card-image-placeholder').exists()).toBe(true)
})
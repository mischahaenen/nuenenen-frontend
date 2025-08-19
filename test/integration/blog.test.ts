import { expect, test, vi } from 'vitest'
import BlogPost from '~/pages/blog/[slug].vue'
import { createAsyncWrapper, waitForAsyncComponent } from '../utils/async-wrapper'

// Mock the API composables
vi.mock('~/composables/api/modules/blog', () => ({
  useBlogApi: () => ({
    getBlogPost: vi.fn()
  })
}))

const createWrapper = (route = {}, asyncData = {}) => {
  const defaultRoute = {
    params: { slug: 'test-blog-post' },
    query: {},
    path: '/blog/test-blog-post',
    fullPath: '/blog/test-blog-post',
    meta: {}
  }

  const defaultAsyncData = {
    data: [{
      id: 1,
      title: 'Test Blog Post',
      slug: 'test-blog-post',
      description: [
        {
          type: 'paragraph',
          children: [{ type: 'text', text: 'This is a test blog post description.' }]
        }
      ],
      images: [
        {
          id: 1,
          hash: 'test-image-hash',
          ext: '.webp',
          name: 'test-image.webp',
          alternativeText: 'Test image'
        }
      ],
      createdAt: '2023-01-01T10:00:00.000Z',
      updatedAt: '2023-01-01T10:00:00.000Z'
    }],
    error: null
  }

  return createAsyncWrapper(BlogPost, {
    route: { ...defaultRoute, ...route },
    asyncData: { ...defaultAsyncData, ...asyncData }
  })
}

test('renders blog post page correctly', async () => {
  const wrapper = createWrapper()
  await waitForAsyncComponent(wrapper)
  
  expect(wrapper.exists()).toBe(true)
  expect(wrapper.find('main').exists()).toBe(true)
})

test('displays blog post title', async () => {
  const wrapper = createWrapper()
  await waitForAsyncComponent(wrapper)
  
  const title = wrapper.find('h1')
  expect(title.exists()).toBe(true)
  expect(title.text()).toBe('Test Blog Post')
})

test('renders SliderComponent with images', async () => {
  const wrapper = createWrapper()
  await waitForAsyncComponent(wrapper)
  
  const sliderComponent = wrapper.findComponent({ name: 'SliderComponent' })
  expect(sliderComponent.exists()).toBe(true)
})

test('renders RichTextComponent with content', async () => {
  const wrapper = createWrapper()
  await waitForAsyncComponent(wrapper)
  
  const richTextComponent = wrapper.findComponent({ name: 'RichTextComponent' })
  expect(richTextComponent.exists()).toBe(true)
})

test('renders back link correctly', async () => {
  const wrapper = createWrapper()
  await waitForAsyncComponent(wrapper)
  
  const backLink = wrapper.find('.back-link')
  expect(backLink.exists()).toBe(true)
  expect(backLink.text()).toContain('Zurück')
  
  const nuxtLink = wrapper.findComponent({ name: 'NuxtLink' })
  expect(nuxtLink.props('to')).toBe('/')
})

test('handles error state', () => {
  const wrapper = createWrapper({}, {
    data: { value: null },
    error: { value: new Error('Failed to fetch post') }
  })
  
  expect(wrapper.text()).toContain('Something went wrong')
})

test('handles empty post data', () => {
  const wrapper = createWrapper({}, {
    data: { value: [] },
    error: { value: null }
  })
  
  // Main element should not render when no post data
  expect(wrapper.find('main').exists()).toBe(false)
})

test('renders article content when post exists', () => {
  const wrapper = createWrapper()
  
  const article = wrapper.find('article')
  expect(article.exists()).toBe(true)
  
  // Check for main content elements
  expect(wrapper.find('h1').exists()).toBe(true)
  expect(wrapper.findComponent({ name: 'RichTextComponent' }).exists()).toBe(true)
})

test('handles different blog post data', () => {
  const customPost = {
    data: { 
      value: [{
        id: 2,
        title: 'Custom Blog Post Title',
        slug: 'custom-post',
        description: [
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'Custom description content.' }]
          }
        ],
        images: [],
        createdAt: '2023-02-01T10:00:00.000Z'
      }]
    }
  }
  
  const wrapper = createWrapper({}, customPost)
  expect(wrapper.find('h1').text()).toBe('Custom Blog Post Title')
})

test('has proper semantic structure', () => {
  const wrapper = createWrapper()
  
  // Should have main landmark
  expect(wrapper.find('main').exists()).toBe(true)
  
  // Should have article for blog content
  expect(wrapper.find('article').exists()).toBe(true)
  
  // Should have proper heading hierarchy
  expect(wrapper.find('h1').exists()).toBe(true)
})

test('renders slider when post has images', () => {
  const wrapper = createWrapper()
  const slider = wrapper.findComponent({ name: 'SliderComponent' })
  expect(slider.exists()).toBe(true)
})

test('calls useHead for SEO', () => {
  const mockUseHead = vi.fn()
  
  mount(BlogPost, {
    global: {
      mocks: {
        useRoute: vi.fn(() => ({
          params: { slug: 'test-post' }
        })),
        useAsyncData: vi.fn().mockResolvedValue({
          data: { value: [] },
          error: { value: null }
        }),
        useBlogApi: vi.fn(),
        useHead: mockUseHead,
        computed: vi.fn((fn) => ({ value: fn() }))
      },
      stubs: {
        SliderComponent: true,
        RichTextComponent: true,
        NuxtLink: true
      }
    }
  })
  
  expect(mockUseHead).toHaveBeenCalled()
})
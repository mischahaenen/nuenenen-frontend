import { expect, test, vi, afterEach } from 'vitest'
import { createAsyncWrapper } from '../utils/async-wrapper'
import BlogPost from '~/pages/blog/[slug].vue'

afterEach(() => {
  vi.clearAllMocks()
})

vi.mock('~/composables/api/modules/blog', () => ({
  useBlogApi: () => ({
    getBlogPost: vi.fn(),
  }),
}))

const defaultRoute = {
  params: { slug: 'test-blog-post' },
  query: {},
  path: '/blog/test-blog-post',
  fullPath: '/blog/test-blog-post',
  meta: {},
}

const defaultPost = {
  id: 1,
  title: 'Test Blog Post',
  slug: 'test-blog-post',
  description: [
    {
      type: 'paragraph',
      children: [
        { type: 'text', text: 'This is a test blog post description.' },
      ],
    },
  ],
  images: [
    {
      id: 1,
      hash: 'test-image-hash',
      ext: '.webp',
      name: 'test-image.webp',
      alternativeText: 'Test image',
    },
  ],
  createdAt: '2023-01-01T10:00:00.000Z',
}

const createWrapper = (asyncData = {}) =>
  createAsyncWrapper(BlogPost, {
    route: defaultRoute,
    asyncData: { data: [defaultPost], error: null, ...asyncData },
  })

test('renders blog post page correctly', async () => {
  const wrapper = await createWrapper()
  expect(wrapper.exists()).toBe(true)
  expect(wrapper.find('main').exists()).toBe(true)
})

test('displays blog post title', async () => {
  const wrapper = await createWrapper()
  const title = wrapper.find('h1')
  expect(title.exists()).toBe(true)
  expect(title.text()).toBe('Test Blog Post')
})

test('renders SliderComponent with images', async () => {
  const wrapper = await createWrapper()
  expect(wrapper.findComponent({ name: 'SliderComponent' }).exists()).toBe(true)
})

test('renders RichTextComponent with content', async () => {
  const wrapper = await createWrapper()
  expect(wrapper.findComponent({ name: 'RichTextComponent' }).exists()).toBe(
    true
  )
})

test('renders back link correctly', async () => {
  const wrapper = await createWrapper()
  expect(wrapper.find('.back-link').exists()).toBe(true)
  expect(wrapper.find('.back-link').text()).toContain('Zurück')
  expect(wrapper.findComponent({ name: 'NuxtLink' }).props('to')).toBe('/')
})

test('does not render main when post data is empty', async () => {
  const wrapper = await createWrapper({ data: [] })
  expect(wrapper.find('main').exists()).toBe(false)
})

test('renders article content', async () => {
  const wrapper = await createWrapper()
  expect(wrapper.find('article').exists()).toBe(true)
  expect(wrapper.find('h1').exists()).toBe(true)
  expect(wrapper.findComponent({ name: 'RichTextComponent' }).exists()).toBe(
    true
  )
})

test('handles different blog post data', async () => {
  const customPost = {
    id: 2,
    title: 'Custom Blog Post Title',
    slug: 'custom-post',
    description: [],
    images: [],
    createdAt: '2023-02-01T10:00:00.000Z',
  }
  const wrapper = await createWrapper({ data: [customPost] })
  expect(wrapper.find('h1').text()).toBe('Custom Blog Post Title')
})

test('has proper semantic structure', async () => {
  const wrapper = await createWrapper()
  expect(wrapper.find('main').exists()).toBe(true)
  expect(wrapper.find('article').exists()).toBe(true)
  expect(wrapper.find('h1').exists()).toBe(true)
})

test('renders slider when post has images', async () => {
  const wrapper = await createWrapper()
  expect(wrapper.findComponent({ name: 'SliderComponent' }).exists()).toBe(true)
})

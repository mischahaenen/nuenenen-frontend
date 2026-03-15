import { expect, test, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import StepsComponent from '~/components/pageZone/StepsComponent.vue'

// Mock the API composable
vi.mock('~/composables/api/modules/steps', () => ({
  useStepsApi: () => ({
    getSteps: vi.fn(),
  }),
}))

const createWrapper = async (props = {}) => {
  const defaultProps = {
    zone: {
      Title: 'Test Zone',
      Description: 'Test zone description',
      steps: [{ id: 1 }, { id: 2 }],
    },
    index: 0,
  }

  const mergedProps = { ...defaultProps, ...props }

  const wrapper = mount(
    {
      components: { StepsComponent },
      template: `<Suspense><StepsComponent v-bind="componentProps" /></Suspense>`,
      setup() {
        return { componentProps: mergedProps }
      },
    },
    {
      global: {
        stubs: {
          TitleComponent: {
            name: 'TitleComponent',
            template: '<div class="title-component"></div>',
            props: ['title', 'index'],
          },
          RichTextComponent: {
            name: 'RichTextComponent',
            template: '<div class="rich-text-component"></div>',
            props: ['content'],
          },
          NuxtImg: {
            name: 'NuxtImg',
            template: '<img />',
            props: [
              'src',
              'alt',
              'format',
              'provider',
              'sizes',
              'loading',
              'modifiers',
            ],
          },
          NuxtLink: {
            name: 'NuxtLink',
            template: '<a :href="to"><slot /></a>',
            props: ['to'],
          },
        },
      },
    }
  )

  // Wait for async setup and all promises to resolve
  await flushPromises()
  return wrapper
}

test('renders the component correctly', async () => {
  const wrapper = await createWrapper()
  expect(wrapper.exists()).toBe(true)
  expect(wrapper.find('section').exists()).toBe(true)
})

test('applies correct CSS classes based on index', async () => {
  const evenWrapper = await createWrapper({ index: 0 })
  const oddWrapper = await createWrapper({ index: 1 })

  const evenSection = evenWrapper.find('section')
  const oddSection = oddWrapper.find('section')

  expect(evenSection.classes()).toContain('pt-medium')
  expect(evenSection.classes()).toContain('pb-medium')
  expect(evenSection.classes()).toContain('full-width')
  expect(evenSection.classes()).toContain('content-grid')

  expect(oddSection.classes()).toContain('bg-accent-50')
  expect(oddSection.classes()).toContain('dark:bg-primary-700')
})

test('renders TitleComponent with correct props', async () => {
  const zone = {
    Title: 'Custom Title',
    Description: 'Custom description',
    steps: [{ id: 1 }],
  }
  const wrapper = await createWrapper({ zone, index: 2 })

  const titleComponent = wrapper.findComponent({ name: 'TitleComponent' })
  expect(titleComponent.exists()).toBe(true)
  expect(titleComponent.props('title')).toBe('Custom Title')
  expect(titleComponent.props('index')).toBe(2)
})

test('renders RichTextComponent with correct props', async () => {
  const zone = {
    Title: 'Test',
    Description: 'Custom description content',
    steps: [],
  }
  const wrapper = await createWrapper({ zone })

  const richTextComponent = wrapper.findComponent({ name: 'RichTextComponent' })
  expect(richTextComponent.exists()).toBe(true)
  expect(richTextComponent.props('content')).toBe('Custom description content')
})

test('renders step grid container', async () => {
  const wrapper = await createWrapper()

  const stepGrid = wrapper.find('.step-grid')
  expect(stepGrid.exists()).toBe(true)
  expect(stepGrid.classes()).toContain('mt-medium')
  expect(stepGrid.classes()).toContain('step-grid')
})

test('handles empty zone steps gracefully', async () => {
  const zone = {
    Title: 'Empty Zone',
    Description: 'No steps here',
    steps: [],
  }
  const wrapper = await createWrapper({ zone })

  expect(wrapper.exists()).toBe(true)
  expect(wrapper.find('.step-grid').exists()).toBe(true)
})

test('passes zone data correctly to child components', async () => {
  const customZone = {
    Title: 'Custom Zone Title',
    Description: 'Custom zone description with details',
    steps: [{ id: 1 }, { id: 2 }, { id: 3 }],
  }

  const wrapper = await createWrapper({ zone: customZone, index: 1 })

  const titleComponent = wrapper.findComponent({ name: 'TitleComponent' })
  const richTextComponent = wrapper.findComponent({ name: 'RichTextComponent' })

  expect(titleComponent.props('title')).toBe(customZone.Title)
  expect(titleComponent.props('index')).toBe(1)
  expect(richTextComponent.props('content')).toBe(customZone.Description)
})

test('has correct section structure', async () => {
  const wrapper = await createWrapper()

  const section = wrapper.find('section')
  expect(section.exists()).toBe(true)

  // Check that all main elements are present
  expect(wrapper.findComponent({ name: 'TitleComponent' }).exists()).toBe(true)
  expect(wrapper.findComponent({ name: 'RichTextComponent' }).exists()).toBe(
    true
  )
  expect(wrapper.find('.step-grid').exists()).toBe(true)
})

import { expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseColorSwitch from '~/components/BaseColorSwitch.vue'

const createWrapper = (colorMode = {}) => {
  const defaultColorMode = {
    unknown: false,
    preference: 'system',
    value: 'light'
  }

  return mount(BaseColorSwitch, {
    global: {
      mocks: {
        $colorMode: { ...defaultColorMode, ...colorMode },
        resolveComponent: vi.fn((name: string) => ({
          name,
          template: `<div class="icon-${name.toLowerCase().replace('icon', '')}" @click="$emit('click')"></div>`
        }))
      },
      stubs: {
        IconSystem: {
          template: '<div class="icon-system" @click="$emit(\'click\')"></div>'
        },
        IconLight: {
          template: '<div class="icon-light" @click="$emit(\'click\')"></div>'
        },
        IconDark: {
          template: '<div class="icon-dark" @click="$emit(\'click\')"></div>'
        }
      }
    }
  })
}

test('renders the component', () => {
  const wrapper = createWrapper()
  expect(wrapper.exists()).toBe(true)
  expect(wrapper.find('ul').exists()).toBe(true)
})

test('renders all three color options', () => {
  const wrapper = createWrapper()
  const listItems = wrapper.findAll('li')
  expect(listItems).toHaveLength(3)
})

test('applies preferred class to current preference', () => {
  const wrapper = createWrapper({ preference: 'dark', unknown: false })
  const listItems = wrapper.findAll('li')
  
  // Find the dark mode list item (third item)
  const darkItem = listItems[2] // dark is the third item
  expect(darkItem.classes()).toContain('preferred')
})

test('applies selected class to current value', () => {
  const wrapper = createWrapper({ value: 'light', unknown: false })
  const listItems = wrapper.findAll('li')
  
  // Find the light mode list item (second item)  
  const lightItem = listItems[1] // light is the second item
  expect(lightItem.classes()).toContain('selected')
})

test('does not apply classes when color mode is unknown', () => {
  const wrapper = createWrapper({ unknown: true })
  const listItems = wrapper.findAll('li')
  
  listItems.forEach(item => {
    expect(item.classes()).not.toContain('preferred')
    expect(item.classes()).not.toContain('selected')
  })
})

test('renders icon components for each color option', () => {
  const wrapper = createWrapper()
  
  
  expect(wrapper.find('.icon-system').exists()).toBe(true)
  expect(wrapper.find('.icon-light').exists()).toBe(true)
  expect(wrapper.find('.icon-dark').exists()).toBe(true)
})

test('handles click events on icons', async () => {
  const wrapper = createWrapper()
  
  const systemIcon = wrapper.find('.icon-system')
  expect(systemIcon.exists()).toBe(true)
  
  await systemIcon.trigger('click')
  // Icon click should work without errors
  expect(systemIcon.exists()).toBe(true)
})

test('has correct list structure', () => {
  const wrapper = createWrapper()
  
  const list = wrapper.find('ul')
  expect(list.exists()).toBe(true)
  
  const listItems = wrapper.findAll('li')
  expect(listItems).toHaveLength(3)
  
  // Each list item should contain an icon
  listItems.forEach((item, index) => {
    const iconClasses = ['.icon-system', '.icon-light', '.icon-dark']
    expect(item.find(iconClasses[index]).exists()).toBe(true)
  })
})

test('shows correct preference state for each mode', () => {
  const modes = ['system', 'light', 'dark']
  
  modes.forEach((mode, index) => {
    const wrapper = createWrapper({ preference: mode, unknown: false })
    const listItems = wrapper.findAll('li')
    
    // Only the current preference should have the preferred class
    listItems.forEach((item, itemIndex) => {
      if (itemIndex === index) {
        expect(item.classes()).toContain('preferred')
      } else {
        expect(item.classes()).not.toContain('preferred')
      }
    })
  })
})

test('shows correct selected state for each mode', () => {
  const modes = ['system', 'light', 'dark']
  
  modes.forEach((mode, index) => {
    const wrapper = createWrapper({ value: mode, unknown: false })
    const listItems = wrapper.findAll('li')
    
    // Only the current value should have the selected class
    listItems.forEach((item, itemIndex) => {
      if (itemIndex === index) {
        expect(item.classes()).toContain('selected')
      } else {
        expect(item.classes()).not.toContain('selected')
      }
    })
  })
})
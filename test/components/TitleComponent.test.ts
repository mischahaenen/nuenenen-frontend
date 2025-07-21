import { expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TitleComponent from '~/components/TitleComponent.vue'

const createWrapper = (props = {}) => {
  const defaultProps = {
    title: 'Test Title',
    index: 0
  }

  return mount(TitleComponent, {
    props: { ...defaultProps, ...props }
  })
}

test('renders the component with title', () => {
  const wrapper = createWrapper()
  expect(wrapper.exists()).toBe(true)
  expect(wrapper.find('h2').exists()).toBe(true)
})

test('renders simple title for odd index', () => {
  const wrapper = createWrapper({ title: 'Simple Title', index: 1 })
  const h2 = wrapper.find('h2')
  expect(h2.text()).toBe('Simple Title')
  expect(h2.classes()).toContain('title')
})

test('renders letter-by-letter title for even index', () => {
  const wrapper = createWrapper({ title: 'Test Title', index: 0 })
  const h2 = wrapper.find('h2')
  expect(h2.classes()).toContain('title')
  
  
  // Should have word spans
  const words = wrapper.findAll('.word')
  expect(words.length).toBe(2) // "Test" and "Title"
})

test('splits title into words correctly', () => {
  const wrapper = createWrapper({ title: 'Hello World Test', index: 0 })
  const words = wrapper.findAll('.word')
  expect(words.length).toBe(3)
})

test('renders letters for each word', () => {
  const wrapper = createWrapper({ title: 'Hi', index: 0 })
  const letters = wrapper.findAll('.letter')
  expect(letters.length).toBe(2) // "H" and "i"
})

test('highlights last word letters', () => {
  const wrapper = createWrapper({ title: 'First Last', index: 0 })
  const letters = wrapper.findAll('.letter')
  
  // First word letters ("First" = 5 letters) should not have highlight class
  expect(letters[0].classes()).not.toContain('highlight')
  expect(letters[1].classes()).not.toContain('highlight')
  expect(letters[2].classes()).not.toContain('highlight')
  expect(letters[3].classes()).not.toContain('highlight')
  expect(letters[4].classes()).not.toContain('highlight')
  
  // Last word letters ("Last" = 4 letters) should have highlight class
  expect(letters[5].classes()).toContain('highlight')
  expect(letters[6].classes()).toContain('highlight')
  expect(letters[7].classes()).toContain('highlight')
  expect(letters[8].classes()).toContain('highlight')
})

test('renders spacers between words', () => {
  const wrapper = createWrapper({ title: 'Word One', index: 0 })
  const spacers = wrapper.findAll('.spacer')
  expect(spacers.length).toBe(2) // One spacer per word
})

test('handles undefined title gracefully', () => {
  const wrapper = createWrapper({ title: undefined, index: 0 })
  expect(wrapper.exists()).toBe(true)
  
  // With undefined title, should still render h2 but with no content
  const h2 = wrapper.find('h2')
  expect(h2.exists()).toBe(true)
})

test('handles empty title', () => {
  const wrapper = createWrapper({ title: '', index: 0 })
  const words = wrapper.findAll('.word')
  expect(words.length).toBe(0)
})

test('handles single word title', () => {
  const wrapper = createWrapper({ title: 'Single', index: 0 })
  const words = wrapper.findAll('.word')
  expect(words.length).toBe(1)
  
  const letters = wrapper.findAll('.letter')
  expect(letters.length).toBe(6) // "Single" has 6 letters
  
  // All letters should be highlighted (since it's the last/only word)
  letters.forEach(letter => {
    expect(letter.classes()).toContain('highlight')
  })
})

test('renders correctly for different index values', () => {
  // Even index (0) - letter by letter
  const evenWrapper = createWrapper({ title: 'Test', index: 0 })
  expect(evenWrapper.findAll('.letter').length).toBe(4)
  
  // Odd index (1) - simple text
  const oddWrapper = createWrapper({ title: 'Test', index: 1 })
  expect(oddWrapper.findAll('.letter').length).toBe(0)
  expect(oddWrapper.find('h2').text()).toBe('Test')
  
  // Even index (2) - letter by letter
  const evenWrapper2 = createWrapper({ title: 'Test', index: 2 })
  expect(evenWrapper2.findAll('.letter').length).toBe(4)
  
  // Odd index (3) - simple text
  const oddWrapper2 = createWrapper({ title: 'Test', index: 3 })
  expect(oddWrapper2.find('h2').text()).toBe('Test')
})

test('handles title with multiple spaces', () => {
  const wrapper = createWrapper({ title: 'Word  With   Spaces', index: 0 })
  const words = wrapper.findAll('.word')
  
  // Should handle multiple spaces by creating empty words
  expect(words.length).toBeGreaterThan(3)
})

test('maintains proper structure with long titles', () => {
  const longTitle = 'This is a very long title with many words to test the component'
  const wrapper = createWrapper({ title: longTitle, index: 0 })
  
  const words = wrapper.findAll('.word')
  const expectedWordCount = longTitle.split(' ').length
  expect(words.length).toBe(expectedWordCount)
  
  // Should have spacers
  const spacers = wrapper.findAll('.spacer')
  expect(spacers.length).toBe(expectedWordCount)
})
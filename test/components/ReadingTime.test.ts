import { expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import ReadingTime from '~/components/ReadingTime.vue'

const createWrapper = (props = {}) => {
  const defaultProps = {
    time: 5,
    unit: 'Minuten'
  }

  return mount(ReadingTime, {
    props: { ...defaultProps, ...props }
  })
}

test('renders the component with default props', () => {
  const wrapper = createWrapper()
  expect(wrapper.exists()).toBe(true)
  expect(wrapper.find('.reading-time').exists()).toBe(true)
})

test('displays correct reading time text', () => {
  const wrapper = createWrapper({ time: 3, unit: 'Minuten' })
  const text = wrapper.find('span').text()
  expect(text).toBe('3 Minuten zum Lesen')
})

test('handles singular time unit', () => {
  const wrapper = createWrapper({ time: 1, unit: 'Minute' })
  const text = wrapper.find('span').text()
  expect(text).toBe('1 Minute zum Lesen')
})

test('handles string time values', () => {
  const wrapper = createWrapper({ time: '7', unit: 'Minuten' })
  const text = wrapper.find('span').text()
  expect(text).toBe('7 Minuten zum Lesen')
})

test('renders clock icon', () => {
  const wrapper = createWrapper()
  const svg = wrapper.find('svg')
  expect(svg.exists()).toBe(true)
  expect(svg.attributes('viewBox')).toBe('0 -960 960 960')
})

test('has correct CSS classes and structure', () => {
  const wrapper = createWrapper()
  
  const container = wrapper.find('.reading-time')
  expect(container.exists()).toBe(true)
  expect(container.find('svg').exists()).toBe(true)
  expect(container.find('span').exists()).toBe(true)
})

test('handles zero time', () => {
  const wrapper = createWrapper({ time: 0, unit: 'Minuten' })
  const text = wrapper.find('span').text()
  expect(text).toBe('0 Minuten zum Lesen')
})

test('handles different time units', () => {
  const testCases = [
    { time: 1, unit: 'Sekunde', expected: '1 Sekunde zum Lesen' },
    { time: 30, unit: 'Sekunden', expected: '30 Sekunden zum Lesen' },
    { time: 15, unit: 'Minuten', expected: '15 Minuten zum Lesen' }
  ]

  testCases.forEach(({ time, unit, expected }) => {
    const wrapper = createWrapper({ time, unit })
    expect(wrapper.find('span').text()).toBe(expected)
  })
})

test('maintains component structure with different props', () => {
  const wrapper = createWrapper({ time: 100, unit: 'Stunden' })
  
  // Structure should remain consistent
  expect(wrapper.find('.reading-time').exists()).toBe(true)
  expect(wrapper.find('svg').exists()).toBe(true)
  expect(wrapper.find('span').exists()).toBe(true)
  
  // Content should update
  expect(wrapper.find('span').text()).toBe('100 Stunden zum Lesen')
})
import { describe, it, expect } from 'vitest'
import { useReadingTime } from '~/composables/useReadingTime'

describe('useReadingTime', () => {
  const { calculateBlocksReadingTime, extractTextFromBlocks } = useReadingTime()

  describe('calculateBlocksReadingTime', () => {
    it('returns 1 for null/undefined content', () => {
      expect(calculateBlocksReadingTime(null as any)).toBe(1)
      expect(calculateBlocksReadingTime(undefined as any)).toBe(1)
    })

    it('returns 1 for empty string', () => {
      expect(calculateBlocksReadingTime('')).toBe(1)
    })

    it('returns 1 for empty array', () => {
      expect(calculateBlocksReadingTime([])).toBe(1)
    })

    it('strips HTML tags from string content', () => {
      const html = '<p>Hello world</p>'
      expect(calculateBlocksReadingTime(html)).toBe(1)
    })

    it('calculates reading time for a string with many words', () => {
      // 200 words = 1 min, 201 words = 2 min (default 200 wpm)
      const words = Array(201).fill('word').join(' ')
      expect(calculateBlocksReadingTime(words)).toBe(2)
    })

    it('uses custom wordsPerMinute', () => {
      const words = Array(100).fill('word').join(' ')
      expect(calculateBlocksReadingTime(words, 50)).toBe(2)
    })

    it('calculates reading time for Strapi blocks content', () => {
      const content = [
        {
          type: 'paragraph',
          children: [{ type: 'text', text: Array(200).fill('word').join(' ') }],
        },
      ] as any
      expect(calculateBlocksReadingTime(content)).toBe(1)
    })

    it('returns minimum 1 for very short content', () => {
      const content = [
        { type: 'paragraph', children: [{ type: 'text', text: 'Hi' }] },
      ] as any
      expect(calculateBlocksReadingTime(content)).toBe(1)
    })
  })

  describe('extractTextFromBlocks', () => {
    it('returns empty string for null/undefined', () => {
      expect(extractTextFromBlocks(null as any)).toBe('')
      expect(extractTextFromBlocks(undefined as any)).toBe('')
    })

    it('extracts text from paragraph blocks', () => {
      const blocks = [
        {
          type: 'paragraph',
          children: [
            { type: 'text', text: 'Hello' },
            { type: 'text', text: 'world' },
          ],
        },
      ] as any
      expect(extractTextFromBlocks(blocks)).toContain('Hello')
      expect(extractTextFromBlocks(blocks)).toContain('world')
    })

    it('extracts text from heading blocks', () => {
      const blocks = [
        {
          type: 'heading',
          children: [{ type: 'text', text: 'My Heading' }],
        },
      ] as any
      expect(extractTextFromBlocks(blocks)).toContain('My Heading')
    })

    it('extracts text from list items', () => {
      const blocks = [
        {
          type: 'list',
          children: [
            { children: [{ type: 'text', text: 'Item one' }] },
            { children: [{ type: 'text', text: 'Item two' }] },
          ],
        },
      ] as any
      const result = extractTextFromBlocks(blocks)
      expect(result).toContain('Item one')
      expect(result).toContain('Item two')
    })

    it('returns empty string for image blocks', () => {
      const blocks = [{ type: 'image', url: 'test.jpg' }] as any
      expect(extractTextFromBlocks(blocks).trim()).toBe('')
    })

    it('extracts text from code blocks', () => {
      const blocks = [
        {
          type: 'code',
          children: [{ type: 'text', text: 'const x = 1' }],
        },
      ] as any
      expect(extractTextFromBlocks(blocks)).toContain('const x = 1')
    })
  })
})

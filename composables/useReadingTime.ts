import type { BlocksContent } from 'vue-strapi-blocks-renderer'

// Extract text from Strapi Blocks format
const extractTextFromBlocks = (blocks: BlocksContent): string => {
  if (!blocks || !Array.isArray(blocks)) return ''

  const extractTextFromChildren = (children: any[]): string => {
    if (!children || !Array.isArray(children)) return ''

    return children
      .map((child) => {
        if (child.type === 'text') {
          return child.text || ''
        }
        // Handle nested children (like in list items)
        if (child.children && Array.isArray(child.children)) {
          return extractTextFromChildren(child.children)
        }
        return ''
      })
      .join(' ')
  }

  return blocks
    .map((block) => {
      switch (block.type) {
        case 'paragraph':
        case 'heading':
        case 'quote':
          return extractTextFromChildren(block.children || [])

        case 'list':
          // Handle list items
          if (block.children && Array.isArray(block.children)) {
            return block.children
              .map((listItem) =>
                extractTextFromChildren(listItem.children || [])
              )
              .join(' ')
          }
          return ''

        case 'code':
          // Code blocks - count the code content
          return block.children ? extractTextFromChildren(block.children) : ''

        case 'image':
          // Images don't contribute to reading time, but alt text might
          return ''

        default:
          // Handle any other block types that might have children
          if (block.children && Array.isArray(block.children)) {
            return extractTextFromChildren(block.children)
          }
          return ''
      }
    })
    .join(' ')
}

// Alternative: Create a composable for reusability
export const useReadingTime = () => {
  const calculateBlocksReadingTime = (
    content: BlocksContent | string,
    wordsPerMinute = 200
  ): number => {
    if (!content) return 1

    let text = ''

    if (typeof content === 'string') {
      // Handle HTML string format
      text = content.replace(/<[^>]*>/g, '').trim()
    } else if (Array.isArray(content)) {
      // Handle Strapi Blocks format
      text = extractTextFromBlocks(content)
    }

    const words = text.split(/\s+/).filter((word) => word.length > 0).length
    return Math.max(1, Math.ceil(words / wordsPerMinute))
  }

  return {
    calculateBlocksReadingTime,
    extractTextFromBlocks,
  }
}

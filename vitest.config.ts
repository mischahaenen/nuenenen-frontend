import { resolve } from 'path'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: [
        'components/**/*.vue',
        'composables/**/*.{js,ts}',
        'pages/**/*.vue'
      ],
      exclude: [
        'composables/examples/**',
        'node_modules/**',
        'test/**',
        '**/*.test.{js,ts}',
        '**/*.spec.{js,ts}'
      ]
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '.'),
      '~': resolve(__dirname, '.'),
      '#': resolve(__dirname, '.nuxt')
    }
  }
})
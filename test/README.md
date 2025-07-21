# Testing Guide

This guide covers the testing setup and best practices for the Nuenenen Frontend project.

## Testing Stack

- **Vitest**: Main testing framework - fast, modern alternative to Jest
- **Vue Test Utils**: Vue.js component testing utilities
- **Happy DOM**: Fast DOM implementation for testing
- **TypeScript**: Type-safe test development
- **V8 Coverage**: Code coverage reporting

## Project Structure

```
test/
├── components/           # Component unit tests
├── composables/         # Composable function tests
├── integration/         # Integration tests
├── utils/              # Test utilities and helpers
├── setup.ts            # Global test setup
└── README.md           # This file
```

## Running Tests

### Available Scripts

```bash
# Run all tests
npm run test

# Run tests in watch mode  
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Additional Scripts

You can add these additional scripts to your `package.json`:

```json
{
  "scripts": {
    "test:unit": "vitest run test/components test/composables",
    "test:integration": "vitest run test/integration",
    "test:ui": "vitest --ui"
  }
}
```

## Writing Tests

### Component Tests

Component tests should be placed in `test/components/` and follow the naming convention `ComponentName.test.ts`.

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createTestWrapper } from '../utils/test-utils'
import MyComponent from '~/components/MyComponent.vue'

describe('MyComponent', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders correctly', () => {
    const wrapper = createTestWrapper(MyComponent, {
      props: {
        title: 'Test Title'
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('Test Title')
  })
})
```

### Composable Tests

Test composables in `test/composables/` directory:

```typescript
import { describe, it, expect, vi } from 'vitest'

// Mock the composable
vi.mock('~/composables/useMyComposable', () => ({
  useMyComposable: vi.fn()
}))

describe('useMyComposable', () => {
  it('should return expected values', () => {
    const mockReturn = { data: ref(null), loading: ref(false) }
    vi.mocked(useMyComposable).mockReturnValue(mockReturn)
    
    const result = useMyComposable()
    expect(result.data.value).toBe(null)
    expect(result.loading.value).toBe(false)
  })
})
```

### Integration Tests

Integration tests should focus on user workflows and component interactions:

```typescript
import { describe, it, expect } from 'vitest'
import { createTestWrapper } from '../utils/test-utils'

describe('User Flow: Contact Form', () => {
  it('should submit form successfully', async () => {
    const wrapper = createTestWrapper(ContactPage)
    
    // Fill form
    await wrapper.find('input[name="name"]').setValue('John Doe')
    await wrapper.find('input[name="email"]').setValue('john@example.com')
    
    // Submit
    await wrapper.find('form').trigger('submit')
    
    // Assert success state
    expect(wrapper.text()).toContain('Message sent successfully')
  })
})
```

## Test Utilities

### `createTestWrapper`

Helper function for creating Vue component wrappers with common setup:

```typescript
import { createTestWrapper } from '../utils/test-utils'

const wrapper = createTestWrapper(Component, {
  props: { /* component props */ },
  global: {
    mocks: { /* global mocks */ },
    stubs: { /* component stubs */ }
  }
})
```

### Mock Data Helpers

Use provided mock data helpers for consistent test data:

```typescript
import { 
  createMockStepData, 
  createMockStepZone, 
  createMockApiResponse 
} from '../utils/test-utils'

const mockStep = createMockStepData()
const mockZone = createMockStepZone()
```

## Mocking Guidelines

### Nuxt Composables

All Nuxt composables are globally mocked in `test/setup.ts`. Override them in individual tests:

```typescript
const wrapper = createTestWrapper(Component, {
  global: {
    mocks: {
      useAsyncData: vi.fn().mockResolvedValue({
        data: ref(mockData),
        error: ref(null)
      })
    }
  }
})
```

### API Calls

Mock API modules at the top of test files:

```typescript
vi.mock('~/composables/api/modules/blog', () => ({
  useBlogApi: () => ({
    getBlogPost: vi.fn().mockResolvedValue({ data: mockPost })
  })
}))
```

### External Libraries

Mock external libraries that aren't needed for testing:

```typescript
vi.mock('vue-recaptcha-v3', () => ({
  useRecaptcha: () => ({ executeRecaptcha: vi.fn() })
}))
```

## Best Practices

### 1. Test Structure

- Use `describe` blocks to group related tests
- Use `beforeEach` to set up common test data
- Use clear, descriptive test names

### 2. What to Test

**✅ Do Test:**
- Component rendering with different props
- User interactions (clicks, form submissions)
- Conditional rendering logic
- Computed properties
- Event emissions
- API error handling

**❌ Don't Test:**
- Implementation details
- Third-party library functionality
- CSS styling (unless critical to functionality)

### 3. Mock Strategy

- Mock external dependencies
- Keep mocks simple and focused
- Reset mocks between tests using `beforeEach`
- Use realistic mock data

### 4. Assertions

- Test user-visible behavior, not implementation
- Use semantic queries when possible
- Assert on multiple aspects when relevant

### 5. Test Data

- Create reusable mock data factories
- Use realistic but minimal data
- Avoid hardcoded values in multiple places

## Common Patterns

### Testing Async Operations

```typescript
it('handles async data loading', async () => {
  const mockAsyncData = vi.fn().mockResolvedValue({
    data: ref(mockData),
    pending: ref(false),
    error: ref(null)
  })
  
  const wrapper = createTestWrapper(Component, {
    global: { mocks: { useAsyncData: mockAsyncData } }
  })
  
  await wrapper.vm.$nextTick()
  expect(wrapper.text()).toContain('Expected content')
})
```

### Testing Form Validation

```typescript
it('validates form inputs', async () => {
  const wrapper = createTestWrapper(ContactForm)
  
  const emailInput = wrapper.find('input[type="email"]')
  await emailInput.setValue('invalid-email')
  await wrapper.find('form').trigger('submit')
  
  expect(wrapper.text()).toContain('Please enter a valid email')
})
```

### Testing Error States

```typescript
it('displays error message on API failure', async () => {
  vi.mocked(useAsyncData).mockResolvedValue({
    data: ref(null),
    error: ref(new Error('API Error')),
    pending: ref(false)
  })
  
  const wrapper = createTestWrapper(Component)
  expect(wrapper.text()).toContain('Something went wrong')
})
```

## Troubleshooting

### Common Issues

1. **"Cannot find module" errors**: Ensure all imports use the correct path aliases (`~/`, `@/`)

2. **Vue component not rendering**: Check that all dependencies are properly mocked

3. **Async tests failing**: Use `await wrapper.vm.$nextTick()` or `await waitForAsyncData(wrapper)`

4. **Mock not working**: Ensure mocks are set up before importing the component

### Debug Tips

- Use `console.log(wrapper.html())` to inspect rendered output
- Use `wrapper.findAll()` to see what elements are available
- Check mock function calls with `expect(mockFn).toHaveBeenCalledWith()`

## Coverage Goals

- **Components**: 80%+ line coverage
- **Composables**: 90%+ line coverage  
- **Critical user flows**: 100% path coverage

Run coverage reports with:
```bash
npm run test:coverage
```

Coverage reports are generated in the `coverage/` directory.

## Current Test Status

### ✅ Working Test Files (34 tests passing):
- **StepsComponent.test.ts** - Component structure and props
- **BaseColorSwitch.test.ts** - Color mode switching functionality  
- **ReadingTime.test.ts** - Reading time display component
- **TitleComponent.test.ts** - Title rendering with letter animations
- **BaseBanner.test.ts** - Banner component (with prop warnings)
- **useContactForm.test.ts** - Contact form validation and submission

### ⚠️ Tests Needing Fixes (70 tests failing):
- **PostComponent.test.ts** - useReadingTime composable mocking
- **blog.test.ts** - Async component setup with useAsyncData
- **navigation.test.ts** - Navigation state and routing

### Common Issues to Fix:
1. **Composable Mocking**: Some composables need better mock implementations
2. **Async Components**: Components using `useAsyncData` need Suspense wrapper
3. **Missing Props**: Some components have required props not defined in tests
4. **Global Mocks**: Additional Nuxt composables need global mocking

The testing framework is fully functional with modern Vitest syntax.
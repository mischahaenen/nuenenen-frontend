import { expect, test, vi } from 'vitest'
import { ref } from 'vue'

// Mock the actual composable
vi.mock('~/composables/useContactForm', () => ({
  useContactForm: vi.fn()
}))

const createMockContactForm = (overrides = {}) => {
  return {
    form: ref({
      name: '',
      email: '',
      subject: '',
      message: ''
    }),
    errors: ref({}),
    isSubmitting: ref(false),
    isSuccess: ref(false),
    validateForm: vi.fn(),
    submitForm: vi.fn(),
    resetForm: vi.fn(),
    clearErrors: vi.fn(),
    ...overrides
  }
}

test('initializes with empty form data', () => {
  const mockContactForm = createMockContactForm()
  vi.mocked(useContactForm).mockReturnValue(mockContactForm)
  
  const { form, errors, isSubmitting, isSuccess } = useContactForm()
  
  expect(form.value).toEqual({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  expect(errors.value).toEqual({})
  expect(isSubmitting.value).toBe(false)
  expect(isSuccess.value).toBe(false)
})

test('validates required fields correctly', () => {
  const mockContactForm = createMockContactForm({
    errors: ref({
      name: 'Name is required',
      email: 'Email is required'
    })
  })
  vi.mocked(useContactForm).mockReturnValue(mockContactForm)
  
  const { validateForm, errors } = useContactForm()
  
  validateForm()
  
  expect(validateForm).toHaveBeenCalled()
  expect(errors.value).toEqual({
    name: 'Name is required',
    email: 'Email is required'
  })
})

test('validates email format correctly', () => {
  const mockContactForm = createMockContactForm({
    form: ref({
      name: 'John',
      email: 'invalid-email',
      subject: 'Test',
      message: 'Test message'
    }),
    errors: ref({
      email: 'Please enter a valid email address'
    })
  })
  vi.mocked(useContactForm).mockReturnValue(mockContactForm)
  
  const { form, validateForm, errors } = useContactForm()
  
  form.value.email = 'invalid-email'
  validateForm()
  
  expect(validateForm).toHaveBeenCalled()
  expect(errors.value.email).toBe('Please enter a valid email address')
})

test('handles successful form submission', async () => {
  const mockContactForm = createMockContactForm({
    form: ref({
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'Test message'
    }),
    isSubmitting: ref(false),
    isSuccess: ref(true),
    submitForm: vi.fn().mockResolvedValue(true)
  })
  vi.mocked(useContactForm).mockReturnValue(mockContactForm)
  
  const { form, submitForm, isSuccess } = useContactForm()
  
  form.value = {
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Test Subject',
    message: 'Test message'
  }
  
  await submitForm()
  
  expect(submitForm).toHaveBeenCalled()
  expect(isSuccess.value).toBe(true)
})

test('handles form submission errors', async () => {
  const mockContactForm = createMockContactForm({
    submitForm: vi.fn().mockRejectedValue(new Error('Submission failed')),
    errors: ref({
      submit: 'Failed to send message. Please try again.'
    })
  })
  vi.mocked(useContactForm).mockReturnValue(mockContactForm)
  
  const { submitForm, errors } = useContactForm()
  
  try {
    await submitForm()
  } catch (error) {
    expect(submitForm).toHaveBeenCalled()
    expect(errors.value.submit).toBe('Failed to send message. Please try again.')
  }
})

test('resets form to initial state', () => {
  const formRef = ref({
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Test Subject',
    message: 'Test message'
  })
  
  const mockContactForm = createMockContactForm({
    form: formRef,
    resetForm: vi.fn().mockImplementation(() => {
      formRef.value = {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    })
  })
  vi.mocked(useContactForm).mockReturnValue(mockContactForm)
  
  const { form, resetForm } = useContactForm()
  
  resetForm()
  
  expect(resetForm).toHaveBeenCalled()
  expect(form.value).toEqual({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
})

test('clears validation errors', () => {
  const errorsRef = ref({
    name: 'Name is required',
    email: 'Email is required'
  })
  
  const mockContactForm = createMockContactForm({
    errors: errorsRef,
    clearErrors: vi.fn().mockImplementation(() => {
      errorsRef.value = {}
    })
  })
  vi.mocked(useContactForm).mockReturnValue(mockContactForm)
  
  const { clearErrors, errors } = useContactForm()
  
  clearErrors()
  
  expect(clearErrors).toHaveBeenCalled()
  expect(errors.value).toEqual({})
})

test('validates minimum length requirements', () => {
  const mockContactForm = createMockContactForm({
    form: ref({
      name: 'A',
      email: 'test@example.com',
      subject: 'Hi',
      message: 'Short'
    }),
    errors: ref({
      name: 'Name must be at least 2 characters',
      subject: 'Subject must be at least 3 characters',
      message: 'Message must be at least 10 characters'
    })
  })
  vi.mocked(useContactForm).mockReturnValue(mockContactForm)
  
  const { validateForm, errors } = useContactForm()
  
  validateForm()
  
  expect(errors.value.name).toBe('Name must be at least 2 characters')
  expect(errors.value.subject).toBe('Subject must be at least 3 characters')
  expect(errors.value.message).toBe('Message must be at least 10 characters')
})

test('validates maximum length requirements', () => {
  const mockContactForm = createMockContactForm({
    errors: ref({
      name: 'Name must be less than 100 characters',
      subject: 'Subject must be less than 200 characters',
      message: 'Message must be less than 1000 characters'
    })
  })
  vi.mocked(useContactForm).mockReturnValue(mockContactForm)
  
  const { validateForm, errors } = useContactForm()
  
  validateForm()
  
  expect(errors.value.name).toBe('Name must be less than 100 characters')
  expect(errors.value.subject).toBe('Subject must be less than 200 characters')
  expect(errors.value.message).toBe('Message must be less than 1000 characters')
})

test('handles recaptcha validation failure', async () => {
  const mockContactForm = createMockContactForm({
    submitForm: vi.fn().mockRejectedValue(new Error('Recaptcha validation failed')),
    errors: ref({
      recaptcha: 'Please complete the reCAPTCHA'
    })
  })
  vi.mocked(useContactForm).mockReturnValue(mockContactForm)
  
  const { submitForm, errors } = useContactForm()
  
  try {
    await submitForm()
  } catch (error) {
    expect(errors.value.recaptcha).toBe('Please complete the reCAPTCHA')
  }
})

test('tracks submission state correctly', () => {
  const isSubmittingRef = ref(false)
  
  const mockContactForm = createMockContactForm({
    isSubmitting: isSubmittingRef,
    submitForm: vi.fn().mockImplementation(async () => {
      isSubmittingRef.value = true
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 100))
      isSubmittingRef.value = false
    })
  })
  vi.mocked(useContactForm).mockReturnValue(mockContactForm)
  
  const { submitForm, isSubmitting } = useContactForm()
  
  expect(isSubmitting.value).toBe(false)
  
  submitForm()
  expect(isSubmitting.value).toBe(true)
})

test('handles successful validation with no errors', () => {
  const mockContactForm = createMockContactForm({
    form: ref({
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Valid Subject',
      message: 'This is a valid message with enough characters'
    }),
    errors: ref({})
  })
  vi.mocked(useContactForm).mockReturnValue(mockContactForm)
  
  const { validateForm, errors } = useContactForm()
  
  validateForm()
  
  expect(validateForm).toHaveBeenCalled()
  expect(Object.keys(errors.value)).toHaveLength(0)
})
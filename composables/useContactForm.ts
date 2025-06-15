import { ref, computed } from 'vue'

export interface ContactFormData {
  Firstname: string
  Lastname: string
  Email: string
  'Phone Number': string
  Message: string
  step?: string
}

export type MailState = 'UNKNOWN' | 'SENDING' | 'SUCCESS' | 'ERROR'

export function useContactForm() {
  const mailState = ref<MailState>('UNKNOWN')
  const errorMessage = ref<string>('')
  
  const form = ref<ContactFormData>({
    Firstname: '',
    Lastname: '',
    Email: '',
    'Phone Number': '',
    Message: '',
  })

  const isFormValid = computed(() => {
    return form.value.Firstname.trim() && 
           form.value.Lastname.trim() && 
           form.value.Email.trim() && 
           isValidEmail(form.value.Email)
  })

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const resetForm = () => {
    form.value = {
      Firstname: '',
      Lastname: '',
      Email: '',
      'Phone Number': '',
      Message: '',
    }
    mailState.value = 'UNKNOWN'
    errorMessage.value = ''
  }

  const submitForm = async () => {
    if (!isFormValid.value) {
      errorMessage.value = 'Please fill in all required fields with valid information.'
      return
    }

    try {
      mailState.value = 'SENDING'
      errorMessage.value = ''

      const response = await $fetch('/api/contact', {
        method: 'POST',
        body: form.value,
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response) {
        mailState.value = 'SUCCESS'
        // Reset form after successful submission
        setTimeout(() => {
          resetForm()
        }, 3000)
      }
    } catch (error: any) {
      console.error('Contact form error:', error)
      mailState.value = 'ERROR'
      errorMessage.value = error?.data?.message || 'Failed to send message. Please try again.'
    }
  }

  const getStateMessage = (state: MailState): string => {
    switch (state) {
      case 'SENDING':
        return 'Sending your message...'
      case 'SUCCESS':
        return 'Thank you! Your message has been sent successfully.'
      case 'ERROR':
        return errorMessage.value || 'An error occurred. Please try again.'
      default:
        return ''
    }
  }

  return {
    form,
    mailState,
    errorMessage,
    isFormValid,
    isValidEmail,
    submitForm,
    resetForm,
    getStateMessage
  }
}
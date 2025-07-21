import qs from 'qs'
export const getBaseUrl = () => {
  const config = useRuntimeConfig()
  return config.public.strapiUrl
}

export const fetchOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
}

export const fetchFromApi = async <T>(
  endpoint: string,
  options: any = {}
): Promise<T> => {
  try {
    const BASE_URL = getBaseUrl()
    return await $fetch<T>(`${BASE_URL}/api/${endpoint}`, {
      ...fetchOptions,
      ...options,
      retry: 2,
      timeout: 10000,
      onRequestError({ error }) {
        console.error(`Request failed for ${endpoint}:`, error)
      },
      onResponseError({ response }) {
        console.error(
          `Response error for ${endpoint}:`,
          response.status,
          response.statusText
        )
      },
    })
  } catch (error: any) {
    // Enhanced error handling with user-friendly messages
    const apiError = createError({
      statusCode: error?.response?.status || error?.statusCode || 500,
      statusMessage: getErrorMessage(error, endpoint),
      data: {
        originalError: error,
        endpoint,
        timestamp: new Date().toISOString(),
      },
    })

    // Log detailed error for debugging (only in development)
    if (process.dev) {
      console.error(`API Error for ${endpoint}:`, {
        status: apiError.statusCode,
        message: apiError.statusMessage,
        originalError: error,
      })
    }

    throw apiError
  }
}

function getErrorMessage(error: any, endpoint: string): string {
  const status = error?.response?.status || error?.statusCode

  switch (status) {
    case 400:
      return `Invalid request to ${endpoint}`
    case 401:
      return 'Authentication required'
    case 403:
      return 'Access denied'
    case 404:
      return `Content not found: ${endpoint}`
    case 429:
      return 'Too many requests. Please try again later.'
    case 500:
      return 'Server error. Please try again later.'
    case 503:
      return 'Service temporarily unavailable'
    default:
      if (error?.name === 'FetchError' && error?.message?.includes('fetch')) {
        return 'Network connection error. Please check your internet connection.'
      }
      return `Failed to load content from ${endpoint}`
  }
}

export const createQuery = (options: any) => {
  return qs.stringify(options, { encode: false })
}

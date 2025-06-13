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

export const fetchFromApi = <T>(
  endpoint: string,
  options: any = {}
): Promise<T> => {
  try {
    const BASE_URL = getBaseUrl()
    return $fetch<T>(`${BASE_URL}/api/${endpoint}`, {
      ...fetchOptions,
      ...options,
    })
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error)
    throw error
  }
}

export const createQuery = (options: any) => {
  return qs.stringify(options, { encode: false })
}

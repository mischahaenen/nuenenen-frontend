import type { ContactSender } from '~/types/contact-sender'
import { fetchFromApi, fetchOptions } from '../core/client'

export const useContactApi = () => {
  const createContactEntry = async (
    token: string | undefined,
    formData: any
  ) => {
    return await fetchFromApi<any>('contacts', {
      method: 'POST',
      body: formData,
      headers: {
        ...fetchOptions.headers,
        Authorization: `Bearer ${token}`,
      },
    })
  }

  const getContactDistributionList = async () => {
    return await fetchFromApi<ContactSender>('contact-distribution-lists', {
      params: {
        populate: '*',
      },
    })
  }

  return {
    createContactEntry,
    getContactDistributionList,
  }
}

import { fetchFromApi, fetchOptions } from '../core/client'
import type { ContactSenderResponse } from '~/types/contact-sender'

export const useContactApi = () => {
  const createContactEntry = async (
    token: string | undefined,
    formData: any
  ) => {
    return await fetchFromApi<any>('contacts', {
      method: 'POST',
      body: {
        data: {
          formData,
          token,
        },
      },
      headers: {
        ...fetchOptions.headers,
      },
    })
  }

  const getContactDistributionList = async () => {
    return await fetchFromApi<ContactSenderResponse>(
      'contact-distribution-lists',
      {
        params: {
          populate: '*',
        },
      }
    )
  }

  return {
    createContactEntry,
    getContactDistributionList,
  }
}

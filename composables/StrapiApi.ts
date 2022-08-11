
import qs from 'qs'
export const getPage = (title: string) => {
    const { find } = useStrapi4()
    return find<Strapi4Response>('pages', {
      populate: '*',
      filters: {"Title": {$eq: title}}
    })
}
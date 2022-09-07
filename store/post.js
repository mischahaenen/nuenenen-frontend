import { defineStore } from 'pinia'

export const usePostStore = defineStore({
  id: 'post-store',
  state: () => {
    return {
      posts: [],
    }
  },
  actions: {
    async fetchAllPosts() {
      const posts = await getBlogPosts()
      this.posts = posts
    },
    async filterPostsByStep(step) {
      const posts = await getBlogPostsByStep(step)
      this.posts = posts
    },
    async fetchPost() {
      /* const post = await getBlogPost(id)
      this.posts = [post] */
    },
  },
  getters: {
    postList: (state) => state.posts,
  },
})

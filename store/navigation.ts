import { defineStore } from 'pinia'

export const useNavigationStore = defineStore({
  id: 'nav-store',
  state: () => ({
    expanded: false,
    pages: [] as Page[],
    openSubmenu: null as Page | null,
  }),
  actions: {
    toggle() {
      this.expanded = !this.expanded
    },
    close() {
      this.expanded = false
    },
    setNavigation(pages: Page[]) {
      this.pages = pages
    },
    hasSubMenu(page: Page | undefined) {
      if (!page) return false
      return page.attributes.pageZone.some(
        (zone) => zone.__component === 'pages.steps'
      )
    },
    toggleSubMenu(page: Page) {
      if (this.openSubmenu?.id === page.id) {
        this.openSubmenu = null
      } else {
        this.openSubmenu = page
      }
    },
    openSubMenu(page: Page | null) {
      this.openSubmenu = page
    },
    closeSubMenu() {
      this.openSubmenu = null
    },
  },
  getters: {
    isExpanded: (state) => state.expanded,
    closed: (state) => !state.expanded,
    isSubmenuOpen: (state) => (page: Page) => state.openSubmenu?.id === page.id,
  },
})

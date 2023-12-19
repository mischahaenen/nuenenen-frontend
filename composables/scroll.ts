export function useScrollY() {
  const scroll = useState(() => 0)
  onMounted(() => {
    window.addEventListener('scroll', () => {
      scroll.value = window.scrollY
    })
  })
  onUnmounted(() => {
    window.removeEventListener('scroll', () => {
      scroll.value = window.scrollY
    })
  })
  return scroll
}

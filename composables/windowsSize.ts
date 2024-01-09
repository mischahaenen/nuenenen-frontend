export function useWindowSize() {
  const windowWidth = useState(() => window.innerWidth)
  const windowHeight = useState(() => window.innerHeight)

  function updateWindowSize() {
    windowWidth.value = window.innerWidth
    windowHeight.value = window.innerHeight
  }

  onMounted(() => {
    window.addEventListener('resize', updateWindowSize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateWindowSize)
  })

  return { windowWidth, windowHeight }
}

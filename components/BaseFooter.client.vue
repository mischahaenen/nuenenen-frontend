<template>
  <footer v-if="footer">
    <nuxt-img src="/svg/gantrisch.svg" format="svg"></nuxt-img>
    <div class="footer-content">
      <div>
        <h2>{{ footer.Title }}</h2>
        <ul>
          <li v-for="link of footer.Links" :key="link.Link">
            <a :href="link.Link">{{ link.Name }}</a>
          </li>
        </ul>
      </div>
      <div>
        <h2>{{ modeHeader }}</h2>
        <BaseColorSwitch></BaseColorSwitch>
      </div>
      <div class="sponsorLogo">
        <h2>Sponsoren</h2>
        <nuxt-img
          v-for="image of footer.Images.data"
          :key="image.attributes.name"
          :src="image.attributes.url"
          :alt="image.attributes.name"
        />
      </div>
    </div>
  </footer>
</template>

<script setup>
const colorMode = useColorMode()
const footerRes = await getFooter()
const footer = footerRes.data.attributes || null
const modeHeader = computed(() => {
  return colorMode.value === 'dark'
    ? 'Hell-Modus gefällig?'
    : 'Dunkel-Modus gefällig?'
})

onMounted(() => {
  let _paq = (window._paq = window._paq || [])
  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  _paq.push(['trackPageView'])
  _paq.push(['enableLinkTracking'])
  ;(function () {
    let u = 'https://stat.pfadi-nuenenen.ch/'
    _paq.push(['setTrackerUrl', u + 'matomo.php'])
    _paq.push(['setSiteId', '1'])
    let d = document,
      g = d.createElement('script'),
      s = d.getElementsByTagName('script')[0]
    g.async = true
    g.src = u + 'matomo.js'
    s.parentNode.insertBefore(g, s)
  })()
})
</script>

<style scoped lang="scss">
a,
ul,
li {
  text-decoration: none;
  list-style-type: none;
  padding-left: 0;
}

a:hover {
  text-decoration: underline;
}

footer {
  margin-top: var(--space-extra-large);
  display: flex;
  flex-direction: column;
}

.footer-content {
  background-color: var(--color-primary-50);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--space-large);
  padding: var(--space-large);
}

.sponsorLogo {
  display: flex;
  flex-direction: column;
  gap: var(--space-small);
  img {
    width: 300px;
    height: auto;
  }
}
.woods {
  fill: var(--color-primary-50);
}
.dark-mode {
  .footer-content {
    background-color: var(--color-primary-800);
  }
  .woods {
    fill: var(--color-primary-800);
  }
}
</style>

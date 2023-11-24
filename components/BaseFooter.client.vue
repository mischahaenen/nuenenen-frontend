<template>
  <footer v-if="footer">
    <NuxtImg
      class="mountains"
      :src="`/svg/gantrisch_${
        colorMode.value === 'dark' ? 'dark' : 'white'
      }.svg`"
      :alt="`Berge in ${colorMode.value === 'dark' ? 'Dunkel' : 'Hell'}`"
    ></NuxtImg>
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

.dark-mode {
  .footer-content {
    background-color: var(--color-primary-700);
  }
}
</style>

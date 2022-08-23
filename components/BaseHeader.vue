<template>
  <header class="header" :class="{ 'header-scrolled': useScrollY > 50 }">
    <div class="container">
      <div>
        <nuxt-link
          to="/"
          :class="useScrollY > 50 ? 'home-link-scrolled' : 'home-link'"
        >
          <b>PFADI</b> NÜNENEN
        </nuxt-link>
      </div>
      <nav class="nav">
        <nuxt-link to="/">Home</nuxt-link>
        <nuxt-link to="/abteilung">Abteilung</nuxt-link>
        <nuxt-link to="/mitmachen">Mitmachen</nuxt-link>
        <nuxt-link to="/shop">Shop</nuxt-link>
      </nav>
    </div>
  </header>
</template>

<script lang="ts" setup>
// add class on scroll
const useScrollY = useState<number>('scrollPosition', () => 0)
if (process.client) {
  window.addEventListener('scroll', () => {
    useScrollY.value = window.scrollY
  })
}
</script>

<style scoped>
.header {
  position: fixed;
  width: 100%;
  top: 0;
  height: 6rem;
  z-index: 10;
}

.header-scrolled {
  background-color: var(--color-primary);
  height: 4rem;
  color: var(--color-white);
  transition: background-color 0.3s ease;
  transition: height 0.3s ease;
  box-shadow: 0 2px 4px #0000001a;
}

.header > .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.home-link {
  text-decoration: none;
  color: var(--color-black);
  word-spacing: 0.2rem;
  letter-spacing: 0.05rem;
}

.home-link b {
  color: var(--color-primary);
}

.home-link-scrolled {
  text-decoration: none;
  color: var(--color-white);
  word-spacing: 0.2rem;
  letter-spacing: 0.05rem;
}

.home-link-scrolled b {
  color: var(--color-white);
}

.nav > * {
  color: var(--color-white);
  text-decoration: none;
  margin-top: 4px;
  margin-right: 4rem;
  padding-bottom: 4px;
}

.nav > *:last-of-type {
  margin: 0;
}

.nav > .router-link-active {
  font-weight: bold;
}
</style>

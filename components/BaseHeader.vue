<template>
  <header class="header" :class="{ 'header-scrolled': scroll > 50 }">
    <div>
      <nuxt-link
        to="/"
        :class="scroll > 50 ? 'home-link-scrolled' : 'home-link'"
      >
        <b>PFADI</b> NÜNENEN
      </nuxt-link>
    </div>
    <nav class="nav">
      <nuxt-link to="/home">Home</nuxt-link>
      <nuxt-link to="/abteilung">Abteilung</nuxt-link>
      <nuxt-link to="/mitmachen">Mitmachen</nuxt-link>
      <nuxt-link to="/shop">Shop</nuxt-link>
    </nav>
  </header>
</template>

<script lang="ts" setup>
// add class on scroll
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const scroll = useScrollY()
</script>

<style scoped>
.header {
  padding: 0 var(--space-large);
  position: fixed;
  width: 100%;
  top: 0;
  height: 6rem;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-scrolled {
  background-color: var(--color-white);
  height: 4rem;
  color: var(--color-black);
  transition: background-color 0.3s ease;
  transition: height 0.3s ease;
  box-shadow: 0 2px 4px #0000001a;
}

.home-link {
  text-decoration: none;
  color: var(--color-black);
  word-spacing: 0.2rem;
  letter-spacing: 0.05rem;
}

.home-link b {
  color: var(--color-primary-500);
}

.home-link-scrolled {
  text-decoration: none;
  color: var(--color-black);
  word-spacing: 0.2rem;
  letter-spacing: 0.05rem;
}

.home-link-scrolled b {
  color: var(--color-primary-500);
}

.nav > * {
  color: var(--color-black);
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

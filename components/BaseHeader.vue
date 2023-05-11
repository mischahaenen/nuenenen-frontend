<template>
  <header class="header" :class="{ 'header-scrolled': scroll > 50 }">
    <div>
      <nuxt-link
        to="/home"
        :class="scroll > 50 ? 'home-link-scrolled' : 'home-link'"
      >
        <p><b>PFADI</b> NÜNENEN</p>
      </nuxt-link>
    </div>
    <nav class="nav">
      <nuxt-link to="/home">Home</nuxt-link>
      <nuxt-link to="/abteilung">Abteilung</nuxt-link>
      <nuxt-link to="/mitmachen">Mitmachen</nuxt-link>
      <nuxt-link class="link-button" to="/kontakt">Kontakt</nuxt-link>
    </nav>
  </header>
</template>

<script lang="ts" setup>
// add class on scroll
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const scroll = useScrollY()
</script>

<style scoped lang="scss">
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

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
}

.nav > * {
  color: var(--color-black);
  text-decoration: none;
}

.nav > *:last-of-type {
  margin: 0;
}

.nav > .router-link-active {
  font-weight: bold;
}
.dark-mode {
  .nav > * {
    color: var(--color-white);
  }
  .header-scrolled {
    background-color: var(--color-primary-800);
    color: var(--color-white);
  }
  .home-link {
    p {
      color: var(--color-white);
    }
  }

  .home-link b {
    color: var(--color-accent-100);
  }
  .home-link-scrolled {
    p {
      color: var(--color-white);
    }
    b {
      color: var(--color-accent-100);
    }
  }
}
</style>

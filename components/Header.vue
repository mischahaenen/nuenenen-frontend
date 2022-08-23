<template>
  <header class="header">
    <div class="container">
      <div class="left">
        <nuxt-link to="/" class="home-link"> <b>Pfadi</b> Nünenen </nuxt-link>
      </div>
      <nav class="nav right">
        <nuxt-link class="nav__link" to="/">Home</nuxt-link>
        <nuxt-link class="nav__link" to="/abteilung">Abteilung</nuxt-link>
        <nuxt-link class="nav__link" to="/mitmachen">Mitmachen</nuxt-link>
        <nuxt-link class="nav__link" to="/shop">Shop</nuxt-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent',
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

.header > .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.home-link {
  text-decoration: none;
}

.nav > * {
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  margin-top: 4px;
  margin-right: 2rem;
  padding-bottom: 4px;
  border-bottom: 1px solid;
  border-color: transparent;
  transition: border 0.15s;
}

.nav > *:last-of-type {
  margin: 0;
}

.nav > *:hover {
  border-color: inherit;
}

.nav > .active {
  border-color: inherit;
}
</style>

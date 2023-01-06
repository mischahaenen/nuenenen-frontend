<template>
  <footer>
    <img src="../assets/svg/woods.svg" alt="woods with birds" />
    <div class="footer-content">
      <div>
        <h2>Meistbesuchte Seiten</h2>
        <ul>
          <li>
            <nuxt-link to="/home">Home</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/abteilung">Abteilung</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/mitmachen">Mitmachen</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/shop">Shop</nuxt-link>
          </li>
        </ul>
      </div>
      <div>
        <h2>Kontakt</h2>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup></script>
<style scoped lang="scss">
.footer-content {
  background-color: var(--color-primary-900);
  display: flex;
  gap: var(--space-large);
  color: var(--color-white);
  padding: var(--space-large);
}

h2 {
  color: var(--color-white);
}

a,
ul,
li {
  color: var(--color-white);
}

footer {
  margin-top: var(--space-extra-large);
}
</style>

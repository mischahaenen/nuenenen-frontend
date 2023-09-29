<template>
  <div>
    <BaseHeader />
    <main class="container error-banner">
      <!-- 404 Page -->
      <h1>404 - Seite nicht gefunden</h1>
      <p>
        Die Seite, die du suchst, existiert nicht. Möglicherweise wurde sie
        verschoben oder gelöscht.
      </p>
      <nuxt-img
        src="/svg/not_found.svg"
        alt="Space Aliens nothing found image"
        format="webp"
      />
    </main>
    <BaseFooter />
  </div>
</template>

<script>
export default {
  layout: 'error',
  props: ['error'],
}
</script>

<style scoped lang="scss">
.error-banner {
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    margin-top: var(--space-large);
    max-width: 50%;
  }
}
</style>

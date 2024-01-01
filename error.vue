<template>
  <NuxtLayout>
    <section class="error-banner">
      <!-- 404 Page -->
      <h1>404 - Seite nicht gefunden</h1>
      <p>
        Die Seite, die du suchst, existiert nicht. Möglicherweise wurde sie
        verschoben oder gelöscht.
      </p>
      <NuxtImg
        src="svg/not_found.svg"
        alt="Space Aliens nothing found image"
        format="webp"
      />
    </section>
  </NuxtLayout>
</template>

<script>
export default {
  layout: 'error',
  // eslint-disable-next-line vue/require-prop-types
  props: ['error'],
}
</script>

<style scoped lang="scss">
.error-banner {
  margin-top: 6rem;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    margin-top: var(--space-large);
    max-width: 500px;
  }
}
</style>

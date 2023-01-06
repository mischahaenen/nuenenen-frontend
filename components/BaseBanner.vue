<template>
  <div class="container home-banner">
    <div class="home-text">
      <h1>{{ props.title }}</h1>
      <p>{{ props.description }}</p>
    </div>
    <img
      class="home-image-background"
      src="../assets/img/cloud.png"
      alt="Space Background with stars"
    />
  </div>
</template>
<script lang="ts" setup>
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})
</script>
<style scoped lang="scss">
.home-banner {
  height: 100vh;
  display: flex;
  align-items: center;
  gap: var(--space-large);
}

.home-text {
  display: flex;
  flex-direction: column;
}

.home-image-background {
  width: auto;
  max-width: 50%;
}
</style>

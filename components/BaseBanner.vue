<template>
  <div class="home-banner">
    <div class="container home-text">
      <h1>{{ page.title }}</h1>
      <p>{{ page.description }}</p>
    </div>
    <img
      class="home-image-background"
      src="../assets/img/space_background.png"
      alt="Space Background with stars"
    />
  </div>
</template>
<script lang="ts" setup>
const response = await getPage('home')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const page = response.data[0].attributes
</script>
<style scoped>
.home-banner {
  height: 100vh;
  display: flex;
  position: relative;
}

.home-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.home-image-background {
  width: 60%;
  height: auto;
  object-fit: cover;
  position: absolute;
  top: 0;
  right: 0;
  z-index: -1;
}

@media (max-width: 1600px) {
  .home-image-background {
    width: 50%;
  }
}
</style>

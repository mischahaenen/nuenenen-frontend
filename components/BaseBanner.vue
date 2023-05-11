<template>
  <div class="banner">
    <div class="container">
      <div class="home-text">
        <h1>{{ props.title }}</h1>
        <RichTextComponent
          v-if="props.isRichText"
          :content="props.description"
        ></RichTextComponent>
        <p v-else>{{ props.description }}</p>
        <nuxt-link class="link-button" to="contact">Kontaktiere uns!</nuxt-link>
      </div>
      <div class="rocket-image-background">
        <img
          class="background-image"
          src="../assets/img/cloud.webp"
          alt="Space Background with stars"
        />
        <img
          class="rocket-image"
          :style="rocketStyle"
          src="../assets/img/nuenenen_logo.webp"
          alt="Nünenen Logo which shows a rocket"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const translateY = ref(20)
const rocketStyle = computed(() => ({
  transform: `translateY(${translateY.value}%) translateX(40%) rotate(10deg)`,
}))
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isRichText: {
    type: Boolean,
    required: false,
    default: false,
  },
})
onscroll = () => {
  translateY.value = window.scrollY * -0.2
}
</script>

<style scoped lang="scss">
.banner {
  display: flex;
  align-items: center;
  margin-top: 6rem;
  height: 75dvh;
  position: relative;
}

.banner::after {
  content: '';
  height: 100%;
  width: 75dvw;
  background-color: var(--color-primary-50);
  border-radius: 0 0 50% 0;
  position: absolute;
  top: 0;
  z-index: -1;
}

.dark-mode {
  .banner::after {
    background-color: var(--color-primary-800);
  }
}

@media screen and (max-width: 768px) {
  .banner {
    height: 50dvh;
  }
  .banner::after {
    width: 100%;
    height: 50dvh;
    border-radius: 0;
  }
}

.container {
  display: flex;
  gap: var(--space-large);
  align-items: center;
  position: relative;
}

.home-text {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.rocket-image-background {
  position: relative;
  .background-image {
    width: 100%;
  }
  .rocket-image {
    max-width: 300px;
    position: absolute;
    top: 0;
    left: 0;
  }
}
.link-button {
  margin-top: var(--space-medium);
}
@media screen and (max-width: 1024px) {
  .home-banner {
    flex-direction: column;
    gap: var(--space-medium);
  }

  .home-image-background {
    max-width: 100%;
  }

  img {
    display: none;
  }
}
</style>

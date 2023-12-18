<template>
  <section class="banner full-width content-grid">
    <div class="container breakout">
      <div class="home-text">
        <h1>{{ props.title }}</h1>
        <RichTextComponent
          v-if="props.isRichText && props.description"
          :content="props.description"
        ></RichTextComponent>
        <p v-else>{{ props.description }}</p>
        <nuxt-link v-if="!isContactPage" class="link-button" to="kontakt"
          >Kontaktiere uns!</nuxt-link
        >
      </div>
      <NuxtImg
        v-if="!!props.image"
        class="custom-background-image"
        :src="props.image.attributes.url"
        :alt="
          props.image.attributes.alternativeText ||
          props.image.attributes.name + ' Logo'
        "
      />
      <div v-else class="rocket-image-background">
        <img
          class="background-image"
          src="/img/cloud.webp"
          alt="Space Background with stars"
        />
        <img
          class="rocket-image"
          :style="rocketStyle"
          src="/img/nuenenen_logo.webp"
          alt="Nünenen Logo which shows a rocket"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const translateY = ref(20)
const rocketStyle = computed(() => ({
  transform: `translateY(${translateY.value}%) translateX(40%) rotate(10deg)`,
}))
const route = useRoute()
const isContactPage = computed(() => route.path === '/kontakt')
const props = defineProps<{
  title: string
  description: string
  isRichText?: boolean
  image?: Image
}>()
onscroll = () => {
  translateY.value = 20 + window.scrollY * -0.2
}
</script>

<style scoped lang="scss">
.banner {
  margin-top: 6rem;
  min-height: 70dvh;
  position: relative;
}

.banner::after {
  content: '';
  min-height: 100%;
  width: 75dvw;
  background-color: var(--color-primary-50);
  border-radius: 0 0 50% 0;
  position: absolute;
  top: 0;
  z-index: -1;
}

.dark-mode {
  .banner::after {
    background-color: var(--color-primary-700);
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
  align-items: flex-start;
}
.custom-background-image {
  width: 500px;
  height: auto;
  border-radius: 50%;
  object-fit: cover;
}

.background-image {
  width: 500px;
  height: auto;
}

.rocket-image-background {
  position: relative;
  .rocket-image {
    max-width: 300px;
    position: absolute;
    top: 0;
    left: 0;
  }
}

.link-button {
  margin-block: var(--space-medium);
}

@media screen and (max-width: 1024px) {
  .container {
    gap: 0;
  }
  .home-banner {
    flex-direction: column;
  }

  .home-image-background {
    max-width: 100%;
  }

  img {
    display: none;
  }
}
@media screen and (max-width: 768px) {
  .banner {
    min-height: 50dvh;
  }
  .banner::after {
    width: 100%;
    min-height: 100%;
    border-radius: 0;
  }
}
</style>

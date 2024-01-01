<template>
  <div class="banner full-width content-grid">
    <section class="container breakout">
      <div class="home-text">
        <h1>{{ props.title }}</h1>
        <RichTextComponent
          v-if="props.isRichText && props.description"
          :content="props.description"
        ></RichTextComponent>
        <p v-if="!props.isRichText && props.description">
          {{ props.description }}
        </p>
        <nuxt-link v-if="!isContactPage" class="link-button" to="kontakt"
          >Kontaktiere uns!</nuxt-link
        >
        <nuxt-img
          v-if="!props.image"
          class="rocket-image"
          :style="rocketStyle"
          format="webp"
          loading="lazy"
          src="img/nuenenen_logo.webp"
          alt="Nünenen Logo which shows a rocket"
        />
        <NuxtImg
          v-else
          class="custom-background-image"
          format="webp"
          loading="lazy"
          provider="strapi"
          :src="props.image.attributes.url"
          :alt="
            props.image.attributes.alternativeText ||
            props.image.attributes.name + ' Logo'
          "
        />
      </div>
    </section>
    <NuxtImg
      class="full-width woods-image"
      format="webp"
      :src="
        $colorMode.value === 'dark'
          ? 'svg/woods_dark.svg'
          : 'svg/woods_white.svg'
      "
      alt="Space Background
    with stars"
    />
  </div>
</template>

<script lang="ts" setup>
const scrollY = useScrollY()
const rocketSpeed = computed(() => 20 + scrollY.value * -0.5)
const rocketStyle = computed(() => ({
  transform: `translateY(${rocketSpeed.value}%) translateX(40%) rotate(10deg)`,
}))
const route = useRoute()
const isContactPage = computed(() => route.path === '/kontakt')
const props = defineProps<{
  title: string | null
  description: string | null
  isRichText?: boolean
  image?: Image
}>()
</script>

<style scoped lang="scss">
.banner {
  min-height: 70dvh;
  position: relative;
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
  max-width: 75ch;
}
.custom-background-image {
  max-width: 300px;
  height: auto;
  border-radius: 50%;
  object-fit: cover;
  position: absolute;
  right: 100px;
}

.rocket-image {
  max-width: 300px;
  aspect-ratio: 1/1;
  position: absolute;
  right: 100px;
}

.woods-image {
  position: absolute;
  bottom: 0;
  z-index: -1;
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

<template>
  <div class="banner full-width content-grid">
    <section class="container breakout">
      <div class="home-text">
        <h1>{{ props.title }}</h1>
        <p class="subtitle">
          {{ props.description }}
        </p>
        <nuxt-link
          v-if="props.actionButtonLink && props.actionButtonName"
          class="btn btn-primary btn-link"
          :to="props.actionButtonLink"
          >{{ props.actionButtonName }}</nuxt-link
        >
      </div>
      <nuxt-img
        v-if="!props.image"
        class="rocket-image"
        :style="rocketStyle"
        format="webp"
        loading="eager"
        src="img/nuenenen_logo.webp"
        alt="Nünenen Logo which shows a rocket"
        width="250"
        height="250"
        sizes="(max-width: 768px) 150px, (max-width: 1200px) 200px, 250px"
      />
      <NuxtImg
        v-else
        class="custom-background-image"
        format="webp"
        loading="eager"
        provider="strapi"
        :src="props.image.hash + props.image.ext"
        :alt="props.image.alternativeText || props.image.name + ' Logo'"
        width="400"
        height="400"
        sizes="(max-width: 768px) 300px, (max-width: 1200px) 350px, 400px"
        :modifiers="{ breakpoint: 'medium' }"
      />
    </section>
    <ClientOnly>
      <NuxtImg 
        class="woods full-width" 
        :src="rocketLaunchSvg"
        loading="lazy"
        width="1920"
        height="400"
        alt="Scout camp illustration with tents and campfire"
      ></NuxtImg>
      <template #fallback>
        <NuxtImg
          class="woods full-width"
          src="svg/rocket_launch_white.svg"
          loading="lazy"
          width="1920"
          height="400"
          alt="Illustration eines Pfadfinderlagers mit zwei Zelten, einer Feuerstelle mit brennendem Lagerfeuer, einem Holzpodest in der Mitte, Baumstämmen, einer Fahne und dem schweizerischen Pfadfinderlogo, das über dem Podest schwebt. Im Hintergrund sind Hügel, fliegende Vögel und eine rosa Farbpalette zu sehen.“"
        ></NuxtImg>
      </template>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
const colorMode = useColorMode();

const scrollY = useScrollY();
const rocketSpeed = computed(() => 20 + scrollY.value * -0.5);
const rocketStyle = computed(() => ({
  transform: `translateY(${rocketSpeed.value}%) translateX(40%) rotate(10deg)`,
}));
const rocketLaunchSvg = computed(() => {
  const resolvedMode =
    colorMode.value === "system"
      ? window?.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : colorMode.value;

  return resolvedMode === "dark"
    ? "svg/rocket_launch_dark.svg"
    : "svg/rocket_launch_white.svg";
});

const props = defineProps<{
  title: string | null;
  description: string | null;
  actionButtonName?: string;
  actionButtonLink?: string;
  image?: Image;
}>();
</script>

<style scoped lang="scss">
.banner {
  min-height: 80dvh;
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
  position: relative;
  align-items: flex-start;
  justify-content: center;
  margin-top: 10vh;
}

.home-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 75ch;
}

.subtitle {
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  margin-top: 0;
}

.custom-background-image {
  width: min(100%, 400px);
  height: auto;
  border-radius: 50%;
  aspect-ratio: 1;
  object-fit: cover;
}

.rocket-image {
  width: clamp(150px, 30vw, 250px);
  aspect-ratio: 1;
  position: absolute;
  right: max(45%, 80px);
  bottom: min(50%, 350px);
  z-index: -1;
  will-change: transform;
  contain: layout;
}

.woods {
  position: absolute;
  bottom: -1px;
  left: 0;
  z-index: -2;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: bottom;
  max-height: auto;
}

.link-button {
  margin-block: var(--space-medium);
}

@media screen and (min-width: 1800px) {
  .rocket-image[data-v-70670a90] {
    bottom: min(50%, 400px);
  }
}

@media screen and (max-width: 1150px) {
  .container {
    gap: 0;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: 6rem;
  }
  .home-banner {
    flex-direction: column;
  }

  .rocket-image[data-v-70670a90] {
    bottom: min(40%, 300px);
  }
}
@media screen and (max-width: 768px) {
  .banner::after {
    width: 100%;
    min-height: 100%;
    border-radius: 0;
  }

  .rocket-image[data-v-70670a90] {
    bottom: min(30%, 300px);
  }
}
</style>

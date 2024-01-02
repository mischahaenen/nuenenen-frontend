<template>
  <section
    :class="[
      'pt-medium pb-medium full-width content-grid',
      props.index % 2 === 0 ? '' : ' bg-primary-50 dark:bg-primary-700',
    ]"
  >
    <TitleComponent
      class="pt-medium"
      :title="props.zone.Title"
      :index="index"
    ></TitleComponent>
    <RichTextComponent :content="props.zone.Description" />
    <div class="breakout pb-medium">
      <article class="step-grid">
        <nuxt-link
          v-for="step of props.zone.steps.data"
          :key="step.attributes.Name"
          :to="'abteilung/' + step.attributes.Slug"
          class="step-item"
        >
          <NuxtImg
            format="webp"
            class="step-image"
            :src="step.attributes.logo.data.attributes.url"
            :alt="step.attributes.logo.data.attributes.name"
          />
          <h3>{{ step.attributes.Name }}</h3>
        </nuxt-link>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  zone: StepZone
  index: number
}>()
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}

a:hover h3 {
  text-decoration: underline;
}
.step-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 400px));
  justify-content: center;
  gap: var(--space-medium);
}

@media screen and (max-width: 480px) {
  .step-grid {
    grid-template-columns: 1fr;
  }
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: var(--border-radius);
  padding: var(--space-medium);
  overflow: hidden;
  transition: all 0.2s ease-in-out;
}

.step-item:hover {
  background-color: var(--color-accent-50);
  .step-image {
    transform: scale(1.05);
  }
}

.step-image {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 50%;
  transition: transform 0.2s ease-in-out;
}

.dark-mode {
  .step-item:hover {
    background-color: var(--color-accent-900);
  }
}
</style>

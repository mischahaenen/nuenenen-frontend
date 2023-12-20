<template>
  <TitleComponent
    class="pt-medium"
    :title="props.zone.Title"
    :index="index"
  ></TitleComponent>
  <RichTextComponent :content="props.zone.Description" />
  <section class="breakout pb-medium">
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
  grid-template-columns: repeat(auto-fit, minmax(100px, 200px));
  justify-content: center;
  gap: var(--space-medium);
}

@media screen and (max-width: 640px) {
  .step-grid {
    grid-template-columns: 1fr;
  }
}

.step-item {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
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
  width: min(100%, 200px);
  height: auto;
  transition: transform 0.2s ease-in-out;
}

.dark-mode {
  .step-item:hover {
    background-color: var(--color-accent-900);
  }
}
</style>

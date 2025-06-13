<template>
  <section
    :class="[
      'pt-medium pb-medium full-width content-grid',
      props.index % 2 === 0 ? '' : ' bg-accent-50 dark:bg-primary-700',
    ]"
  >
    <TitleComponent :title="props.zone.Title" :index="index"></TitleComponent>
    <RichTextComponent :content="props.zone.Description" />
    <div class="mt-medium step-grid">
      <article v-for="step of steps" :key="step.Name" class="step-item">
        <nuxt-link :to="'abteilung/' + step.Slug">
          <NuxtImg
            class="step-image"
            format="webp"
            provider="strapi"
            :src="step.logo.hash + step.logo.ext"
            :alt="step.logo.name"
            sizes="100vw sm:50vw md:400px"
            :modifiers="{ breakpoint: 'small' }"
          />
          <div class="step-content">
            <h3>{{ step.Name }}</h3>
            <p>{{ step.Description }}</p>
          </div>
        </nuxt-link>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useStepsApi } from "~/composables/api/modules/steps";

const { getSteps } = useStepsApi();
const props = defineProps<{
  zone: StepZone;
  index: number;
}>();
const { data: steps, error } = await useAsyncData(`steps`, () => getSteps(), {
  server: true,
  transform: (data) => {
    if (!data) return [];
    return data.data ?? [];
  },
});
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}

a:hover h3 {
  text-decoration: underline;
}
.step-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-small);
  justify-content: center;
}

.step-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  transition: all 0.2s ease-in-out;
}

.step-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: var(--font-family);
  height: 100%;
  width: 100%;
  border-radius: 50%;
  font-size: 1rem;
  text-align: center;
  background-color: color-mix(in srgb, var(--color-primary-50) 60%, transparent);
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all 0.2s ease-in-out;

  h3 {
    margin-bottom: 0;
  }
}

.step-image {
  width: 15rem;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 50%;
}

.step-item:hover {
  .step-content {
    background-color: color-mix(in srgb, var(--color-primary-100) 80%, transparent);
  }
}

.dark-mode {
  .step-content {
    background-color: color-mix(in srgb, var(--color-accent-900) 60%, transparent);
  }
  .step-item:hover {
    .step-content {
      background-color: color-mix(in srgb, var(--color-accent-800) 60%, transparent);
    }
  }
}
</style>

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
      <article v-for="step of filteredSteps" :key="step.Name" class="step-item">
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
import { useStepsApi } from '~/composables/api/modules/steps'
import type { StepZone } from '~/types/pageZone';
import type { Step } from '~/types/step';

const { getSteps } = useStepsApi()

const props = defineProps<{
  zone: StepZone
  index: number
}>()

const { data: allSteps, error } = await useAsyncData(
  `steps`,
  () => getSteps(),
  {
    server: true,
    transform: (data) => {
      if (!data) return []
      return data.data ?? []
    },
  }
)

const STEP_ORDER = [
  'biberstufe',
  'wolfsstufe',
  'pfadistufe',
  'piostufe',
  'roverstufe',
  'elternrat',
]

// Filter steps to only show those that are in the zone, sorted by canonical order
const filteredSteps = computed(() => {
  if (!allSteps.value || !props.zone.steps) return []
  return props.zone.steps
    .map((zoneStep: StepZone) =>
      allSteps.value?.find((fullStep: Step) => fullStep.id === zoneStep.id)
    )
    .filter(
      (fullStep: Step): fullStep is NonNullable<typeof Step> =>
        fullStep !== undefined &&
        STEP_ORDER.includes(fullStep.Slug?.toLowerCase())
    )
    .sort((a, b) => {
      const aIndex = STEP_ORDER.indexOf(a.Slug?.toLowerCase())
      const bIndex = STEP_ORDER.indexOf(b.Slug?.toLowerCase())
      return (
        (aIndex === -1 ? STEP_ORDER.length : aIndex) -
        (bIndex === -1 ? STEP_ORDER.length : bIndex)
      )
    })
})
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
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    border-radius: 50%;
  }
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
  background-color: color-mix(
    in srgb,
    var(--color-primary-50) 60%,
    transparent
  );
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
    background-color: color-mix(
      in srgb,
      var(--color-primary-100) 80%,
      transparent
    );
  }
}
.dark-mode {
  .step-content {
    background-color: color-mix(
      in srgb,
      var(--color-accent-900) 60%,
      transparent
    );
  }
  .step-item:hover {
    .step-content {
      background-color: color-mix(
        in srgb,
        var(--color-accent-800) 60%,
        transparent
      );
    }
  }
}

@include breakpoint-md {
  .step-image {
    width: 11rem;
  }
}

@include breakpoint-sm {
  .step-image {
    width: 8rem;
  }
}
</style>

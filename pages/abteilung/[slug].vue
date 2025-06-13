<template>
  <main class="content-grid">
    <template v-if="error"><p>Something went wrong</p></template>
    <template v-else-if="step">
      <BaseBanner
        :title="step[0].Name"
        :description="step[0].Description"
        :image="step[0].logo"
      />
      <component
        :is="resolveComponent(zone.__component)"
        v-for="(zone, index) in step[0].pageZone"
        :id="zone.Title"
        :key="`${zone.__component}-${index}}`"
        :zone="zone"
        :index="index"
        :title="resolveZoneTitle(zone)"
        :sub-title="resolveZoneSubTitle(zone)"
        :testimonials="resolveZoneTestimonials(zone)"
        :kastenzeddel="resolveZoneKastenzeddel(zone)"
        :step="step[0].Slug"
      />
    </template>
  </main>
</template>
<script setup lang="ts">
import { useStepsApi } from "~/composables/api/modules/steps";

const route = useRoute();
const { getStep } = useStepsApi();
const stepId = computed(() => `step-${route.params.slug}`);

const { data: step, error } = useAsyncData(stepId.value, () =>
  getStep(route.params.slug as string)
);

// Map component types to their Vue components
const componentMap: Record<string, string> = {
  "pages.section": "PageZoneSectionComponent",
  "pages.kastenzeddel": "StepZoneKastenzettelComponent",
  "pages.document": "PageZoneDocumentComponent",
  "pages.image": "PageZoneImageComponent",
  "pages.group": "PageZoneTeamComponent",
  "pages.testimonials": "PageZoneTestimonialComponent",
  "pages.quartalsprogramm": "StepZoneQPComponent",
};

// Resolve component based on component name
const resolveComponent = (componentName: string): string => {
  return componentMap[componentName] || "div"; // fallback to div if component not found
};

// Type guards for zone types
function isImageZone(zone: PageZoneItem): zone is ImageZone {
  return zone.__component === "pages.image";
}

function isTestimonialZone(zone: PageZoneItem): zone is Testimonial {
  return zone.__component === "pages.testimonials";
}

function isKastenzeddelZone(zone: PageZoneItem): zone is Kastenzeddel {
  return zone.__component === "pages.kastenzeddel";
}

// Resolve title property
function resolveZoneTitle(zone: PageZoneItem): string {
  if (isImageZone(zone) || isTestimonialZone(zone)) {
    return zone.Title;
  }
  return "";
}

// Resolve subtitle property for testimonial component
function resolveZoneSubTitle(zone: PageZoneItem): string {
  if (isTestimonialZone(zone)) {
    return zone.Subtitle;
  }
  return "";
}

// Resolve testimonials property for testimonial component
function resolveZoneTestimonials(zone: PageZoneItem): any {
  if (isTestimonialZone(zone)) {
    return zone.testimonials;
  }
  return null;
}

// Resolve kastenzeddel property
function resolveZoneKastenzeddel(zone: PageZoneItem): Kastenzeddel | null {
  if (isKastenzeddelZone(zone)) {
    return zone;
  }
  return null;
}
</script>

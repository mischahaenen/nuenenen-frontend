<template>
  <main class="content-grid">
    <template v-if="error">
      <p>Something went wrong: {{ error }}</p>
    </template>

    <!-- Render Step Content (for /abteilung/stepname routes) -->
    <template v-if="isStepRoute && step?.data && step.data.length > 0">
      <BaseBanner
        id="main"
        :title="step.data[0].Name"
        :description="step.data[0].Description"
        :image="step.data[0].logo"
      />
      <component
        :is="getZoneComponent(zone.__component)"
        v-for="(zone, index) in step.data[0].pageZone"
        :key="`${zone.__component}-${index}`"
        v-bind="getProps(zone, index)"
      />
    </template>

    <!-- Render Page Content (for regular routes) -->
    <template v-else-if="!isStepRoute && page?.data && page.data.length > 0">
      <BaseBanner
        id="main"
        :title="page.data[0].title"
        :description="page.data[0].description"
        :action-button-name="page.data[0].ActionButtonName"
        :action-button-link="page.data[0].ActionButtonLink"
      />
      <component
        :is="getZoneComponent(zone.__component)"
        v-for="(zone, index) in page.data[0].pageZone"
        :key="`${zone.__component}-${index}`"
        v-bind="getProps(zone, index)"
      />
    </template>
  </main>
</template>

<script setup lang="ts">
import { usePagesApi } from "~/composables/api/modules/pages";
import { useStepsApi } from "~/composables/api/modules/steps";
import {
  PageZoneImageComponent,
  PageZoneSectionComponent,
  PageZoneBlogComponent,
  PageZoneStepsComponent,
  PageZonePfadiheimComponent,
  PageZoneContactComponent,
  PageZoneDocumentComponent,
  PageZoneTeamComponent,
  PageZoneKastenzettelComponent,
  PageZoneQPComponent,
} from "#components";

const { getPage } = usePagesApi();
const { getStep } = useStepsApi();
const route = useRoute();

// Build the full slug path
const fullSlug = computed(() => {
  if (route.params.slug) {
    return Array.isArray(route.params.slug)
      ? route.params.slug.join("/")
      : route.params.slug;
  }
  return "home";
});

// Determine if this is a step route (starts with abteilung/)
const isStepRoute = computed(() => {
  const segments = Array.isArray(route.params.slug)
    ? route.params.slug
    : [route.params.slug];
  return segments[0] === "abteilung" && segments.length === 2;
});

// Extract step slug for step routes
const stepSlug = computed(() => {
  if (isStepRoute.value) {
    const segments = Array.isArray(route.params.slug)
      ? route.params.slug
      : [route.params.slug];
    return segments[1]; // Get the step name (pfadistufe, biberstufe, etc.)
  }
  return "";
});

// Fetch page data for non-step routes
const { data: page, error: pageError } = await useAsyncData(
  `page-${fullSlug.value}`,
  () => (!isStepRoute.value ? getPage(fullSlug.value) : null),
  { server: !isStepRoute.value }
);

// Fetch step data for step routes
const { data: step, error: stepError } = await useAsyncData(
  `step-${stepSlug.value}`,
  () => (isStepRoute.value ? getStep(stepSlug.value) : null),
  { server: isStepRoute.value }
);

// Combined error handling
const error = computed(() => pageError.value || stepError.value);

// Watch for route changes and refresh appropriate data
watch(fullSlug, async () => {
  if (isStepRoute.value) {
    await refreshCookie(`step-${stepSlug.value}`);
  } else {
    await refreshCookie(`page-${fullSlug.value}`);
  }
});

// Unified component map (includes both page and step components)
const componentMap = {
  "pages.image": PageZoneImageComponent,
  "pages.section": PageZoneSectionComponent,
  "pages.blog": PageZoneBlogComponent,
  "pages.steps": PageZoneStepsComponent,
  "pages.pfadiheim": PageZonePfadiheimComponent,
  "pages.contact": PageZoneContactComponent,
  "pages.document": PageZoneDocumentComponent,
  "pages.group": PageZoneTeamComponent,
  "pages.kastenzeddel": PageZoneKastenzettelComponent,
  "pages.quartalsprogramm": PageZoneQPComponent,
} as const;

const getZoneComponent = (componentType: string) => {
  return componentMap[componentType as keyof typeof componentMap];
};

const title = computed(() => {
  if (isStepRoute.value && step.value?.data && step.value.data.length > 0) {
    return `Pfadi Nünenen - ${step.value.data[0].Name}`;
  }
  if (!isStepRoute.value && page.value?.data && page.value.data.length > 0) {
    const pageSlug = page.value.data[0]?.slug;
    if (pageSlug) {
      return `Pfadi Nünenen - ${pageSlug.charAt(0).toUpperCase() + pageSlug.slice(1)}`;
    }
  }
  return "Pfadi Nünenen";
});

const getProps = (zone: PageZoneItem, index: number) => {
  return {
    zone: zone as any,
    index: index + 1,
    id: index,
  };
};

useHead(() => ({
  title: title.value,
  "Content-Security-Policy": "upgrade-insecure-requests",
}));

// Enhanced analytics tracking
const { trackPageView, setCustomDimension } = useEnhancedAnalytics();

onMounted(() => {
  const pageType = isStepRoute.value ? "step_page" : "content_page";
  const contentCategory = isStepRoute.value ? "scouting_groups" : "general_content";

  setCustomDimension(1, pageType);
  setCustomDimension(4, contentCategory);

  // Track enhanced page view
  trackPageView({
    content_group1: pageType,
    content_group2: fullSlug.value,
    custom_map: {
      page_slug: fullSlug.value,
      is_step_route: isStepRoute.value,
      has_action_button: !!(isStepRoute.value
        ? false
        : page.value?.data?.[0]?.ActionButtonName),
      content_sections: isStepRoute.value
        ? step.value?.data?.[0]?.pageZone?.length || 0
        : page.value?.data?.[0]?.pageZone?.length || 0,
    },
  });
});
</script>

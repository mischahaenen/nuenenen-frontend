<template>
  <main class="content-grid">
    <template v-if="error">
      <p>Something went wrong: {{ error }}</p>
    </template>
    <template v-if="page && page.length > 0">
      <BaseBanner
        id="main"
        :title="page[0].title"
        :description="page[0].description"
        :action-button-name="page[0].ActionButtonName"
        :action-button-link="page[0].ActionButtonLink"
      />
      <component
        :is="getZoneComponent(zone.__component)"
        v-for="(zone, index) in page[0].pageZone"
        :key="`${zone.__component}-${index}}`"
        v-bind="getProps(zone, index)"
      />
    </template>
  </main>
</template>

<script setup lang="ts">
import { usePagesApi } from "~/composables/api/modules/pages";
import {
  PageZoneImageComponent,
  PageZoneSectionComponent,
  PageZoneBlogComponent,
  PageZoneStepsComponent,
  PageZonePfadiheimComponent,
  PageZoneContactComponent,
  PageZoneDocumentComponent,
  PageZoneSponsorComponent,
  PageZoneTeamComponent,
} from "#components";

const { getPage } = usePagesApi();
const route = useRoute();

const slug = computed(() => {
  if (route.params.slug) {
    return Array.isArray(route.params.slug)
      ? route.params.slug.join("/")
      : route.params.slug;
  }
  return "home";
});

const { data: page, error } = await useAsyncData(
  `page-${slug.value}`,
  () => getPage(slug.value),
  {
    server: true,
    transform: (data) => {
      console.log(data);
      if (!data) return [];
      return data.data ?? [];
    },
  }
);

const componentMap = {
  "pages.image": PageZoneImageComponent,
  "pages.section": PageZoneSectionComponent,
  "pages.blog": PageZoneBlogComponent,
  "pages.steps": PageZoneStepsComponent,
  "pages.pfadiheim": PageZonePfadiheimComponent,
  "pages.contact": PageZoneContactComponent,
  "pages.document": PageZoneDocumentComponent,
  //"pages.sponsors": PageZoneSponsorComponent,
  "pages.group": PageZoneTeamComponent,
} as const;

const getZoneComponent = (componentType: string) => {
  return componentMap[componentType as keyof typeof componentMap];
};

const title = computed(() => {
  if (!page.value || page.value.length === 0) return "Pfadi Nünenen";
  const pageSlug = page.value[0]?.slug;
  if (!pageSlug) return "Pfadi Nünenen";
  return `Pfadi Nünenen - ${pageSlug.charAt(0) + pageSlug.slice(1)}`;
});

const getProps = (zone: PageZoneItem, index: number) => {
  return {
    zone: zone as any,
    index,
    id: index,
  };
};

useHead(() => ({
  title: title.value,
  "Content-Security-Policy": "upgrade-insecure-requests",
}));

const { gtag } = useGtag();

// SSR-ready
gtag("event", "screen_view", {
  app_name: "Webapp",
  screen_name: slug.value ?? "home",
});
</script>

<template>
  <div v-if="pending">
    <p>Loading...</p>
  </div>
  <div v-else>
    <BaseBanner
      :title="step.data[0].attributes.Name"
      :description="step.data[0].attributes.Description"
      :is-rich-text="true"
    />
    <div
      v-for="(zone, index) in step.data[0].attributes.pageZone"
      :key="index"
      :class="index % 2 === 0 ? 'colored-section' : 'section'"
    >
      <div v-if="zone.__component == 'pages.section'" class="container">
        <TitleComponent :title="zone.Title" :index="index"></TitleComponent>
        <RichTextComponent
          v-if="zone.Description"
          :content="zone.Description"
        />
      </div>
      <div v-if="zone.__component == 'pages.event'" class="container">
        <TitleComponent :title="zone.Title" :index="index"></TitleComponent>
        <RichTextComponent
          v-if="zone.Description"
          :content="zone.Description"
        />
        <KastenzeddelComponent v-if="zone.event" :event="zone.event" />
      </div>
      <div v-if="zone.__component == 'pages.document'" class="container">
        <TitleComponent :title="zone.Title" :index="index"></TitleComponent>
        <a
          v-for="file in zone.files.data"
          :key="file.id"
          :href="useStrapiUrl() + file.attributes.url"
          download=""
          >Download {{ file.attributes.name }}</a
        >
      </div>
      <div v-if="zone.__component == 'pages.group'" class="container">
        <TitleComponent :title="zone.Title" :index="index"></TitleComponent>
        <div v-if="zone.members" class="member-section">
          <MemberCard
            v-for="member in zone.members.data"
            :id="member.id"
            :key="member.id"
          ></MemberCard>
        </div>
      </div>
      <div v-if="zone.__component == 'pages.image'" class="container">
        <TitleComponent :title="zone.Title" :index="index"></TitleComponent>
        <ImageSliderComponent v-if="zone.images" :images="zone.images.data" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const route = useRoute()
const {
  data: step,
  pending,
  error,
} = await getStep(route.params.slug as string)
if (error.value) {
  await navigateTo('/not-found')
  throw createError({
    statusCode: 404,
    statusMessage: error.value.name,
  })
}
useHead({
  title: `Pfadi Nünenen - ${step.value.data[0].attributes.Name || ''}`,
})
</script>
<style scoped lang="scss">
.container {
  margin: 6rem auto var(--space-large) auto;
}
.member-section {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-medium);
  justify-content: center;
}
</style>

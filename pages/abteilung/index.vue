<template>
  <div v-if="page">
    <BaseBanner :title="page.title" :description="page.description" />
    <div
      v-for="(zone, index) in page.pageZone"
      :key="index"
      :class="index % 2 === 0 ? 'colored-section' : 'section'"
    >
      <div class="container">
        <h2 v-if="index % 2 !== 0">{{ zone.Title }}</h2>
        <ColoredTitleComponent v-else :title="zone.Title" />
        <div v-if="zone.Description">
          <RichTextComponent :content="zone.Description" />
        </div>
        <div v-if="zone.__component === 'pages.steps'" class="flexRow">
          <nuxt-link
            v-for="step of steps"
            :key="step.attributes.Name"
            :to="'abteilung/' + step.attributes.Slug"
          >
            <img
              class="image"
              :src="url + step.attributes.logo.data.attributes.url"
              :alt="step.attributes.logo.data.attributes.name"
            />
            <h3>{{ step.attributes.Name }}</h3>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const response = await getPage('abteilung')
const page = response.data[0].attributes
const steps = useState<IStep[]>(() => [])
const url = useStrapiUrl()

if (page.pageZone.some((zone) => zone.__component === 'pages.steps')) {
  const stepRes = await getSteps()
  steps.value = stepRes.data
}
</script>

<style scoped lang="scss">
.flexRow {
  display: flex;
  gap: var(--space-large);
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-end;
}

.image {
  display: block;
  width: 100%;
  max-width: 200px;
  height: auto;
}

h3 {
  text-align: center;
  margin-top: var(--space-small);
}

a {
  text-decoration: none;
}

a:hover h3 {
  text-decoration: underline;
}
</style>

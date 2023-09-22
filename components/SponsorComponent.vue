<template>
  <div class="sponsor-grid">
    <div v-for="sponsor of sponsors" :key="sponsor.attributes.Name">
      <nuxt-img
        class="sponsor-logo"
        format="webp"
        :src="sponsor.attributes.Logo.data.attributes.url"
      ></nuxt-img>
      <a :href="sponsor.attributes.Url" target="_blank">
        <h3>{{ sponsor.attributes.Name }}</h3></a
      >
      <p>{{ sponsor.attributes.Description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  ids: {
    type: Array as PropType<number[]>,
    required: true,
  },
})
const sponsors = useState<Sponsor[] | null>(() => null)
const fetchData = async () => {
  const { data, error } = await getSponsors(props.ids)
  if (error.value) {
    console.error(error)
  }
  if (data.value) {
    sponsors.value = data.value.data
  }
}
onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.sponsor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: var(--space-medium);
  padding: var(--space-medium);
  justify-items: center;
  align-items: start;
  text-align: center;
}

.sponsor-logo {
  height: 200px;
  width: 200px;
  object-fit: cover;
}
</style>

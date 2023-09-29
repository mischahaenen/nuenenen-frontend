<template>
  <div class="sponsor-grid">
    <div v-for="sponsor of props.sponsors" :key="sponsor.attributes.Name">
      <nuxt-img
        class="sponsor-logo"
        format="webp"
        :src="sponsor.attributes.Logo.data.attributes.url"
        :alt="
          sponsor.attributes.Logo.data.attributes.alternativeText ||
          sponsor.attributes.Name
        "
      ></nuxt-img>
      <a
        v-if="sponsor.attributes.Url"
        :href="sponsor.attributes.Url"
        target="_blank"
      >
        <h3>{{ sponsor.attributes.Name }}</h3></a
      >
      <h3 v-else>{{ sponsor.attributes.Name }}</h3>
      <p>{{ sponsor.attributes.Description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  sponsors: {
    type: Array as PropType<Sponsor[]>,
    required: true,
  },
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

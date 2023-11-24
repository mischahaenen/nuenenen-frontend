<template>
  <div class="sponsor-grid">
    <div
      v-for="sponsor of props.sponsors"
      :key="sponsor.attributes.Name"
      class="sponsor"
    >
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

const initializeObserver = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('sponsor--hidden')
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.5,
    }
  )

  document.querySelectorAll('.sponsor').forEach((item) => {
    item.classList.add('sponsor--hidden')
    observer.observe(item)
  })
}

onMounted(() => initializeObserver())
</script>

<style scoped lang="scss">
.sponsor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: var(--space-medium);
  padding: var(--space-medium);
  justify-items: center;
  align-items: start;
  text-align: center;
}

.sponsor {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}

.sponsor--hidden {
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}

.sponsor-logo {
  height: 200px;
  width: 200px;
  object-fit: cover;
  border-radius: var(--border-radius);
}
@media (max-width: 768px) {
  .sponsor-logo {
    height: 150px;
    width: 150px;
  }
}
</style>

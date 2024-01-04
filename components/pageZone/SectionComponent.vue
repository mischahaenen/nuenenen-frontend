<template>
  <div
    :class="[
      'pt-medium pb-medium full-width content-grid',
      props.index % 2 === 0 ? '' : ' bg-accent-50 dark:bg-primary-700',
    ]"
  >
    <section
      :class="[
        'section breakout',
        { flex: props.zone.Image?.data },
        { 'row-reverse': index % 2 !== 0 },
      ]"
    >
      <div>
        <TitleComponent
          :title="props.zone.Title"
          :index="props.index"
        ></TitleComponent>
        <RichTextComponent :content="props.zone.Description" />
      </div>
      <NuxtImg
        v-if="props.zone.Image?.data?.attributes?.url"
        class="image"
        provider="strapi"
        format="webp"
        :src="props.zone.Image.data.attributes.url"
        :alt="
          props.zone.Image.data.attributes.alternativeText ??
          props.zone.Image.data.attributes.name
        "
      ></NuxtImg>
    </section>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  zone: Section
  index: number
}>()

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in')
        observer.unobserve(entry.target)
      }
    })
  })

  document.querySelectorAll('.section').forEach((ref) => {
    observer.observe(ref)
  })
})
</script>

<style scoped lang="scss">
.section {
  opacity: 0;
  transform: translateY(20px);
  transition: all 1s;

  &.fade-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.flex {
  display: flex;
  gap: var(--space-large);
  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  &.row-reverse {
    flex-direction: row-reverse;
  }
}

.image {
  width: min(400px, 100%);
  height: auto;
  object-fit: cover;
  border-radius: var(--border-radius);
  margin-block: 0;
}

@media screen and (max-width: 1000px) {
  .flex {
    flex-direction: column;
    gap: var(--space-small);

    &.row-reverse {
      flex-direction: column;
    }
  }
}
</style>

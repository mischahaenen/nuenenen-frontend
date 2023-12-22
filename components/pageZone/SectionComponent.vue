<template>
  <section
    :class="[
      'pt-medium pb-medium',
      !!props.zone.Image?.data?.length ? 'breakout' : '',
      { flex: !!props.zone.Image?.data?.length },
      props.index % 2 === 0
        ? 'flex-even'
        : 'flex-odd full-width bg-primary-50 dark:bg-primary-700',
    ]"
  >
    <div>
      <TitleComponent
        :title="props.zone.Title"
        :index="props.index"
      ></TitleComponent>
      <RichTextComponent :content="props.zone.Description" />
    </div>
    <ImageSliderComponent
      :images="props.zone.Image.data"
    ></ImageSliderComponent>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  zone: Section
  index: number
}>()

const initializeObserver = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('sectionComponent--hidden')
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
    }
  )

  document.querySelectorAll('.sectionComponent').forEach((item) => {
    item.classList.add('sectionComponent--hidden')
    observer.observe(item)
  })
}

onMounted(() => initializeObserver())
</script>

<style scoped lang="scss">
.sectionComponent {
  width: min(640px, 90vw);
  margin-left: auto;
  margin-right: auto;
  opacity: 1;
  transform: translateX(0);
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}

.flex {
  width: min(1140px, 90vw);
  display: flex;
  gap: var(--space-large);
  align-items: center;
  justify-content: space-between;
}

.flex .flex-even {
  flex-direction: row;
}

.flex .flex-odd {
  flex-direction: row-reverse;
}

.sectionComponent--hidden {
  opacity: 0 !important;
  transform: translateY(50px) !important;
  transition: opacity 0.3s ease-out, transform 0.3s ease-out !important;
}

@media screen and (max-width: 1000px) {
  .flex {
    flex-direction: column;
    gap: var(--space-small);
  }
}
</style>

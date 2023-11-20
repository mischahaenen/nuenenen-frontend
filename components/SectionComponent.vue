<template>
  <div
    :class="[
      { flex: !!images?.data?.length },
      props.index % 2 === 0 ? 'flex-even' : 'flex-odd',
    ]"
  >
    <div class="section">
      <TitleComponent
        :title="props.title"
        :index="props.index"
      ></TitleComponent>
      <RichTextComponent
        v-if="props.description"
        :content="props.description"
      />
    </div>
    <ImageSliderComponent
      v-if="props?.images?.data"
      :images="props.images.data"
    ></ImageSliderComponent>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string
  description?: string
  images?: ImagesResponse
  index: number
}>()

const initializeObserver = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('section--hidden')
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.5,
    }
  )

  document.querySelectorAll('.section').forEach((item) => {
    item.classList.add('section--hidden')
    observer.observe(item)
  })
}

onMounted(() => initializeObserver())
</script>

<style scoped lang="scss">
.flex {
  display: flex;
  gap: var(--space-large);
  align-items: center;
}

.section {
  opacity: 1;
  transform: translateX(0);
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}

.flex-even {
  flex-direction: row;
  .section--hidden {
    opacity: 0;
    transform: translateX(-50px);
    transition: opacity 0.3s ease-out, transform 0.3s ease-out;
  }
}

.flex-odd {
  flex-direction: row-reverse;
  .section--hidden {
    opacity: 0;
    transform: translateX(50px);
    transition: opacity 0.3s ease-out, transform 0.3s ease-out;
  }
}

.image {
  width: 500px;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: var(--border-radius);
}

@media screen and (max-width: 1000px) {
  .flex {
    flex-direction: column;
  }
  .image {
    width: 100%;
  }
}
</style>

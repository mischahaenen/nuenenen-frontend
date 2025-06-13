<template>
  <div
    :class="[
      'pt-medium pb-medium full-width content-grid',
      props.index % 2 === 0 ? '' : ' bg-accent-50 dark:bg-primary-700',
    ]"
  >
    <section
      :class="[
        'section',
        { 'flex breakout': props.zone.Image },
        { 'row-reverse': index % 2 !== 0 },
      ]"
    >
      <div>
        <TitleComponent :title="props.zone.Title" :index="props.index"></TitleComponent>
        <RichTextComponent :content="props.zone.Description" />
      </div>
      <NuxtImg
        v-if="props.zone.Image.url"
        class="image"
        :class="{
          portrait: isPortrait(props.zone.Image),
          landscape: !isPortrait(props.zone.Image),
        }"
        provider="strapi"
        format="webp"
        :src="props.zone.Image.hash + props.zone.Image.ext"
        :alt="props.zone.Image.alternativeText ?? props.zone.Image.name"
        sizes="100vw sm:50vw md:400px"
        :modifiers="{ breakpoint: 'large' }"
      ></NuxtImg>
    </section>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  zone: Section;
  index: number;
}>();

const isPortrait = (image) => {
  return image.height > image.width;
};

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  });

  document.querySelectorAll(".section").forEach((ref) => {
    observer.observe(ref);
  });
});
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
  flex-direction: row;
  justify-content: center;

  &.row-reverse {
    flex-direction: row-reverse;
  }
}

.image {
  width: auto;
  max-width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 50px;
  margin: 0;
}

.portrait {
  max-height: 600px;
}

.landscape {
  max-width: 600px;
}

@include breakpoint-lg {
  .flex {
    flex-direction: column;
    gap: var(--space-small);

    &.row-reverse {
      flex-direction: column;
    }
  }
}

@include breakpoint-md {
  .portrait {
    max-height: auto;
  }

  .landscape {
    max-width: 100%;
  }
}
</style>

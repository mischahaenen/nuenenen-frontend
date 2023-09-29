<template>
  <div v-if="image" :class="getImagePositionClass()" class="flex">
    <div>
      <TitleComponent
        :title="props.zone.Title"
        :index="props.index"
      ></TitleComponent>
      <RichTextComponent
        v-if="props.zone.Description"
        :content="props.zone.Description"
      />
    </div>
    <nuxt-img
      v-if="image"
      class="image"
      provider="strapi"
      format="webp"
      :src="image[0].attributes.url"
      :alt="image[0].attributes.name"
    ></nuxt-img>
  </div>
  <div v-else>
    <TitleComponent
      :title="props.zone.Title"
      :index="props.index"
    ></TitleComponent>
    <RichTextComponent
      v-if="props.zone.Description"
      :content="props.zone.Description"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  zone: Section
  index: number
}>()
const image = computed(() => props.zone.Image?.data)

const getImagePositionClass = () => {
  return props.index % 2 === 0 ? 'flex-even' : 'flex-odd'
}
</script>

<style scoped lang="scss">
.flex {
  display: flex;
  gap: var(--space-large);
  align-items: center;
}

.flex-even {
  flex-direction: row;
}

.flex-odd {
  flex-direction: row-reverse;
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

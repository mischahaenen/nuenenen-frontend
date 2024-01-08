<template>
  <section
    :class="[
      'pt-medium pb-medium',
      {
        'full-width content-grid bg-accent-50 dark:bg-primary-700':
          props.index % 2 === 1,
      },
    ]"
  >
    <TitleComponent
      :title="props.zone.Title"
      :index="props.index"
    ></TitleComponent>
    <ul>
      <li v-if="props.zone.Document?.data">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path
            d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"
          />
        </svg>
        <a :href="props.zone.Document.data.attributes.url" download=""
          >Download {{ props.zone.Document.data.attributes.name }}</a
        >
      </li>
    </ul>
    <a
      v-if="props.zone.Document?.data"
      :href="props.zone.Document.data.attributes.url"
      download=""
      ><NuxtImg
        v-if="props.zone.Image?.data"
        class="qp-image"
        :src="props.zone.Image.data.attributes.url"
        :alt="
          props.zone.Image.data.attributes.alternativeText ||
          props.zone.Image.data.attributes.name
        "
      />
    </a>
    <NuxtImg
      v-else-if="props.zone.Image?.data"
      class="qp-image"
      :src="props.zone.Image.data.attributes.url"
      :alt="
        props.zone.Image.data.attributes.alternativeText ||
        props.zone.Image.data.attributes.name
      "
    />
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  zone: QPZone
  index: number
}>()
</script>
<style scoped lang="scss">
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

ul li {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

ul li svg {
  fill: var(--color-accent-900);
}
.qp-image {
  width: 100%;
  height: auto;
  border-radius: var(--border-radius);
}

.dark-mode {
  ul li svg {
    fill: var(--color-primary-50);
  }
}
</style>

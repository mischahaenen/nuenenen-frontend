<template>
  <section
    :class="[
      'pt-medium pb-medium full-width content-grid',
      {
        ' bg-accent-50 dark:bg-primary-700': index % 2 === 1,
      },
    ]"
  >
    <TitleComponent :title="zone.Title" :index="index"></TitleComponent>
    <div v-if="props.zone.leaders?.data" class="member-section breakout">
      <button
        v-for="leader of props.zone.leaders.data"
        :key="leader.attributes.Name"
        class="user-card"
        :aria-label="leader.attributes.Name + ', ' + leader.attributes.Position"
      >
        <NuxtImg
          v-if="leader.attributes.Image?.data"
          class="image"
          format="webp"
          provider="strapi"
          :src="
            leader.attributes.Image.data.attributes.hash +
            leader.attributes.Image.data.attributes.ext
          "
          :alt="
            leader.attributes.Image.data.attributes.alternativeText ||
            leader.attributes.Image.data.attributes.name
          "
          sizes="100vw sm:50vw md:400px"
          :modifiers="{ breakpoint: 'small' }"
        />
        <div class="user-card__content">
          <h3>{{ leader.attributes.Name }}</h3>
          <p>{{ leader.attributes.Position }}</p>
          <a :href="'mailto:' + leader.attributes.Email">{{
            leader.attributes.Email
          }}</a>
        </div>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  zone: Group
  index: number
}>()
</script>

<style scoped lang="scss">
.member-section {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-medium);
  justify-content: center;
}
.user-card {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: max(16rem, 20vw);
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  cursor: pointer;
  border: none;

  .image,
  .user-card__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: var(--font-family);
    height: 100%;
    width: 100%;
    border-radius: 50%;
    font-size: 1rem;
    transition: all 1s ease;
  }

  .image {
    object-fit: cover;
  }

  .user-card__content {
    display: none;
  }

  &:hover .user-card__content,
  &:active .user-card__content,
  &:focus .user-card__content {
    display: block;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: var(--space-medium);
    background-color: color-mix(
      in srgb,
      var(--color-accent-50) 80%,
      transparent
    );
    color: var(--color-primary-900);
  }

  &:focus {
    outline: 0.2rem solid var(--color-primary-700);
  }
}

.user-card__content p {
  margin-top: 0;
}

.dark-mode {
  .user-card {
    &:hover .user-card__content,
    &:active .user-card__content,
    &:focus .user-card__content {
      background-color: color-mix(
        in srgb,
        var(--color-accent-900) 80%,
        transparent
      );
    }

    &:focus {
      outline: 0.2rem solid var(--color-primary-100);
    }
  }
}
</style>

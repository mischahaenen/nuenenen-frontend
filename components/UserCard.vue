<template>
  <button
    v-if="props.user"
    class="user-card"
    :aria-label="
      props.user.attributes.username + ', ' + props.user.attributes.Position
    "
  >
    <NuxtImg
      v-if="props.user.attributes.Picture.data"
      class="image"
      format="webp"
      :src="props.user.attributes.Picture.data.attributes.url"
      :alt="
        props.user.attributes.Picture.data.attributes.alternativeText ||
        props.user.attributes.Picture.data.attributes.name
      "
    />
    <div class="user-card__content">
      <h3>{{ props.user.attributes.username }}</h3>
      <p>{{ props.user.attributes.Position }}</p>
      <a :href="'mailto:' + props.user.attributes.email">{{
        props.user.attributes.email
      }}</a>
    </div>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  user: User
}>()
</script>

<style scoped lang="scss">
.user-card {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 250px;
  width: 250px;
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

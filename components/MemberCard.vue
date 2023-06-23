<template>
  <div v-if="user">
    <div class="member-card">
      <nuxt-img class="image" provider="strapi" :src="user[0].Picture.url" />
      <div class="member-card__content">
        <h3>{{ user[0].username }}</h3>
        <a :href="'mailto:' + user[0].email">{{ user[0].email }}</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: number
}>()

const user = await getStrapiUser(props.id)
</script>

<style scoped lang="scss">
.member-card {
  display: flex;
  flex-direction: column;
  padding: var(--space-medium);
  text-align: center;
  border-radius: var(--border-radius);
  box-shadow: 0px 50px 60px rgb(0 0 0 / 10%);

  .image {
    height: 200px;
    width: 200px;
    object-fit: cover;
    border-radius: 50%;
  }
}
.dark-mode {
  .member-card {
    background: var(--color-primary-800);
    box-shadow: 0px 50px 60px var(--color-primary-600);
  }
}
</style>

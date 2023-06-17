<template>
  <div class="container">
    <TitleComponent :title="zone.Title" :index="index"></TitleComponent>
    <div v-if="props.zone.members" class="member-section">
      <MemberCard
        v-for="member in props.zone.members.data"
        :id="member.id"
        :key="member.id"
      ></MemberCard>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  zone: IPageZone
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
</style>

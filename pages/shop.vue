<template>
  <div>
    <BaseBanner :title="page.title" :description="page.description" />
  </div>
</template>

<script lang="ts" setup>
const response = await getPage('shop')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const page = response.data[0].attributes
</script>

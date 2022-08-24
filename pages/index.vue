<template>
  <div>
    <BaseBanner />
  </div>
</template>
<script lang="ts" setup>
const response = await getPage('home')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const page = response.data[0].attributes
</script>

<template>
  <div>
    {{ page }}
  </div>
</template>
<script lang="ts" setup>
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const page = await getPage('mitmachen')
</script>

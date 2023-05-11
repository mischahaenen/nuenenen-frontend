<template>
  <h2 v-if="props.index % 2 !== 0">
    {{ props.title }}
  </h2>
  <h2 v-else>
    <span v-for="word in words" :key="word" class="word">
      <span
        v-for="letter in word"
        :key="letter"
        class="letter"
        :class="{ highlight: word === words.at(-1) }"
      >
        {{ letter }}
      </span>
      <span class="spacer"></span>
    </span>
  </h2>
</template>

<script setup lang="ts">
const props = defineProps<{ title: string | undefined; index: number }>()

const words = props.title?.split(' ') || []
</script>
<style scoped lang="scss">
.letter {
  color: var(--color-primary-900);
  display: inline-block;
  position: relative;

  &.highlight {
    color: var(--color-accent-900);
  }
}

.word {
  white-space: nowrap;
}

.spacer {
  display: inline-block;
  width: 10px;
}

.dark-mode {
  .letter {
    color: var(--color-white);
    &.highlight {
      color: var(--color-accent-50);
    }
  }
}
</style>

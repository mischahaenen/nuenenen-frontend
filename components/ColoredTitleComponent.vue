<template>
  <div v-if="props.title">
    <h2>
      <div>
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
      </div>
    </h2>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ title: string | undefined }>()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const words = props.title?.split(' ') || []
</script>

<style scoped lang="scss">
.letter {
  color: var(--color-white);
  display: inline-block;
  position: relative;
  color: #ffffff;

  &.highlight {
    color: var(--color-accent-50);
  }
}

.word {
  white-space: nowrap;
}

.spacer {
  display: inline-block;
  width: 10px;
}
</style>

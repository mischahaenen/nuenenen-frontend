<template>
  <div>
    <ul>
      <li
        v-for="color of ['system', 'light', 'dark']"
        :key="color"
        :class="{
          preferred: !$colorMode.unknown && color === $colorMode.preference,
          selected: !$colorMode.unknown && color === $colorMode.value,
        }"
      >
        <component
          :is="
            color === 'system'
              ? IconSystem
              : color === 'light'
              ? IconLight
              : IconDark
          "
          @click="$colorMode.preference = color"
        />
      </li>
    </ul>
  </div>
</template>
<script setup>
const IconSystem = resolveComponent('IconSystem')
const IconDark = resolveComponent('IconDark')
const IconLight = resolveComponent('IconLight')
</script>
<style scoped lang="scss">
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

ul li {
  display: inline-block;
  padding: 5px;
}

.feather {
  position: relative;
  top: 0;
  cursor: pointer;
  padding: 7px;
  margin: 0;
  border-radius: 5px;
  transition: all 0.1s ease;
}

.feather:hover {
  top: -3px;
}

.preferred .feather {
  border-color: var(--color-accent-500);
  top: -3px;
}

.selected .feather {
  color: var(--color-accent-500);
}

.dark-mode {
  svg {
    color: var(--color-white);
  }
}
</style>

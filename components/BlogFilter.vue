<template>
  <div class="filter-section">
    <div class="filter">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
        <path
          d="M20.5 35.5v-2.25h7v2.25Zm-8-10.75V22.5h23v2.25ZM6.5 14v-2.25h35V14Z"
        />
      </svg>
      <select id="steps" v-model="step" name="steps" @change="sortBlogPosts">
        <option value="All">Alle</option>
        <option value="Biberstufe">Biberstufe</option>
        <option value="Wolfsstufe">Wolfsstufe</option>
        <option value="Pfadistufe">Pfadistufe</option>
        <option value="Piostufe">Piostufe</option>
        <option value="Roverstufe">Roverstufe</option>
        <option value="Abteilung">Abteilung</option>
      </select>
    </div>
    <div class="sort">
      <svg
        :class="{ active: isGridView }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        @click="isGridView = true"
      >
        <path
          d="M7 22.35V7h15.35v15.35ZM7 41V25.65h15.35V41Zm18.65-18.65V7H41v15.35Zm0 18.65V25.65H41V41ZM9.25 20.1H20.1V9.25H9.25Zm18.65 0h10.85V9.25H27.9Zm0 18.65h10.85V27.9H27.9Zm-18.65 0H20.1V27.9H9.25ZM27.9 20.1Zm0 7.8Zm-7.8 0Zm0-7.8Z"
        />
      </svg>
      <svg
        :class="{ active: !isGridView }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        @click="isGridView = false"
      >
        <path
          d="M7.8 33.65q-.55 0-.925-.375T6.5 32.35q0-.55.375-.9t.925-.35q.55 0 .925.35t.375.9q0 .55-.375.925t-.925.375Zm0-8.35q-.55 0-.925-.375T6.5 24q0-.55.375-.925T7.8 22.7q.55 0 .925.375T9.1 24q0 .55-.375.925T7.8 25.3Zm0-8.4q-.55 0-.925-.35t-.375-.9q0-.55.375-.925t.925-.375q.55 0 .925.375t.375.925q0 .55-.375.9t-.925.35Zm6.8 16.6v-2.25h26.9v2.25Zm0-8.35v-2.3h26.9v2.3Zm0-8.4V14.5h26.9v2.25Z"
        />
      </svg>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { usePostStore } from '~~/store/post'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isGridView = useState<boolean>('isGridView', () => true)
const step = useState<string>('step', () => 'All')
const store = usePostStore()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sortBlogPosts = async () => {
  if (step.value === 'All') {
    await store.fetchAllPosts()
  } else {
    await store.filterPostsByStep(step.value)
  }
}
</script>
<style scoped lang="scss">
.filter-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-medium);
  margin-bottom: var(--space-medium);
}

.filter,
.sort {
  display: flex;
  align-items: center;
  gap: var(--space-small);
}

.active {
  padding: 5px;
  fill: var(--color-white) !important;
  background-color: var(--color-accent);
  border-radius: 50%;
}

.sort svg {
  fill: var(--color-black);
  transition: fill 0.2s ease-in-out;
  cursor: pointer;
}

.sort svg:hover {
  fill: var(--color-accent);
}

svg {
  width: 36px;
  height: 36px;
}

select {
  width: 100%;
  border: none;
  border-right: var(--space-medium) solid transparent;
  border-radius: var(--border-radius);
  padding: 10px var(--space-medium);
  color: var(--color-black);
  background-color: var(--color-white);
  transition: background-color 0.2s ease-in-out;
}

select:hover {
  background-color: var(--color-accent);
  color: var(--color-white);
}
</style>

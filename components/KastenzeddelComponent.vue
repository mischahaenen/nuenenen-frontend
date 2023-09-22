<template>
  <div class="event-details">
    <div class="calendar-item">
      <template
        v-if="props.kastenzeddel.StartDate === props.kastenzeddel.EndDate"
      >
        <p class="bold">
          {{ moment(props.kastenzeddel.StartDate).format('DD') }}
        </p>
        <p>
          {{ moment(props.kastenzeddel.StartDate).format('MMM') }}
        </p>
      </template>
      <template v-else>
        <p class="bold">
          {{ moment(props.kastenzeddel.StartDate).format('DD.MM') }}
        </p>
        <p>bis {{ moment(props.kastenzeddel.EndDate).format('DD.MM') }}</p>
      </template>
    </div>
    <div class="description-location">
      <h3>{{ props.kastenzeddel.Title }}</h3>
      <RichTextComponent
        :content="props.kastenzeddel.Description"
        :text-align="'left'"
      />
      <div class="flex">
        <div class="title">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path
              d="m627-287 45-45-159-160v-201h-60v225l174 181ZM480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-82 31.5-155t86-127.5Q252-817 325-848.5T480-880q82 0 155 31.5t127.5 86Q817-708 848.5-635T880-480q0 82-31.5 155t-86 127.5Q708-143 635-111.5T480-80Zm0-400Zm0 340q140 0 240-100t100-240q0-140-100-240T480-820q-140 0-240 100T140-480q0 140 100 240t240 100Z"
            />
          </svg>
        </div>
        <p>
          <template
            v-if="props.kastenzeddel.StartDate === props.kastenzeddel.EndDate"
          >
            <b>{{
              moment(props.kastenzeddel.StartTime, 'HH:mm:ss.SSS').format(
                'HH:mm'
              )
            }}</b>
            bis
            <b>{{
              moment(props.kastenzeddel.EndTime, 'HH:mm:ss.SSS').format('HH:mm')
            }}</b>
            Uhr
          </template>
          <template v-else>
            {{ moment(props.kastenzeddel.StartDate).format('DD. MMM. yyyy') }}
            am
            <b>{{
              moment(props.kastenzeddel.StartTime, 'HH:mm:ss.SSS').format(
                'HH:mm'
              )
            }}</b>
            Uhr bis
            {{ moment(props.kastenzeddel.EndDate).format('DD. MMM. yyyy') }} am
            <b>{{
              moment(props.kastenzeddel.EndTime, 'HH:mm:ss.SSS').format('HH:mm')
            }}</b>
            Uhr
          </template>
        </p>
      </div>
      <div class="flex">
        <div class="title">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24"
            viewBox="0 -960 960 960"
          >
            <path
              d="M480.089-490Q509-490 529.5-510.589q20.5-20.588 20.5-49.5Q550-589 529.411-609.5q-20.588-20.5-49.5-20.5Q451-630 430.5-609.411q-20.5 20.588-20.5 49.5Q410-531 430.589-510.5q20.588 20.5 49.5 20.5ZM480-159q133-121 196.5-219.5T740-552q0-117.79-75.292-192.895Q589.417-820 480-820t-184.708 75.105Q220-669.79 220-552q0 75 65 173.5T480-159Zm0 79Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-472Z"
            />
          </svg>
        </div>
        <p>{{ props.kastenzeddel.Location }}</p>
      </div>
      <button class="button primary-button" @click="deregister()">
        Abmelden
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment'
import { useDeregisterStore } from '~/store/deregister'
const props = defineProps<{
  kastenzeddel: Kastenzeddel
  step: string
}>()
const deregister = async () => {
  const deregisterStore = useDeregisterStore()
  deregisterStore.setStep(props.step)
  await navigateTo('/kontakt')
}
</script>

<style scoped lang="scss">
h3 {
  margin-top: 0;
  text-align: left;
}

svg {
  path {
    fill: var(--color-primary-90);
  }
}
.event-details {
  display: flex;
  gap: var(--space-large);
}
.calendar-item {
  padding: var(--space-medium);
  background-color: var(--color-accent-100);
  border-radius: var(--border-radius);
  width: min(250px, 100%);
  height: min(250px, 100%);

  p {
    margin: 0;
    font-size: xx-large;
  }

  .bold {
    font-weight: 700;
    font-size: 48pt;
  }
}
.flex {
  display: flex;
  align-items: center;
  gap: var(--space-small);
}
.title {
  display: flex;
  align-items: center;
  p {
    font-weight: 700;
  }
}

.dark-mode {
  .calendar-item {
    background-color: var(--color-accent-900);
  }

  svg {
    path {
      fill: var(--color-primary-50);
    }
  }
}

@media (max-width: 768px) {
  .event-details {
    flex-direction: column;
  }
  .calendar-item {
    width: 100%;
    height: 100%;
  }
}
</style>

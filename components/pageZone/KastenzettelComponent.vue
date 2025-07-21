<template>
  <section
    :class="[
      'pt-medium pb-medium content-grid',
      {
        'full-width bg-accent-50 dark:bg-primary-700': props.index % 2 === 1,
      },
    ]"
  >
    <TitleComponent title="Nächste Aktivität" :index="props.index"></TitleComponent>
    <div class="event-details">
      <div class="calendar-item">
        <template v-if="props.zone.StartDate === props.zone.EndDate">
          <p class="bold">
            {{ format(new Date(props.zone.StartDate), "dd") }}
          </p>
          <p>
            {{ format(new Date(props.zone.StartDate), "MMMM", { locale: de }) }}
          </p>
        </template>
        <template v-else>
          <p class="bold">
            {{ format(new Date(props.zone.StartDate), "dd.MM", { locale: de }) }}
          </p>
          <p>
            bis
            {{ format(new Date(props.zone.EndDate), "dd.MM", { locale: de }) }}
          </p>
        </template>
      </div>
      <div class="description-location">
        <h3>{{ props.zone.Title }}</h3>
        <RichTextComponent :content="props.zone.Description" />
        <ul>
          <li>
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
            <span>
              <template v-if="props.zone.StartDate === props.zone.EndDate">
                <b>{{
                  format(parse(props.zone.StartTime, "HH:mm:ss", new Date()), "HH:mm")
                }}</b>
                bis
                <b>{{
                  format(parse(props.zone.EndTime, "HH:mm:ss", new Date()), "HH:mm")
                }}</b>
                Uhr
              </template>
              <template v-else>
                {{
                  format(new Date(props.zone.StartDate), "dd. MMM. yyyy", {
                    locale: de,
                  })
                }}
                um
                <b>{{
                  format(parse(props.zone.StartTime, "HH:mm:ss", new Date()), "HH:mm")
                }}</b>
                Uhr bis
                {{
                  format(new Date(props.zone.EndDate), "dd. MMM. yyyy", {
                    locale: de,
                  })
                }}
                um
                <b>{{
                  format(parse(props.zone.EndTime, "HH:mm:ss", new Date()), "HH:mm")
                }}</b>
                Uhr
              </template>
            </span>
          </li>
          <li>
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
            {{ props.zone.Location }}
          </li>
        </ul>
        <button class="btn btn-primary mt-medium" @click="deregister()">Abmelden</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts" defer>
import { format, parse } from "date-fns";
import { de } from "date-fns/locale";
import { useDeregisterStore } from "~/store/deregister";

const props = defineProps<{
  zone: KastenzettelZone;
  index: number;
}>();
const deregister = async () => {
  const route = useRoute();
  const deregisterStore = useDeregisterStore();

  // Extract step from URL params (gets the step name from /abteilung/stepname)
  const stepSlug = Array.isArray(route.params.slug)
    ? route.params.slug[1]
    : route.params.slug;

  // Set the step in the store
  deregisterStore.setStep(stepSlug);

  // Navigate to contact page
  await navigateTo("/kontakt");
};
</script>

<style scoped lang="scss">
h3 {
  margin-top: 0;
}

svg {
  path {
    fill: var(--color-primary-90);
  }
}
.event-details {
  display: flex;
  align-items: center;
  gap: var(--space-medium);
}
.calendar-item {
  padding: var(--space-medium);
  background-color: var(--color-accent-100);
  border-radius: var(--border-radius);
  width: min(250px, 100%);
  height: min(250px, 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    margin: 0;
    font-size: xx-large;
  }

  .bold {
    font-weight: 700;
    font-size: 48pt;
  }
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

li {
  display: flex;
  align-items: center;
  gap: 12px;
}

svg {
  flex-shrink: 0;
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

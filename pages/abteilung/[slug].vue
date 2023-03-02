<template>
  <div v-if="step">
    <BaseBanner
      :title="step.Name"
      :description="step.Description"
      :is-rich-text="true"
    />
    <div
      v-for="(zone, index) in step.pageZone"
      :key="index"
      :class="index % 2 === 0 ? 'colored-section' : 'section'"
    >
      <div v-if="zone.__component == 'pages.section'" class="container">
        <h2 v-if="index % 2 !== 0">{{ zone.Title }}</h2>
        <ColoredTitleComponent v-else :title="zone.Title" />
        <div v-if="zone.Description">
          <RichTextComponent :content="zone.Description" />
        </div>
      </div>
      <div v-if="zone.__component == 'pages.event'" class="container">
        <h2 v-if="index % 2 !== 0">
          {{ zone.Title }}
        </h2>
        <ColoredTitleComponent v-else :title="zone.Title" />
        <div>
          <h3>{{ step.event.data.attributes.Title }}</h3>
          <div class="space-medium">
            <div class="flex">
              <div class="title">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  width="24"
                  viewBox="0 96 960 960"
                >
                  <path
                    d="m275.309 780.691 268.844-139.922 139.923-268.845-268.845 139.923-139.922 268.844ZM480 616q-17 0-28.5-11.5T440 576q0-17 11.5-28.5T480 536q17 0 28.5 11.5T520 576q0 17-11.5 28.5T480 616Zm.067 339.999q-78.221 0-147.397-29.92-69.176-29.92-120.989-81.71-51.814-51.791-81.747-120.936-29.933-69.146-29.933-147.366 0-78.836 29.92-148.204 29.92-69.369 81.71-120.682 51.791-51.314 120.936-81.247 69.146-29.933 147.366-29.933 78.836 0 148.204 29.92 69.369 29.92 120.682 81.21 51.314 51.291 81.247 120.629 29.933 69.337 29.933 148.173 0 78.221-29.92 147.397-29.92 69.176-81.21 120.989-51.291 51.814-120.629 81.747-69.337 29.933-148.173 29.933ZM480 910.615q139.692 0 237.154-97.769Q814.615 715.077 814.615 576q0-139.692-97.461-237.154Q619.692 241.385 480 241.385q-139.077 0-236.846 97.461Q145.385 436.308 145.385 576q0 139.077 97.769 236.846T480 910.615ZM480 576Z"
                  />
                </svg>
                <p>Treffpunkt:</p>
              </div>
              <p>{{ step.event.data.attributes.Location }}</p>
            </div>
            <div class="flex">
              <div class="title">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  width="24"
                  viewBox="0 96 960 960"
                >
                  <path
                    d="m630.077 760.538 33.845-33.845-159-160.01V366.462h-45.383v218.845l170.538 175.231Zm-150.01 195.461q-78.221 0-147.397-29.92-69.176-29.92-120.989-81.71-51.814-51.791-81.747-120.936-29.933-69.146-29.933-147.366 0-78.221 29.92-147.397 29.92-69.176 81.71-120.989 51.791-51.814 120.936-81.747 69.146-29.933 147.366-29.933 78.221 0 147.397 29.92 69.176 29.92 120.989 81.71 51.814 51.791 81.747 120.936 29.933 69.146 29.933 147.366 0 78.221-29.92 147.397-29.92 69.176-81.71 120.989-51.791 51.814-120.936 81.747-69.146 29.933-147.366 29.933ZM480 576Zm0 334.615q138.077 0 236.346-98.269T814.615 576q0-138.077-98.269-236.346T480 241.385q-138.077 0-236.346 98.269T145.385 576q0 138.077 98.269 236.346T480 910.615Z"
                  />
                </svg>
                <p>Zeitpunkt:</p>
              </div>
              <p>
                {{
                  moment(step.event.data.attributes.DateStart).format(
                    'hh:mm DD.MM.YY'
                  )
                }}
                bis
                {{
                  moment(step.event.data.attributes.DateEnd).format(
                    'hh:mm DD.MM.YY'
                  )
                }}
              </p>
            </div>
          </div>
          <div class="title">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              width="24"
              viewBox="0 96 960 960"
            >
              <path
                d="M329.385 798.692h301.23v-45.384h-301.23v45.384Zm0-167.308h301.23v-45.383h-301.23v45.383Zm-91.691 324.615q-23.529 0-40.611-17.082-17.082-17.082-17.082-40.611V253.694q0-23.529 17.082-40.611 17.082-17.082 40.611-17.082h347.537l194.768 194.768v507.537q0 23.529-17.082 40.611-17.082 17.082-40.611 17.082H237.694ZM562.539 411.23V241.385H237.694q-4.616 0-8.463 3.846-3.846 3.847-3.846 8.463v644.612q0 4.616 3.846 8.463 3.847 3.846 8.463 3.846h484.612q4.616 0 8.463-3.846 3.846-3.847 3.846-8.463V411.23H562.539ZM225.385 241.385V411.23 241.385v669.23V241.385Z"
              />
            </svg>
            <h3>Beschreibung</h3>
          </div>
          <RichTextComponent
            :content="step.event.data.attributes.Description"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import moment from 'moment'
const route = useRoute()
const stepRes = await getStep(route.params.slug as string)
const step = stepRes.data[0].attributes
// navigate to 404 page when no slug is found
if (!step) await navigateTo('/not-found')
useHead({
  title: `Pfadi Nünenen - ${step.Name}`,
})
</script>
<style scoped lang="scss">
.container {
  margin: 6rem auto var(--space-large) auto;

  h3 {
    margin: var(--space-medium) 0 0 0;
    font-weight: 300;
    color: var(--color-accent-50);
  }
  svg {
    fill: var(--color-white);
    height: 24;
    width: 24;
    margin-right: var(--space-small);
  }
  .flex {
    display: flex;
    align-items: center;
    gap: var(--space-small);
  }
  .title {
    display: flex;
    align-items: center;
    color: var(--color-white);

    h3 {
      margin: 0;
    }
    p {
      font-weight: 700;
    }
  }
  .space-medium {
    margin: var(--space-medium) 0;
  }
}
</style>

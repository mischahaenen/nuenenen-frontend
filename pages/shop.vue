<template>
  <div>
    <BaseBanner :title="page.title" :description="page.description" />
    <div
      v-for="(zone, index) in page.pageZone"
      :key="index"
      :class="index % 2 === 0 ? 'colored-section' : 'section'"
    >
      <div class="container">
        <h2>{{ zone.Title }}</h2>
        <div v-if="zone.Description">
          <RichTextComponent :content="zone.Description" />
        </div>
        <div v-if="zone.__component === 'pages.blog'">
          <div class="post-grid">
            <PostComponent v-for="post in posts" :key="post.id" :post="post" />
          </div>
        </div>
        <div v-if="zone.__component === 'pages.event'">
          <EventComponent
            v-for="event in events"
            :key="event.id"
            :event="event"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const response = await getPage('shop')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const page = response.data[0].attributes
</script>

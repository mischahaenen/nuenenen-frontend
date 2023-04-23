<template>
  <footer v-if="footer">
    <img src="../assets/svg/woods.svg" alt="woods with birds" />
    <div class="footer-content">
      <div>
        <h2>{{ footer.Title }}</h2>
        <ul>
          <li v-for="link of footer.Links" :key="link.Link">
            <a :href="link.Link">{{ link.Name }}</a>
          </li>
        </ul>
      </div>
      <div>
        <h2>Kontakt</h2>
      </div>
      <div>
        <h2>Soziale Medien</h2>
      </div>
      <div class="sponsorLogo">
        <h2>Sponsoren</h2>
        <img
          v-for="image of footer.Images.data"
          :key="image.attributes.name"
          :src="strapiUrl + image.attributes.url"
          :alt="image.attributes.name"
        />
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const strapiUrl = useStrapiUrl()
const footerRes = await getFooter()
const footer = footerRes.data.attributes || null
</script>

<style scoped lang="scss">
.footer-content {
  background-color: var(--color-primary-900);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--space-large);
  color: var(--color-white);
  padding: var(--space-large);
}

h2 {
  color: var(--color-white);
}

a,
ul,
li {
  color: var(--color-white);
  text-decoration: none;
  list-style-type: none;
  padding-left: 0;
}

a:hover {
  text-decoration: underline;
}

footer {
  margin-top: var(--space-extra-large);
}

.sponsorLogo {
  display: flex;
  flex-direction: column;
  gap: var(--space-small);
  img {
    width: 300px;
    height: auto;
  }
}
</style>

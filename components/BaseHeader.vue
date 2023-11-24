<template>
  <header class="header" :class="{ 'header-scrolled': scroll > 50 }">
    <nuxt-link
      to="/home"
      :class="['home-link', { 'home-link-scrolled': scroll > 50 }]"
    >
      <p><b>PFADI</b> NÜNENEN</p>
    </nuxt-link>

    <nav class="nav" :class="{ 'nav-expanded': navExpanded }">
      <button
        class="nav-toggle"
        @click="toggleNav"
        aria-label="Toggle navigation"
      >
        <span class="toggle-line"></span>
        <span class="toggle-line"></span>
        <span class="toggle-line"></span>
      </button>
      <ul class="nav-links">
        <li
          v-for="page in pages"
          :key="page.attributes.slug"
          :class="[
            'nav-item',
            { 'nav-item-expandable': page.attributes.pageZone.length },
          ]"
        >
          <nuxt-link :to="`/${page.attributes.url}`"
            >{{ page.attributes.slug
            }}<svg
              v-if="page.attributes.pageZone.length"
              class="chevron"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path
                d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"
              /></svg
          ></nuxt-link>
          <ul v-if="page.attributes.pageZone.length" class="submenu">
            <li
              v-for="step in (page.attributes.pageZone[0] as StepZone).steps.data"
              :key="step.id"
            >
              <nuxt-link
                :to="`/${page.attributes.url}/${step.attributes.Slug}`"
                >{{ step.attributes.Name }}</nuxt-link
              >
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts" setup>
const scroll = useScrollY()
const navExpanded = useState(() => false)
const pages = useState<Page[]>(() => [])

onMounted(async () => {
  const pagesResponse = await getPageNavigation()
  pages.value = pagesResponse.data
})

const toggleNav = () => {
  navExpanded.value = !navExpanded.value
}
</script>

<style scoped lang="scss">
a.router-link-active {
  font-weight: bold;
}
.header {
  padding: 0 var(--space-large);
  position: fixed;
  width: 100%;
  top: 0;
  height: 6rem;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.3s ease, height 0.3s ease;
}

.header-scrolled {
  background-color: var(--color-white);
  height: 4rem;
  color: var(--color-black);
  transition: background-color 0.3s ease;
  transition: height 0.3s ease;
  box-shadow: 0 2px 4px #0000001a;
}

.home-link,
.home-link-scrolled {
  text-decoration: none;
  word-spacing: 0.2rem;
  letter-spacing: 0.05rem;
}

.home-link b,
.home-link-scrolled b {
  color: var(--color-primary-500);
}

.nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
}

.nav-item a {
  text-decoration: none;
}

.nav-toggle {
  display: none;
}

.nav-item-expandable {
  position: relative;
}

.nav-item-expandable a {
  display: flex;
  align-items: center;
}

.chevron {
  transform: rotate(0deg);
  transition: transform 0.3s ease;
}

.nav-item-expandable:hover .chevron,
.nav-item-expandable:focus-within .chevron {
  transform: rotate(180deg);
}

.nav-item-expandable:hover .submenu,
.nav-item-expandable:focus-within .submenu {
  display: block;

  .chevron {
    transform: rotate(180deg);
  }
}

.submenu {
  display: none;
  position: absolute;
  left: 0;
  background-color: var(--color-white);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: var(--space-small);
  text-align: left;
  list-style: none;
  z-index: 20;
}

.submenu li {
  padding: 0.5rem 1rem 0.5rem 0;
  border-bottom: var(--color-primary-50) 1px solid;
}

.submenu li:last-child {
  border-bottom: none;
}

.nav-item:last-child a {
  background: var(--color-accent-700);
  color: var(--color-white);
  transition: all 0.2s ease-in-out;
  outline-color: var(--color-accent-50);
  text-decoration: none;
  border: none;
  padding: var(--space-small);
  border-radius: var(--border-radius);
  cursor: pointer;
  font-weight: 700;

  &:hover {
    background-color: var(--color-accent-500);
  }
}

.dark-mode {
  .nav-link > * {
    color: var(--color-white);
  }
  .header-scrolled {
    background-color: var(--color-primary-700);
    color: var(--color-white);
  }
  .home-link {
    p {
      color: var(--color-white);
    }
  }

  .home-link b {
    color: var(--color-accent-100);
  }
  .home-link-scrolled {
    p {
      color: var(--color-white);
    }
    b {
      color: var(--color-accent-100);
    }
  }

  .nav-item-expandable {
    svg {
      fill: var(--color-accent-50);
    }
  }

  .submenu {
    background-color: var(--color-primary-700);
    box-shadow: 0 2px 4px rgba(255, 255, 255, 0.1);
  }

  .submenu li {
    border-bottom: var(--color-primary-500) 1px solid;
  }

  .submenu li:last-child {
    border-bottom: none;
  }

  @media screen and (max-width: 768px) {
    .header {
      padding: 0 var(--space-medium);
    }

    .nav-toggle {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
    }

    .toggle-line {
      width: 30px;
      height: 2px;
      background-color: var(--color-white);
      margin: 4px 0;
      transition: background-color 0.3s ease;
    }

    .nav-expanded .nav-link {
      background-color: var(--color-primary-800);
      box-shadow: 0 2px 4px #ffffff1a;
    }
    .header-scrolled .nav-expanded .nav-link {
      margin-top: 20px;
    }
  }
}

@media screen and (max-width: 768px) {
  .header {
    padding: 0 var(--space-medium);
  }

  .nav-toggle {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }

  .nav-links {
    display: none;
  }

  .toggle-line {
    width: 30px;
    height: 2px;
    background-color: var(--color-primary-800);
    margin: 4px 0;
    transition: background-color 0.3s ease;
  }

  .nav-expanded .toggle-line:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  .nav-expanded .toggle-line:nth-child(2) {
    opacity: 0;
  }

  .nav-expanded .toggle-line:nth-child(3) {
    transform: rotate(-45deg) translate(9px, -9px);
  }

  .nav-link {
    display: none;
  }

  .nav {
    transform: translateY(0px);
    transition: transform 0.3s ease;
  }

  .nav-expanded {
    transform: translateY(120px);
    transition: transform 0.3s ease;
  }

  .nav-expanded .nav-link {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 40px;
    padding: 1rem;
    border-radius: 10px;
    background-color: var(--color-white);
    box-shadow: 0 2px 4px #0000001a;
  }

  .header-scrolled .nav-expanded {
    transform: translateY(110px);
  }
  .header-scrolled .nav-expanded .nav-link {
    margin-top: 20px;
  }
}
</style>

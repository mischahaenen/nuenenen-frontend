<template>
  <header class="header" :class="{ 'header-scrolled': scroll > 50 }">
    <a class="skip-main" href="#main">Zum Hauptinhalt</a>
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path
            d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"
          />
        </svg>
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
a.skip-main {
  position: absolute;
  left: -999px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
  z-index: -1;
}
a.skip-main:focus,
a.skip-main:active {
  color: var(--color-primary-50);
  background-color: var(--color-primary-500);
  left: 0;
  top: 0;
  width: 200px;
  height: auto;
  overflow: auto;
  border-radius: 5px;
  padding: 0.25rem;
  text-align: center;
  z-index: 999;
}
.nav-links {
  a.router-link-active {
    font-weight: bold;
  }
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
    .nav-links {
      background-color: var(--color-primary-800);
      box-shadow: 0px 25px 30px rgb(255 255 255 / 20%);
    }
  }
}

@media (max-width: 768px) {
  .header {
    padding: 0 var(--space-medium);
  }
  .nav {
    position: relative;
  }
  .nav-toggle {
    display: block;
    background: var(--color-accent-700);
    border-radius: var(--border-radius);
    padding: 0.5rem;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    svg {
      fill: var(--color-white);
    }
  }

  .nav-toggle:focus,
  .nav-toggle:hover {
    outline-color: var(--color-accent-50);
    background: var(--color-accent-500);
  }

  .nav-links {
    position: absolute;
    top: 50px;
    right: 0;
    width: 200px;
    display: none;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem;
    background-color: var(--color-white);
    box-shadow: 0px 25px 30px rgb(0 0 0 / 20%);
    border-radius: 10px;
    transition: all 0.2s ease-in-out;
  }

  .nav-item {
    width: 100%;
    a {
      display: block;
      padding: 0.5rem 1rem 0.5rem 0;
      border-bottom: var(--color-primary-50) 1px solid;
    }
  }

  .nav-expanded .nav-links {
    display: flex;
  }

  .nav-item:last-child {
    border-bottom: none;
    text-align: center;
  }

  .nav-item-expandable {
    position: unset;
    display: block;
  }

  .submenu {
    position: unset;
    display: none;
    background-color: transparent !important;
    box-shadow: none !important;
    text-align: left;
    list-style: none;

    li {
      border-bottom: none !important;
    }
  }
}
</style>

<template>
  <template v-if="error">
    <p>{{ error }}</p>
    <p>{{ navigation }}</p>
  </template>
  <template v-if="navigation">
    <header class="header" :class="{ 'header-scrolled': scroll > 50 }">
      <a class="skip-main" href="#main">Zum Hauptinhalt</a>
      <nuxt-link to="/home" :class="['home-link', { 'home-link-scrolled': scroll > 50 }]">
        <NuxtImg
          class="header-logo"
          src="img/nuenenen_logo.webp"
          alt="Logo der Pfadi Nünenen"
        />
        <p><b>PFADI</b> NÜNENEN</p>
      </nuxt-link>

      <nav
        v-if="navigation"
        class="nav"
        :class="{ 'nav-expanded': navExpanded }"
        aria-label="Navigation"
      >
        <button class="nav-toggle" aria-label="Toggle navigation" @click="toggleNav">
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
          <li v-for="page in navigation.data.pages" :key="page.slug" class="nav-item">
            <nuxt-link :to="`/${page.url}`" @click="toggleNav"
              >{{ page.slug }}
            </nuxt-link>
          </li>
        </ul>
      </nav>
      <nav v-else aria-label="Navigation">
        <ul class="nav-links">
          <li class="nav-item">
            <nuxt-link to="/home">Home</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/kontakt">Kontakt</nuxt-link>
          </li>
        </ul>
      </nav>
    </header>
  </template>
</template>

<script lang="ts" setup>
import { useNavigationApi } from "~/composables/api/modules/navigation";

const scroll = useScrollY();
const navExpanded = useState(() => false);
const { getNavigation } = useNavigationApi();

const { data: navigation, error } = await useAsyncData("navigation", () =>
  getNavigation()
);

const toggleNav = () => {
  navExpanded.value = !navExpanded.value;
};
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
  display: flex;
  align-items: center;
  gap: 1rem;
}
.home-link p {
  font-family: var(--font-heading);
}
.header-logo {
  width: 60px;
  height: 60px;
  aspect-ratio: 1 / 1;
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
  gap: 2rem;

  @include breakpoint-xl {
    gap: 4rem;
  }
}

.nav-item a {
  text-decoration: none;
}

.nav-toggle {
  display: none;
}

.nav-item:last-child a {
  background-color: var(--color-primary-700);
  color: var(--color-white);
  transition: all 0.2s ease-in-out;
  outline-color: var(--color-primary-50);
  text-decoration: none;
  border: none;
  padding: var(--space-small);
  border-radius: var(--border-radius);
  cursor: pointer;
  font-weight: 700;

  &:hover {
    background-color: var(--color-primary-600);
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

  .nav-item:last-child a {
    background: var(--color-accent-700);
    color: var(--color-white);
    outline-color: var(--color-accent-50);

    &:hover {
      background-color: var(--color-accent-600);
      color: var(--color-white);
    }
  }

  @include breakpoint-lg {
    .nav-links {
      background-color: var(--color-primary-800);
      box-shadow: 0px 25px 30px rgb(255 255 255 / 20%);
    }
  }
}

@include breakpoint-lg {
  .header {
    padding: 0 var(--space-medium);
  }
  .nav {
    position: relative;
  }
  .nav-toggle {
    display: block;
    background: var(--color-accent-700);
    border-radius: 50%;
    padding: 0.5rem;
    border: none;
    cursor: pointer;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
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
}
</style>

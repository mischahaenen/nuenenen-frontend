<template>
  <header class="header" :class="{ 'header-scrolled': scroll > 50 }">
    <div>
      <nuxt-link
        to="/home"
        :class="scroll > 50 ? 'home-link-scrolled' : 'home-link'"
      >
        <p><b>PFADI</b> NÜNENEN</p>
      </nuxt-link>
    </div>
    <nav class="nav" :class="{ 'nav-expanded': navExpanded }">
      <div class="nav-toggle" @click="toggleNav">
        <div class="toggle-line"></div>
        <div class="toggle-line"></div>
        <div class="toggle-line"></div>
      </div>
      <div class="nav-links">
        <nuxt-link to="/home">Home</nuxt-link>
        <nuxt-link to="/abteilung">Abteilung</nuxt-link>
        <nuxt-link to="/mitmachen">Mitmachen</nuxt-link>
        <nuxt-link class="link-button" to="/kontakt">Kontakt</nuxt-link>
      </div>
    </nav>
  </header>
</template>

<script lang="ts" setup>
const scroll = useScrollY()
const navExpanded = useState(() => false)

function toggleNav() {
  navExpanded.value = !navExpanded.value
}
</script>

<style scoped lang="scss">
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
}

.header-scrolled {
  background-color: var(--color-white);
  height: 4rem;
  color: var(--color-black);
  transition: background-color 0.3s ease;
  transition: height 0.3s ease;
  box-shadow: 0 2px 4px #0000001a;
}

.home-link {
  text-decoration: none;
  color: var(--color-black);
  word-spacing: 0.2rem;
  letter-spacing: 0.05rem;
}

.home-link b {
  color: var(--color-primary-500);
}

.home-link-scrolled {
  text-decoration: none;
  color: var(--color-black);
  word-spacing: 0.2rem;
  letter-spacing: 0.05rem;
}

.home-link-scrolled b {
  color: var(--color-primary-500);
}

.nav-links {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
}

.nav-links > * {
  color: var(--color-black);
  text-decoration: none;
}

.nav-links > *:last-of-type {
  margin: 0;
}

.nav-links > .router-link-active {
  font-weight: bold;
}
.dark-mode {
  .nav-links > * {
    color: var(--color-white);
  }
  .header-scrolled {
    background-color: var(--color-primary-800);
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

    .nav-expanded .nav-links {
      background-color: var(--color-primary-800);
      box-shadow: 0 2px 4px #ffffff1a;
    }
    .header-scrolled .nav-expanded .nav-links {
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

  .nav-links {
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

  .nav-expanded .nav-links {
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
  .header-scrolled .nav-expanded .nav-links {
    margin-top: 20px;
  }
}
</style>

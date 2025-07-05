<template>
  <div :class="['cookie-consent', { display: !consentGiven }]">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
    >
      <path
        d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-75 29-147t81-128.5q52-56.5 125-91T475-881q21 0 43 2t45 7q-9 45 6 85t45 66.5q30 26.5 71.5 36.5t85.5-5q-26 59 7.5 113t99.5 56q1 11 1.5 20.5t.5 20.5q0 82-31.5 154.5t-85.5 127q-54 54.5-127 86T480-80Zm-60-480q25 0 42.5-17.5T480-620q0-25-17.5-42.5T420-680q-25 0-42.5 17.5T360-620q0 25 17.5 42.5T420-560Zm-80 200q25 0 42.5-17.5T400-420q0-25-17.5-42.5T340-480q-25 0-42.5 17.5T280-420q0 25 17.5 42.5T340-360Zm260 40q17 0 28.5-11.5T640-360q0-17-11.5-28.5T600-400q-17 0-28.5 11.5T560-360q0 17 11.5 28.5T600-320ZM480-160q122 0 216.5-84T800-458q-50-22-78.5-60T683-603q-77-11-132-66t-68-132q-80-2-140.5 29t-101 79.5Q201-644 180.5-587T160-480q0 133 93.5 226.5T480-160Zm0-324Z"
      />
    </svg>
    <p>
      Um für unsere Besucher*innen die Bedienung unserer Website möglichst angenehm zu
      gestalten, benutzen wir Cookies. Darüber hinaus setzen wir Tracking-Tools ein, damit
      wir unsere Seite laufend verbessern können. Durch die weitere Nutzung dieser Website
      erklären Sie sich mit der Nutzung von Cookies, sowie dem Tracking-Tool Google
      Analytics einverstanden.
    </p>
    <div class="button-section">
      <button class="btn btn-primary" @click="giveConsent">Einverstanden</button>
      <NuxtLink class="btn btn-accent btn-link" to="/datenschutz">Mehr erfahren</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const consentGiven = useState("cookie-consent", () => false);
const { grantConsent } = useGtag();

onMounted(() => {
  consentGiven.value = localStorage.getItem("pfadi_nunenen_cookie_consent") === "true";
});

const giveConsent = () => {
  localStorage.setItem("pfadi_nunenen_cookie_consent", "true");
  grantConsent("G-F1TXT7Y96H");
  consentGiven.value = true;
};
</script>

<style scoped lang="scss">
.cookie-consent {
  position: fixed;
  display: none;
  align-items: center;
  background-color: var(--color-primary-50);
  padding: 2rem;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 0;
}

.cookie-consent.display {
  display: flex;
}

.cookie-consent svg {
  height: 100px;
  width: auto;
  margin-right: 2rem;

  path {
    fill: var(--color-primary-500);
  }
}

.dark-mode {
  .cookie-consent {
    background-color: var(--color-accent-900);
  }

  .cookie-consent svg {
    path {
      fill: var(--color-accent-50);
    }
  }
}

.button-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;
}

@media screen and (max-width: 768px) {
  .cookie-consent {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
  }

  .cookie-consent svg {
    display: none;
  }

  .button-section {
    margin-left: 0;
  }
}
</style>

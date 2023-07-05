<template>
  <div>
    <form class="form" @submit.prevent="submitForm">
      <div class="formfield">
        <label for="firstname">Vorname:</label>
        <input
          class="forminput"
          :class="{ even: !isOdd }"
          placeholder="Vorname"
          type="text"
          id="firstname"
          v-model="form.firstname"
          required
        />
      </div>
      <div class="formfield">
        <label for="lastname">Nachname:</label>
        <input
          class="forminput"
          :class="{ even: !isOdd }"
          placeholder="Nachname"
          type="text"
          id="lastname"
          v-model="form.lastname"
          required
        />
      </div>
      <div class="formfield">
        <label for="email">Email:</label>
        <input
          class="forminput"
          :class="{ even: !isOdd }"
          placeholder="Email Adresse"
          type="email"
          id="email"
          v-model="form.email"
          required
        />
      </div>
      <div class="formfield">
        <label for="message">Deine Nachricht:</label>
        <textarea
          class="forminput"
          :class="{ even: !isOdd }"
          placeholder="Hier deine Nachricht..."
          id="message"
          v-model="form.message"
          required
        ></textarea>
      </div>
      <div class="formfield">
        <label for="contact">Kontakt:</label>
        <select
          class="forminput"
          :class="{ even: !isOdd }"
          id="contact"
          v-model="form.contactOption"
          aria-label="Select contact type"
        >
          <option value="Abteilung">Abteilung</option>
          <option value="Biberstufe">Biberstufe</option>
          <option value="Wolfstufe">Wolfstufe</option>
          <option value="Pfadistufe">Pfadistufe</option>
          <option value="Piostufe">Piostufe</option>
          <option value="Roverstufe">Roverstufe</option>
        </select>
      </div>
      <button
        class="button primary-button"
        type="submit"
        aria-label="Submit form"
      >
        Absenden
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useReCaptcha } from 'vue-recaptcha-v3'
const props = defineProps<{
  index?: number
}>()
const isOdd = computed(() => {
  return props.index ? props.index % 2 === 0 : true
})
const form = ref({
  firstname: '',
  lastname: '',
  email: '',
  message: '',
  contactOption: 'Abteilung',
})
const recaptchaInstance = useReCaptcha()

const recaptcha = async () => {
  await recaptchaInstance?.recaptchaLoaded()
  const token = await recaptchaInstance?.executeRecaptcha('submit')
  return token
}

const submitForm = async () => {
  const token = await recaptcha()
  const response = await createContactEntry(token, form.value)

  form.value = {
    firstname: '',
    lastname: '',
    email: '',
    message: '',
    contactOption: 'Abteilung',
  }
}
</script>

<style scoped lang="scss">
.form {
  display: grid;
  grid-template-columns: 2;
  gap: var(--space-medium);
}

.formfield {
  grid-column: span 2;
}
.formfield:first-child,
.formfield:nth-child(2) {
  grid-column: span 1;
}

@media screen and (max-width: 768px) {
  .formfield:first-child,
  .formfield:nth-child(2) {
    grid-column: span 2;
  }
}

.formfield {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;

  label {
    font-weight: 700;
    color: var(--color-primary-700);
  }
}

.forminput {
  width: 100%;
  padding: var(--space-small);
  border-radius: 10px;
  border: none;
  color: var(--color-primary-700);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1rem;
  background-color: var(--color-primary-50);
}

.even {
  background-color: var(--color-white);
}

textarea {
  resize: vertical;
  min-height: 200px;
}

select {
  font-weight: 700;
}

.forminput:focus {
  outline: solid 2px var(--color-primary-500);
}

.button {
  margin-top: var(--space-medium);
  grid-column: span 2;
}

.dark-mode {
  label {
    color: var(--color-primary-50);
  }
  .forminput {
    border-color: var(--color-primary-100);
    color: var(--color-primary-100);
    background-color: var(--color-primary-800);
  }

  .even {
    background-color: var(--color-primary-900);
  }

  .forminput:focus {
    outline: solid 2px var(--color-accent-50);
  }
}
</style>

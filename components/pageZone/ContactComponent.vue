<template>
  <section
    :class="[
      'pt-medium pb-medium',
      {
        'full-width content-grid bg-accent-50 dark:bg-primary-700': props.index % 2 === 1,
      },
    ]"
  >
    <TitleComponent :title="props.zone.Title" :index="props.index"></TitleComponent>
    <RichTextComponent :content="props.zone.Description"></RichTextComponent>
    <form v-if="mailState === 'UNKNOWN'" class="form" @submit.prevent="submitForm">
      <div class="formfield">
        <label for="Firstname">Vorname (& Pfadiname):</label>
        <input
          id="Firstname"
          v-model="form.Firstname"
          class="forminput"
          :class="{ even: !isOdd }"
          placeholder="Vorname"
          type="text"
          required
        />
      </div>
      <div class="formfield">
        <label for="Lastname">Nachname:</label>
        <input
          id="Lastname"
          v-model="form.Lastname"
          class="forminput"
          :class="{ even: !isOdd }"
          placeholder="Nachname"
          type="text"
          required
        />
      </div>
      <div class="formfield">
        <label for="Email">Email:</label>
        <input
          id="Email"
          v-model="form.Email"
          class="forminput"
          :class="{ even: !isOdd }"
          placeholder="Email Adresse"
          type="Email"
          required
        />
      </div>
      <div class="formfield">
        <label for="contact">Kontakt:</label>
        <select
          id="contact"
          v-model="form.contactOption"
          class="forminput"
          :class="{ even: !isOdd }"
          aria-label="Select contact type"
        >
          <option
            v-for="sender of contactDistributionList"
            :key="sender.documentId"
            :value="sender.documentId"
          >
            {{ sender.Name }}
          </option>
        </select>
      </div>
      <div class="formfield">
        <label for="Message">Deine Nachricht:</label>
        <textarea
          id="Message"
          v-model="form.Message"
          class="forminput"
          :class="{ even: !isOdd }"
          placeholder="Hier deine Nachricht..."
          required
        ></textarea>
      </div>
      <button class="btn btn-primary" type="submit" aria-label="Submit form">
        Absenden
      </button>
      <div class="errorMessage">
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </div>
    </form>
    <div v-else class="successMessage">
      <h3>{{ form.Firstname }}, deine Nachricht wurde erfolgreich übermittelt!</h3>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        data-name="Layer 1"
        viewBox="0 0 570 511.67482"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <path
          d="M879.99927,389.83741a.99678.99678,0,0,1-.5708-.1792L602.86963,197.05469a5.01548,5.01548,0,0,0-5.72852.00977L322.57434,389.65626a1.00019,1.00019,0,0,1-1.14868-1.6377l274.567-192.5918a7.02216,7.02216,0,0,1,8.02-.01318l276.55883,192.603a1.00019,1.00019,0,0,1-.57226,1.8208Z"
          transform="translate(-315 -194.16259)"
          fill="#3f3d56"
        />
        <polygon
          points="23.264 202.502 285.276 8.319 549.276 216.319 298.776 364.819 162.776 333.819 23.264 202.502"
          fill="#e6e6e6"
        />
        <path
          d="M489.25553,650.70367H359.81522a6.04737,6.04737,0,1,1,0-12.09473H489.25553a6.04737,6.04737,0,1,1,0,12.09473Z"
          transform="translate(-315 -194.16259)"
          fill="#b1138b"
        />
        <path
          d="M406.25553,624.70367H359.81522a6.04737,6.04737,0,1,1,0-12.09473h46.44031a6.04737,6.04737,0,1,1,0,12.09473Z"
          transform="translate(-315 -194.16259)"
          fill="#b1138b"
        />
        <path
          d="M603.96016,504.82207a7.56366,7.56366,0,0,1-2.86914-.562L439.5002,437.21123v-209.874a7.00817,7.00817,0,0,1,7-7h310a7.00818,7.00818,0,0,1,7,7v210.0205l-.30371.12989L606.91622,504.22734A7.61624,7.61624,0,0,1,603.96016,504.82207Z"
          transform="translate(-315 -194.16259)"
          fill="#fff"
        />
        <path
          d="M603.96016,505.32158a8.07177,8.07177,0,0,1-3.05957-.59863L439.0002,437.54521v-210.208a7.50851,7.50851,0,0,1,7.5-7.5h310a7.50851,7.50851,0,0,1,7.5,7.5V437.68779l-156.8877,66.999A8.10957,8.10957,0,0,1,603.96016,505.32158Zm-162.96-69.1123,160.66309,66.66455a6.1182,6.1182,0,0,0,4.668-.02784l155.669-66.47851V227.33721a5.50653,5.50653,0,0,0-5.5-5.5h-310a5.50653,5.50653,0,0,0-5.5,5.5Z"
          transform="translate(-315 -194.16259)"
          fill="#3f3d56"
        />
        <path
          d="M878,387.83741h-.2002L763,436.85743l-157.06982,67.07a5.06614,5.06614,0,0,1-3.88038.02L440,436.71741l-117.62012-48.8-.17968-.08H322a7.00778,7.00778,0,0,0-7,7v304a7.00779,7.00779,0,0,0,7,7H878a7.00779,7.00779,0,0,0,7-7v-304A7.00778,7.00778,0,0,0,878,387.83741Zm5,311a5.002,5.002,0,0,1-5,5H322a5.002,5.002,0,0,1-5-5v-304a5.01106,5.01106,0,0,1,4.81006-5L440,438.87739l161.28027,66.92a7.12081,7.12081,0,0,0,5.43994-.03L763,439.02741l115.2002-49.19a5.01621,5.01621,0,0,1,4.7998,5Z"
          transform="translate(-315 -194.16259)"
          fill="#3f3d56"
        />
        <path
          d="M602.345,445.30958a27.49862,27.49862,0,0,1-16.5459-5.4961l-.2959-.22217-62.311-47.70752a27.68337,27.68337,0,1,1,33.67407-43.94921l40.36035,30.94775,95.37793-124.38672a27.68235,27.68235,0,0,1,38.81323-5.12353l-.593.80517.6084-.79346a27.71447,27.71447,0,0,1,5.12353,38.81348L624.36938,434.50586A27.69447,27.69447,0,0,1,602.345,445.30958Z"
          transform="translate(-315 -194.16259)"
          fill="#b1138b"
        />
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useReCaptcha } from "vue-recaptcha-v3";
import { useContactApi } from "~/composables/api/modules/contact";
import { useDeregisterStore } from "~/store/deregister";
import type { ContactSender } from "~/types/contact-sender";

const props = defineProps<{
  zone: ContactZone;
  index: number;
}>();
const deregisterStore = useDeregisterStore();
const isOdd = computed(() => (props.index ? props.index % 2 === 0 : true));
const contactDistributionList = useState<ContactSender[] | null>(() => null);
const form = ref({
  Firstname: "",
  Lastname: "",
  Email: "",
  Message: "",
  contactOption: "",
  Score: 0,
});
const recaptchaInstance = useReCaptcha();
const errorMessage = useState(() => "");
const mailState = useState<"UNKNOWN" | "SUCCESS">(() => "UNKNOWN");
const { getContactDistributionList, createContactEntry } = useContactApi();

onMounted(async () => {
  try {
    const response = await getContactDistributionList();
    contactDistributionList.value = response.data;
    form.value.contactOption = getDefaultContactOption();
    form.value.Message = deregisterStore.step ? deregisterStore.message : "";
  } catch (error) {
    errorMessage.value =
      "Ein Fehler trat beim Laden der Kontaktverteilung auf. Bitte versuche es später erneut.";
  }
});

const getDefaultContactOption = () => {
  const step = deregisterStore.step;
  return (
    contactDistributionList.value?.find((sender: ContactSender) =>
      step
        ? sender.Name.toLocaleLowerCase() === step
        : sender.Name.toLocaleLowerCase() === "abteilung"
    )?.documentId ?? ""
  );
};

const recaptcha = async () => {
  try {
    await recaptchaInstance?.recaptchaLoaded();
    return await recaptchaInstance?.executeRecaptcha("submit");
  } catch (error) {
    errorMessage.value =
      "Deine Verifizierung ist fehlgeschlagen. Bitte versuche es später erneut.";
    throw error;
  }
};

const submitForm = async () => {
  // Track form submission attempt
  trackFormEvent("contact_form", "submit", {
    form_location: "contact_page",
    step_context: deregisterStore.step || "none",
  });

  try {
    const token = await recaptcha();
    await createContactEntry(token, form.value);
    mailState.value = "SUCCESS";

    // Track successful form submission
    trackEvent({
      action: "form_submission_success",
      category: "contact",
      label: "contact_form",
      custom_parameters: {
        step_context: deregisterStore.step || "none",
      },
    });
  } catch (error) {
    errorMessage.value =
      "Deine Nachricht konnte nicht übermittelt werden. Bitte versuche es erneut.";

    // Track form submission error
    trackFormEvent("contact_form", "error", {
      error_type: "submission_failed",
      error_message: error?.toString() || "Unknown error",
      step_context: deregisterStore.step || "none",
    });
  } finally {
    deregisterStore.setStep("");
  }
};

// Enhanced analytics for contact form
const { trackFormEvent, trackEvent } = useEnhancedAnalytics();

// Track form start on component mount
onMounted(() => {
  trackFormEvent("contact_form", "start", {
    form_location: "contact_page",
    pre_filled_step: deregisterStore.step || "none",
  });
});

onBeforeUnmount(() => {
  mailState.value = "UNKNOWN";
});
</script>

<style scoped lang="scss">
.form {
  margin-top: 2rem;
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

.successMessage {
  margin: var(--space-large) auto;
  svg {
    max-width: 400px;
  }
}

.errorMessage {
  grid-column: span 2;
  p {
    color: rgb(170, 0, 0) !important;
    font-weight: 700;
  }
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
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1rem;
  background-color: var(--color-accent-50);
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

<template>
  <div class="resetPasswordMain">
    <p class="resetPasswordHeader">
      {{ getLocalizedMessages("resetPasswordHeader") }}
    </p>
    <span class="resetPasswordSpan">{{
      getLocalizedMessages("resetPasswordSpan")
    }}</span>
    <input class="resetPasswordInput" type="email" v-model="email" />
    <button class="resetPasswordCancel" type="submit" @click="backToLogin()">
      {{ getLocalizedMessages("cancelButtonText") }}
    </button>
    <button class="resetPasswordSubmit" type="submit">
      {{ getLocalizedMessages("submitButtonText") }}
    </button>
  </div>
</template>
<script>
import router from "../router";
import localizedService from "../services/localized-services";
export default {
  name: "ForgotPassword",
  data() {
    return {
      email: "",
    };
  },
  methods: {
    getLocalizedMessages(text) {
      return localizedService.getLocalizedMessages(text);
    },
    backToLogin() {
      router.push({ path: "/loginPage" });
    },
  },
};
</script>

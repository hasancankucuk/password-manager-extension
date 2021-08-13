<template>
  <div>
    <div class="signUpHeaderDiv">
      <p class="signUpStart"></p>
    </div>
    <h3 class="backToMain" @click="mainPopup">
      {{ getLocalizedMessages("backToMain") }}
      <div class="backToMainIcon"></div>
    </h3>
  </div>
</template>

<script>
import localizedService from "../services/localized-services";
import router from "../router";
export default {
  name: "RecenltyUsed",
  methods: {
    getLocalizedMessages(text) {
      return localizedService.getLocalizedMessages(text);
    },
    mainPopup() {
      router.push({ path: "/" });
    },
  },
};
</script>

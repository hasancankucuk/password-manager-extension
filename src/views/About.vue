<template>
  <div>
    <div class="about">
      <h3 class="backToMain" @click="mainPopup">
        {{ getLocalizedMessages("backToMain") }}
        <div class="backToMainIcon"></div>
      </h3>
      <p class="projectHeader">{{ getLocalizedMessages("extName") }}</p>
    </div>
    <p class="aboutText">{{ getLocalizedMessages("aboutText") }}</p>
  </div>
</template>

<script>
import localizedService from "../services/localized-services";
import router from "../router";
export default {
  name: "About",
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

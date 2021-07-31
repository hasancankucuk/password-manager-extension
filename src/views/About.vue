<template>
  <div class="about">
    <p class="projectHeader">{{ defaultText }}</p>
      <h3 class="backToMain" @click="mainPopup">{{ getBackToMainTxt }}
        <div class="backToMainIcon"></div>
      </h3>
      <p class="aboutText"> {{ getAboutText}}</p>
  </div>
</template>

<script>
import localizedService from '../services/localized-services'
import router from '../router'
export default {
  name: 'About',
  computed: {
    defaultText () {
      return localizedService.getLocalizedMessages('extName')
    },
    getBackToMainTxt () {
      return localizedService.getLocalizedMessages('backToMain')
    },
    getAboutText () {
      return localizedService.getLocalizedMessages('aboutText')
    }
  },
  methods: {
    mainPopup () {
      router.push({ path: '/' })
    }
  }
}
</script>

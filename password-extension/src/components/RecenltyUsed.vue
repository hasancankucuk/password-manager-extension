<template>
    <div>
      <div class="signUpHeaderDiv">
        <p class="signUpStart">{{ getSignUpStartTxt }}</p>
      </div>
      <h3 class="backToMain" @click="mainPopup">{{ getBackToMainTxt }}
        <div class="backToMainIcon"></div>
      </h3>
    </div>
</template>

<script>
import localizedService from '../services/localized-services'
import router from '../router'
export default {
  name: 'RecenltyUsed',
  computed: {
    defaultText () {
      return localizedService.getLocalizedMessages('extName')
    },
    getBackToMainTxt () {
      return localizedService.getLocalizedMessages('backToMain')
    }
  },
  methods: {
    mainPopup () {
      router.push({ path: '/home' })
    }
  }
}
</script>

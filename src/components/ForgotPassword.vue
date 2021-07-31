<template>
    <div class="resetPasswordMain">
        <p class="resetPasswordHeader">{{ getResetPasswordHeader }}</p>
        <span class="resetPasswordSpan">{{ getResetPasswordSpan }}</span>
        <input class="resetPasswordInput" type="email" v-model="email">
        <button class="resetPasswordCancel" type="submit" @click="backToLogin()">{{ getCancelButtonTxt }}</button>
        <button class="resetPasswordSubmit" type="submit">{{ getSubmitButtonTxt }}</button>
    </div>
</template>
<script>
import router from '../router'
import localizedService from '../services/localized-services'
export default {
  name: 'ForgotPassword',
  data () {
    return {
      email: ''
    }
  },
  computed: {
    getResetPasswordHeader () {
      return localizedService.getLocalizedMessages('resetPasswordHeader')
    },
    getResetPasswordSpan () {
      return localizedService.getLocalizedMessages('resetPasswordSpan')
    },
    getCancelButtonTxt () {
      return localizedService.getLocalizedMessages('cancelButtonText')
    },
    getSubmitButtonTxt () {
      return localizedService.getLocalizedMessages('submitButtonText')
    }
  },
  methods: {
    backToLogin () {
      router.push({ path: '/loginPage' })
    }
  }
}
</script>

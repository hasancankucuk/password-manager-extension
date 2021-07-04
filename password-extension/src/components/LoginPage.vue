<template>
    <div class="loginPageMain">
        <p class="projectHeader">{{ defaultText }}</p>
        <h3 class="loginHeader" >{{ getLoginHeaderTxt}}</h3>
        <div class="divisionLine"></div>
        <input class="loginEmailBox" type="email" v-bind:placeholder= getEmailBoxPlaceHolderTxt >
        <input class="loginPasswordBox" type="password" v-bind:placeholder= getPasswordBoxPlaceHolderTxt>
        <button class="loginButton" @click="login">{{ getLoginButtonTxt }}</button>
        <h3 class="signUpHeader" @click="test">{{ getSignUpHeaderTxt }}</h3>
        <h3 class="forgotPassword" @click="test">{{ getForgotPasswordTxt }}</h3>
    </div>
</template>
<script>
import localizedService from '../services/localized-services'
import router from '../router'
export default {
  name: 'LoginPage',
  computed: {
    defaultText () {
      return localizedService.getLocalizedMessages('extName')
    },
    getLoginHeaderTxt () {
      return localizedService.getLocalizedMessages('loginHeader')
    },
    getSignUpHeaderTxt () {
      return localizedService.getLocalizedMessages('signUpHeader')
    },
    getLoginButtonTxt () {
      return localizedService.getLocalizedMessages('loginHeader')
    },
    getForgotPasswordTxt () {
      return localizedService.getLocalizedMessages('forgotPassword')
    },
    getEmailBoxPlaceHolderTxt () {
      return localizedService.getLocalizedMessages('emailBoxPlaceHolder')
    },
    getPasswordBoxPlaceHolderTxt () {
      return localizedService.getLocalizedMessages('passwordBoxPlaceHolder')
    }
  },
  methods: {
    login () {
      router.push({ path: '/home' })
    },
    createAccount () {
      router.push({ path: '/signUp' })
    },
    test () {
      var el = document.getElementsByTagName('input')
      var temp = ''
      el.forEach(element => {
        temp = element.closest('input')
      })
      console.log(temp)
    }
  }
}
</script>

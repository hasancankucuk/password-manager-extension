<template>
    <div class="signUpMain">
        <div class="signUpHeaderDiv">
            <p class="signUpStart">{{ getSignUpStartTxt }}</p>
        </div>
        <div class="signUpEmailDiv" v-show="!this.createAccountClicked">
            <input class="signUpEmailBox" type="email" v-bind:placeholder= getEmailBoxPlaceHolderTxt>
            <p class="userAgreement">{{ getUserAgreementTxt }}</p>
            <button class="backToCreateEmail">{{ getBackToMainTxt }}</button>
            <button class="createAccount" @click="createAccount">{{ getSignUpHeaderTxt }}</button>
        </div>
        <div class="signUpPasswordDiv" v-show="this.createAccountClicked">
            <input class="signUpPasswordBox" type="password" v-bind:placeholder= getPasswordBoxPlaceHolderTxt>
            <input class="signUpConfirmPasswordBox" type="password" v-bind:placeholder= getConfirmPasswordBoxPlaceHolderTxt>
            <input class="passwordHintBox" type="text" v-bind:placeholder= getHintBoxPlaceHolderTxt>
            <button class="finishCreateAccount" @click="finishCreate">{{ getFinishCreateAccountTxt }}</button>
        </div>
    </div>
</template>

<script>
import localizedService from '../services/localized-services'
import router from '../router'
export default {
  name: 'SignUpPage',
  data () {
    return {
      createAccountClicked: false
    }
  },
  computed: {
    getSignUpStartTxt () {
      return localizedService.getLocalizedMessages('signUpStart')
    },
    getSignUpHeaderTxt () {
      console.log(this.createAccountClicked)
      return localizedService.getLocalizedMessages('signUpHeader')
    },
    getBackToMainTxt () {
      return localizedService.getLocalizedMessages('backToMain')
    },
    getFinishCreateAccountTxt () {
      return localizedService.getLocalizedMessages('finishCreateAccount')
    },
    getUserAgreementTxt () {
      return localizedService.getLocalizedMessages('userAgreement')
    },
    getEmailBoxPlaceHolderTxt () {
      return localizedService.getLocalizedMessages('emailBoxPlaceHolder')
    },
    getPasswordBoxPlaceHolderTxt () {
      return localizedService.getLocalizedMessages('passwordBoxPlaceHolder')
    },
    getConfirmPasswordBoxPlaceHolderTxt () {
      return localizedService.getLocalizedMessages('confirmPasswordPlaceHolder')
    },
    getHintBoxPlaceHolderTxt () {
      return localizedService.getLocalizedMessages('hintBoxPlaceHolder')
    }
  },
  methods: {
    createAccount () {
      this.createAccountClicked = !this.createAccountClicked
    },
    finishCreate () {
      router.push({ path: '/settingUpPage' })
    }
  }
}
</script>

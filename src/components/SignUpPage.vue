<template>
  <div class="signUpMain">
    <div class="signUpHeaderDiv">
      <p class="signUpStart">{{ getSignUpStartTxt }}</p>
    </div>
    <div class="signUpEmailDiv" v-show="!this.createAccountClicked">
      <input
        class="signUpEmailBox"
        type="email"
        v-bind:placeholder="getEmailBoxPlaceHolderTxt"
        v-model="email"
      />
      <p class="userAgreement">{{ getUserAgreementTxt }}</p>
      <button class="backToCreateEmail" @click="backToMain()">{{ getBackToMainTxt }}</button>
      <button class="createAccount" @click="createAccount()">
        {{ getSignUpHeaderTxt }}
      </button>
    </div>
    <div class="signUpPasswordDiv" v-show="this.createAccountClicked">
      <input
        class="signUpPasswordBox"
        type="password"
        v-bind:placeholder="getPasswordBoxPlaceHolderTxt"
        v-model="password"
      />
      <input
        class="signUpConfirmPasswordBox"
        type="password"
        v-bind:placeholder="getConfirmPasswordBoxPlaceHolderTxt"
        v-model="passwordConfirm"
      />
      <input
        class="passwordHintBox"
        type="text"
        v-bind:placeholder="getHintBoxPlaceHolderTxt"
      />
      <button class="finishCreateAccount" @click="finishCreate">
        {{ getFinishCreateAccountTxt }}
      </button>
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
      createAccountClicked: false,
      email: '',
      password: '',
      passwordConfirm: ''
    }
  },
  computed: {
    getSignUpStartTxt () {
      return localizedService.getLocalizedMessages('signUpStart')
    },
    getSignUpHeaderTxt () {
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
      return localizedService.getLocalizedMessages(
        'confirmPasswordPlaceHolder'
      )
    },
    getHintBoxPlaceHolderTxt () {
      return localizedService.getLocalizedMessages('hintBoxPlaceHolder')
    }
  },
  methods: {
    createAccount () {
      if (!this.email.includes('.com')) {
        alert('Please enter a valid email address.')
      }
      this.createAccountClicked = !this.createAccountClicked
    },
    finishCreate () {
      if (this.password === this.passwordConfirm) {
        this.create()
        router.push({ path: '/settingUpPage' })
      } else {
        alert('Plase make sure your password match.')
      }
    },
    create () {
      var axios = require('axios')
      var data = JSON.stringify({
        id: 0,
        userMail: this.email,
        userPassword: this.password
      })

      var config = {
        method: 'post',
        url: 'https://192.168.0.23:5001/api/UserLogin',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      }

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data))
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    backToMain () {
      router.push({ path: '/' })
    }
  }
}
</script>

<template>
  <div class="loginPageMain" >
    <p class="projectHeader">{{ defaultText }}</p>
    <input
      class="loginEmailBox"
      type="email"
      v-bind:placeholder="getEmailBoxPlaceHolderTxt"
      v-model="email"
    />
    <input
      class="loginPasswordBox"
      type="password"
      v-bind:placeholder="getPasswordBoxPlaceHolderTxt"
      v-model="password"
    />
    <button class="loginButton" @click="login()">{{ getLoginButtonTxt }}</button>
    <h3 class="signUpHeader" @click="createAccount()">
      {{ getSignUpHeaderTxt }}
    </h3>
    <h3 class="forgotPassword" @click="forgotPassword()">{{ getForgotPasswordTxt }}</h3>
  </div>
</template>
<script>
import localizedService from '../services/localized-services'
import router from '../router'
import { mapState } from 'vuex'
import store from '../store'
export default {
  name: 'LoginPage',
  data () {
    return {
      email: '',
      password: '',
      response: []
    }
  },
  created () {
    if (store.state.isLoggedIn === undefined) {
      store.state.isLoggedIn = localStorage.getItem('logInfo')
    }

    if (router.currentRoute.path !== '/' && store.state.isLoggedIn === 'true') {
      router.replace({ path: '/' }).catch((err) => { console.log(err) })
    }
  },
  computed: {
    ...mapState(['isLoggedIn']),
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
      var email = this.email
      var password = this.password
      var axios = require('axios')
      var data = ''
      var config = {
        method: 'get',
        url: 'https://192.168.0.23:5001/api/UserLogin',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      }

      axios(config)
        .then(function (response) {
          response.data.forEach(element => {
            if ((element.userMail === email || element.userMail === password) && router.currentRoute.path !== '/') {
              store.dispatch('setLogIn', true)
              router.push({ path: '/' })
              browser.runtime.sendMessage({
                key: 'loggedIn'
              })
            }
          })
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    createAccount () {
      router.push({ path: '/signUp' })
    },
    forgotPassword () {
      router.push({ path: '/forgotPassword' })
    }
  }
}
</script>

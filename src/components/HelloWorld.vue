<template>
  <div >
    <div class="projectHeaderDiv" >
      <p class="projectHeader">{{ defaultText }}</p>
    </div>
    <ul class="menuItems">
      <li class="recentlyUsed" @click="openRecenltyUsed">{{ getRecenltyUsedText }}
        <div class="moreOptions" id="recentlyUsedMore"></div>
      </li>
      <li class="allPasswords" @click="openAllPasswords">{{ getAllPasswordsText }}
        <div class="moreOptions" id="allPasswordsMore"></div>
      </li>
      <li  class="addPassword" @click="openAddPassword">{{ getAddPasswordText }}
        <div class="moreOptions" id="addPasswordMore"></div>
      </li>
    </ul>
    <ul class="accountItems">
      <li class="accountOptions" @click="openOptions">{{ getAccountOptionsText }}
        <div class="moreOptions" id="accountOptionsMore"></div>
      </li>
      <li class="signOut" @click="signOut">{{ getSignOutText }}</li>
    </ul>
    <ul class="aboutItems">
      <li class="aboutExtension" @click="openAbout">{{getAboutExtensionText}}
        <div class="moreOptions" id="aboutExtensionMore"></div>
      </li>
    </ul>
  </div>
</template>

<script>
import localizedService from '../services/localized-services'
import router from '../router'
import store from '../store'
import { mapState } from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      localizedService
    }
  },
  created () {
    if (store.state.isLoggedIn === undefined) {
      store.state.isLoggedIn = localStorage.getItem('logInfo')
    }
    if (router.currentRoute.path !== '/loginPage' && store.state.isLoggedIn === 'false') {
      router.push({ path: '/loginPage' }).catch((err) => { console.log(err) })
    }
  },
  mounted () {
    browser.runtime.sendMessage({})
  },
  computed: {
    ...mapState(['isLoggedIn']),
    defaultText () {
      return localizedService.getLocalizedMessages('extName')
    },
    getRecenltyUsedText () {
      return localizedService.getLocalizedMessages('recentlyUsed')
    },
    getAllPasswordsText () {
      return localizedService.getLocalizedMessages('allPasswords')
    },
    getAddPasswordText () {
      return localizedService.getLocalizedMessages('addPassword')
    },
    getAccountOptionsText () {
      return localizedService.getLocalizedMessages('accountOptions')
    },
    getSignOutText () {
      return localizedService.getLocalizedMessages('signOut')
    },
    getAboutExtensionText () {
      return localizedService.getLocalizedMessages('aboutExtension')
    }
  },
  methods: {
    openOptions () {
      router.push({ path: '/accountOptions' })
    },
    openRecenltyUsed () {
      router.push({ path: '/recenltyUsed' })
    },
    openAllPasswords () {
      // TODO : web sitesi url eklenecek
      window.open('http://192.168.1.23:8080/all-passwords')
    },
    openAddPassword () {
      // TODO : web sitesi url eklenecek
      window.open('http://192.168.1.23:8080/add-account')
    },
    openAbout () {
      router.push({ path: '/about' })
    },
    signOut () {
      if (store.state.isLoggedIn) {
        store.dispatch('setLogIn', false)
        browser.runtime.sendMessage({
          key: 'loggedOut'
        })
        router.push({ path: '/loginPage' }).catch((reason) => {
          console.log(reason)
        })
      }
    }
  }
}
</script>
<style>
@import "../assets/style/main.css";
</style>

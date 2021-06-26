<template>
  <div>
    <p class="projectHeader">{{ defaultText }}</p>
    <ul class="menuItems">
      <li class="recentlyUsed">{{ getRecenltyUsedText }}
        <div class="moreOptions" id="recentlyUsedMore"></div>
      </li>
      <li class="allPasswords">{{ getAllPasswordsText }}
        <div class="moreOptions" id="allPasswordsMore"></div>
      </li>
      <li  class="addPassword">{{ getAddPasswordText }}
        <div class="moreOptions" id="addPasswordMore"></div>
      </li>
    </ul>
    <ul class="accountItems">
      <li class="accountOptions">{{ getAccountOptionsText }}
        <div class="moreOptions" id="accountOptionsMore"></div>
      </li>
      <li class="signOut">{{ getSignOutText }}</li>
    </ul>
    <ul class="aboutItems">
      <li class="aboutExtension">{{getAboutExtensionText}}
        <div class="moreOptions" id="aboutExtensionMore"></div>
      </li>
    </ul>
  </div>
</template>

<script>
import localizedService from '../services/localized-services'
export default {
  name: 'HelloWorld',
  data () {
    return {
      localizedService
    }
  },
  mounted () {
    browser.runtime.sendMessage({})
  },
  computed: {
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
    test () {
      console.log(window.PasswordCredential.name)
    }
  }
}
</script>
<style>
@import "../assets/style/main.css";
</style>

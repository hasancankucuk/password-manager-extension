<template>
  <div>
    <div class="signUpHeaderDiv">
      <p class="signUpStart">{{ getSignUpStartTxt }}</p>
    </div>
   <h3 class="backToMain" @click="mainPopup">{{ getBackToMainTxt }}
     <div class="backToMainIcon"></div>
   </h3>
   <ul class="notificationSettingsItem">
     <li class="notificationSetting" @click="setNotification">{{ getNotificationSettingsTxt }}
       <input type="checkbox" :checked="!this.isNotificationsEnable">
     </li>
     <li class="matchedPasswordSetting" @click="setToolbarNotification">{{ getMatchedPasswordSettingTxt }}
       <input type="checkbox" :checked="!this.isToolbarNotificationEnable">
     </li>
    </ul>
    <ul class="mailSettingItem">
      <li class="changeMailSetting" @click="changeMail">{{ getChangeMailSettingTxt }}</li>
    </ul>
    <ul class="passwordSettingsItem">
     <li class="changePasswordSetting" @click="changePassword">{{ getChangePasswordSettingTxt }}</li>
     <li class="generatePasswordSetting" @click="generatePassword">{{ getGeneratePAsswordSettingTxt }}</li>
   </ul>
  </div>
</template>
<script>
import router from '../router'
import localizedService from '../services/localized-services'
import store from '../store'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'AccountOptions',
  data () {
    return {
      localizedService
    }
  },
  computed: {
    ...mapActions(['setNotifications', 'setToolbarNotifications']),
    ...mapState(['isNotificationsEnable', 'isToolbarNotificationEnable']),
    defaultText () {
      return localizedService.getLocalizedMessages('extName')
    },
    getBackToMainTxt () {
      return localizedService.getLocalizedMessages('backToMain')
    },
    getNotificationSettingsTxt () {
      return localizedService.getLocalizedMessages('notificationSetting')
    },
    getMatchedPasswordSettingTxt () {
      return localizedService.getLocalizedMessages('matchedPasswordSetting')
    },
    getChangeMailSettingTxt () {
      return localizedService.getLocalizedMessages('changeMailSetting')
    },
    getChangePasswordSettingTxt () {
      return localizedService.getLocalizedMessages('changePasswordSetting')
    },
    getGeneratePAsswordSettingTxt () {
      return localizedService.getLocalizedMessages('generatePasswordSetting')
    }
  },
  methods: {
    mainPopup () { //
      router.push({ path: '/' })
    },
    changePassword () {
      // TODO : web sitesi url eklenecek
      window.open('http://www.google.com')
    },
    generatePassword () {
      // TODO: web sitesi url eklenecek
      window.open('http://192.168.1.23:8080/password-generator')
    },
    changeMail () {
      // TODO: web sitesi url eklenecek
      window.open('http://www.google.com')
    },
    setNotification () {
      store.dispatch('setNotifications', !!store.state.isNotificationsEnable)
      browser.runtime.sendMessage({
        key: 'notifications'
      })
    },
    setToolbarNotification () {
      store.dispatch('setToolbarNotifications', !!store.state.isToolbarNotificationEnable)
      browser.runtime.sendMessage({
        key: 'toolbarNotifications'
      })
    }
  }
}
</script>

<template>
  <div>
    <div class="signUpHeaderDiv">
      <p class="signUpStart"></p>
    </div>
    <h3 class="backToMain" @click="mainPopup">
      {{ getLocalizedMessages("backToMain") }}
      <div class="backToMainIcon"></div>
    </h3>
    <ul class="notificationSettingsItem">
      <li class="notificationSetting" @click="setNotification">
        {{ getLocalizedMessages("notificationSetting") }}
        <input type="checkbox" :checked="!this.isNotificationsEnable" />
      </li>
      <li class="matchedPasswordSetting" @click="setToolbarNotification">
        {{ getLocalizedMessages("matchedPasswordSetting") }}
        <input type="checkbox" :checked="!this.isToolbarNotificationEnable" />
      </li>
    </ul>
    <ul class="mailSettingItem">
      <li class="changeMailSetting" @click="changeMail">
        {{ getLocalizedMessages("changeMailSetting") }}
      </li>
    </ul>
    <ul class="passwordSettingsItem">
      <li class="changePasswordSetting" @click="changePassword">
        {{ getLocalizedMessages("changePasswordSetting") }}
      </li>
      <li class="generatePasswordSetting" @click="generatePassword">
        {{ getLocalizedMessages("generatePasswordSetting") }}
      </li>
    </ul>
  </div>
</template>
<script>
import router from "../router";
import localizedService from "../services/localized-services";
import store from "../store";
import { mapActions, mapState } from "vuex";
export default {
  name: "AccountOptions",
  data() {
    return {
      localizedService,
    };
  },
  computed: {
    ...mapActions(["setNotifications", "setToolbarNotifications"]),
    ...mapState(["isNotificationsEnable", "isToolbarNotificationEnable"]),
  },
  methods: {
    getLocalizedMessages(text) {
      return localizedService.getLocalizedMessages(text);
    },
    mainPopup() {
      //
      router.push({ path: "/" });
    },
    changePassword() {
      // TODO : web sitesi url eklenecek
      window.open("http://www.google.com");
    },
    generatePassword() {
      // TODO: web sitesi url eklenecek
      window.open("http://localhost:8080/password-generator");
    },
    changeMail() {
      // TODO: web sitesi url eklenecek
      window.open("http://www.google.com");
    },
    setNotification() {
      store.dispatch("setNotifications", !!store.state.isNotificationsEnable);
      browser.runtime.sendMessage({
        key: "notifications",
      });
    },
    setToolbarNotification() {
      store.dispatch(
        "setToolbarNotifications",
        !!store.state.isToolbarNotificationEnable
      );
      browser.runtime.sendMessage({
        key: "toolbarNotifications",
      });
    },
  },
};
</script>

<template>
  <div>
    <div class="signUpHeaderDiv">
      <p class="signUpStart"></p>
    </div>
    <h3 class="backToMain" @click="mainPopup">
      {{ getLocalizedMessages("backToMain") }}
      <div class="backToMainIcon"></div>
    </h3>
    <ul class="menuItems">
      <li class="clickable" @click="setNotification">
        <img :src="getIcon('notification-icon')" />
        {{ getLocalizedMessages("notificationSetting") }}
        <input type="checkbox" :checked="this.isNotificationsEnable" />
      </li>
      <li class="clickable" @click="setToolbarNotification">
        <img :src="getIcon('matched-password-icon')" />
        {{ getLocalizedMessages("matchedPasswordSetting") }}
        <input type="checkbox" :checked="this.isToolbarNotificationEnable" />
      </li>
      <li class="header">
        {{ getLocalizedMessages("account")}}
      </li>
      <li class="clickable" @click="updateAccount">
        <img :src="getIcon('notification-icon')" />
        {{ getLocalizedMessages("updateAccount") }}
        <div class="toWebSite"></div>
      </li>
      <li class="header">
        {{ getLocalizedMessages("password")}}
      </li>
      <li class="clickable" @click="generatePassword">
        <img :src="getIcon('generate-password-icon')" />
        {{ getLocalizedMessages("generatePasswordSetting") }}
        <div class="toWebSite"></div>
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
    getIcon(fileName) {
      return require(`../assets/icons/${fileName}.svg`);
    },
    getLocalizedMessages(text) {
      return localizedService.getLocalizedMessages(text);
    },
    mainPopup() {
      //
      router.push({ path: "/" });
    },
    generatePassword() {
      window.open("http://localhost:8080/password-generator");
    },
    updateAccount() {
      window.open("http://localhost:8080/profile");
    },
    setNotification() {
      store.dispatch("setNotifications", !this.isNotificationsEnable);
      browser.runtime.sendMessage({
        key: "notifications",
      });
    },
    setToolbarNotification() {
      store.dispatch(
        "setToolbarNotifications",
        !this.isToolbarNotificationEnable
      );
      browser.runtime.sendMessage({
        key: "toolbarNotifications",
      });
    },
  },
};
</script>

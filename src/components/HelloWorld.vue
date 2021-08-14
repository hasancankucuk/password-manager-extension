<template>
  <div>
    <div class="projectHeaderDiv">
      <p class="projectHeader">{{ getLocalizedMessages("extName") }}</p>
    </div>
    <ul class="menuItems">
      <li class="clickable" @click="openRecenltyUsed">
        <img :src="getIcon('recenlty-used-icon')" />
        {{ getLocalizedMessages("recentlyUsed") }}
        <div class="moreOptions" id="recentlyUsedMore"></div>
      </li>
      <li class="clickable" @click="openAllPasswords">
        <img :src="getIcon('all-paswords-icon')" />
        {{ getLocalizedMessages("allPasswords") }}
        <div class="moreOptions" id="allPasswordsMore"></div>
      </li>
      <li class="clickable" @click="openAddPassword">
        <img :src="getIcon('add-password-icon')" />
        {{ getLocalizedMessages("addPassword") }}
        <div class="moreOptions" id="addPasswordMore"></div>
      </li>
      <li class="header">
        {{ getLocalizedMessages("account") }}
      </li>
      <li class="clickable" @click="openOptions">
        <img :src="getIcon('account-options-icon')" />
        {{ getLocalizedMessages("accountOptions") }}
        <div class="moreOptions" id="accountOptionsMore"></div>
      </li>
      <li class="clickable" @click="signOut">
        <img :src="getIcon('sign-out-icon')" />
        {{ this.getLocalizedMessages("signOut") }}
      </li>
      <li class="header"></li>
      <li class="clickable" @click="openAbout">
        <img :src="getIcon('info-icon')" />
        {{ getLocalizedMessages("aboutExtension") }}
        <div class="moreOptions" id="aboutExtensionMore"></div>
      </li>
    </ul>
  </div>
</template>

<script>
import localizedService from "../services/localized-services";
import router from "../router";
import store from "../store";
import { mapState } from "vuex";
export default {
  name: "HelloWorld",
  data() {
    return {
      localizedService,
    };
  },
  created() {
    if (store.state.isLoggedIn === undefined) {
      store.state.isLoggedIn = localStorage.getItem("logInfo");
    }
    if (
      router.currentRoute.path !== "/loginPage" &&
      store.state.isLoggedIn === "false"
    ) {
      router.push({ path: "/loginPage" }).catch((err) => {
        console.log(err);
      });
    }
  },
  mounted() {
    browser.runtime.sendMessage({});
  },
  computed: {
    ...mapState(["isLoggedIn"]),
  },
  methods: {
    getIcon(fileName) {
      return require(`../assets/icons/${fileName}.svg`);
    },
    getLocalizedMessages(text) {
      return localizedService.getLocalizedMessages(text);
    },
    openOptions() {
      router.push({ path: "/accountOptions" });
    },
    openRecenltyUsed() {
      router.push({ path: "/recenltyUsed" });
    },
    openAllPasswords() {
      // TODO : web sitesi url eklenecek
      window.open("http://localhost:8080/all-passwords");
    },
    openAddPassword() {
      // TODO : web sitesi url eklenecek
      window.open("http://localhost:8080/add-account");
    },
    openAbout() {
      router.push({ path: "/about" });
    },
    signOut() {
      if (store.state.isLoggedIn) {
        store.dispatch("setLogIn", false);
        browser.runtime.sendMessage({
          key: "loggedOut",
        });
        router.push({ path: "/loginPage" }).catch((reason) => {
          console.log(reason);
        });
      }
    },
  },
};
</script>
<style>
@import "../assets/style/main.scss";
</style>

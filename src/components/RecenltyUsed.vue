<template>
  <div>
    <div class="signUpHeaderDiv">
      <p class="signUpStart"></p>
    </div>
    <h3 class="backToMain" @click="mainPopup">
      {{ getLocalizedMessages("backToMain") }}
      <div class="backToMainIcon"></div>
    </h3>
    <h4>{{getLocalizedMessages("recentlyUsed")}}</h4>
    <ul class="accountList" v-for="account in accounts" :key="account.id">
      <li>
        {{ account.savedUsername }}
        <a
          class="copyPassword"
          @click="copyPassword(account)"
        ></a>
      </li>
    </ul>
  </div>
</template>

<script>
import localizedService from "../services/localized-services";
import UserInfoService from "../services/userInfoServices";
import router from "../router";
export default {
  name: "RecenltyUsed",
  data() {
    return {
      accounts: [],
      userInfoService: new UserInfoService(),
    };
  },
  mounted() {
    this.userInfoService
      .getRecentlyUsedPasswords(localStorage.getItem("tokenId"))
      .then((resp) => {
        this.accounts = resp.data;
        console.log(this.accounts);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    getLocalizedMessages(text) {
      return localizedService.getLocalizedMessages(text);
    },
    mainPopup() {
      router.push({ path: "/" });
    },
    copyPassword(pass) {
      console.log(pass);
      this.userInfoService
        .recentlyUsedPassword(pass.id)
        .then()
        .catch();
      if (!pass.savedPassword) {
        pass.savedPassword = "";
        return;
      }

      var textArea = document.createElement("textarea");
      textArea.value = pass.savedPassword;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("Copy");
      textArea.remove();
    },
  },
};
</script>

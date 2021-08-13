<template>
  <div class="loginPageMain">
    <p class="projectHeader">{{ getLocalizedMessages("extName") }}</p>
    <input
      class="loginEmailBox"
      type="email"
      v-bind:placeholder="getLocalizedMessages('emailBoxPlaceHolder')"
      v-model="email"
    />
    <input
      class="loginPasswordBox"
      type="password"
      v-bind:placeholder="getLocalizedMessages('passwordBoxPlaceHolder')"
      v-model="password"
    />
    <button class="loginButton" @click="login()">
      {{ getLocalizedMessages("loginHeader") }}
    </button>
    <h3 class="signUpHeader" @click="createAccount()">
      {{ getLocalizedMessages("signUpHeader") }}
    </h3>
    <h3 class="forgotPassword" @click="forgotPassword()">
      {{ getLocalizedMessages("forgotPassword") }}
    </h3>
  </div>
</template>
<script>
import localizedService from "../services/localized-services";
import router from "../router";
import { mapState } from "vuex";
import store from "../store";
export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      response: [],
    };
  },
  created() {
    if (store.state.isLoggedIn === undefined) {
      store.state.isLoggedIn = localStorage.getItem("logInfo");
    }

    if (router.currentRoute.path !== "/" && store.state.isLoggedIn === "true") {
      router.replace({ path: "/" }).catch((err) => {
        console.log(err);
      });
    }
  },
  computed: {
    ...mapState(["isLoggedIn"]),
  },
  methods: {
    getLocalizedMessages(text) {
      return localizedService.getLocalizedMessages(text);
    },
    login() {
      if (!this.checkUser()) {
        return;
      }

      this.userModel.userEmail = this.userModel.userName;
      this.userService
        .sendLoginRequest(this.userModel)
        .then((response) => {
          this.isLoginStarted = false;
          this.isLogged = true;
          this.$store.commit("LOGIN_USER");
          localStorage.setItem("token", this.userModel.userEmail);
          localStorage.setItem("tokenId", response);
          router.push("/profile");
        })
        .catch(() => {
          this.isLoginStarted = false;
        });
    },
    createAccount() {
      router.push({ path: "/signUp" });
    },
    forgotPassword() {
      router.push({ path: "/forgotPassword" });
    },
  },
};
</script>

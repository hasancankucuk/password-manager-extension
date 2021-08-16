<template>
  <div class="loginPageMain">
    <p class="projectHeader">{{ getLocalizedMessages("extName") }}</p>
    <input
      class="loginEmailBox"
      type="email"
      v-bind:placeholder="getLocalizedMessages('emailBoxPlaceHolder')"
      v-model="userModel.userName"
    />
    <input
      class="loginPasswordBox"
      type="password"
      v-bind:placeholder="getLocalizedMessages('passwordBoxPlaceHolder')"
      v-model="userModel.userPassword"
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
import userInfoModel from "../models/userInfoModel";
import router from "../router";
import { mapState } from "vuex";
import store from "../store";
import UserInfoService from '../services/userInfoServices';

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      response: [],
      userService: new UserInfoService(),
      userModel: new userInfoModel(),
    };
  },
  created() {
    if (store.state.isLoggedIn === undefined) {
      store.state.isLoggedIn = !!localStorage.getItem("token");
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
          console.log(response.data);
          localStorage.setItem("token", response.data.userEmail);
          localStorage.setItem("username", response.data.userName);
          localStorage.setItem("tokenId", response.data.id);
          router.push("/");
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
    checkUser() {
      this.isLoginStarted = true;
      this.userModel.userEmail = this.userModel.userName;
      if (!this.userModel.userName || !this.userModel.userPassword) {
        return false;
      }

      if (
        this.userModel.userName.trim().length <= 0 ||
        this.userModel.userPassword.trim().length <= 0
      ) {
        return false;
      }

      return true;
    },
  },
};
</script>

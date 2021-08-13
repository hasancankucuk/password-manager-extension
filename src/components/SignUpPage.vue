<template>
  <div class="signUpMain">
    <div class="signUpHeaderDiv">
      <p class="signUpStart">{{ getLocalizedMessages("signUpStart") }}</p>
    </div>
    <div class="signUpEmailDiv" v-show="!this.createAccountClicked">
      <input
        class="signUpEmailBox"
        type="email"
        v-bind:placeholder="getLocalizedMessages('emailBoxPlaceHolder')"
        v-model="email"
      />
      <p class="userAgreement">{{ getLocalizedMessages("userAgreement") }}</p>
      <button class="backToCreateEmail" @click="backToMain()">
        {{ getLocalizedMessages("backToMain") }}
      </button>
      <button class="createAccount" @click="createAccount()">
        {{ getLocalizedMessages("signUpHeader") }}
      </button>
    </div>
    <div class="signUpPasswordDiv" v-show="this.createAccountClicked">
      <input
        class="signUpPasswordBox"
        type="password"
        v-bind:placeholder="getLocalizedMessages('passwordBoxPlaceHolder')"
        v-model="password"
      />
      <input
        class="signUpConfirmPasswordBox"
        type="password"
        v-bind:placeholder="getLocalizedMessages('confirmPasswordPlaceHolder')"
        v-model="passwordConfirm"
      />
      <input
        class="passwordHintBox"
        type="text"
        v-bind:placeholder="getLocalizedMessages('hintBoxPlaceHolder')"
      />
      <button class="finishCreateAccount" @click="finishCreate">
        {{ getLocalizedMessages("finishCreateAccount") }}
      </button>
    </div>
  </div>
</template>

<script>
import localizedService from "../services/localized-services";
import router from "../router";

export default {
  name: "SignUpPage",
  data() {
    return {
      createAccountClicked: false,
      email: "",
      password: "",
      passwordConfirm: "",
    };
  },
  methods: {
    getLocalizedMessages(text) {
      return localizedService.getLocalizedMessages(text);
    },
    createAccount() {
      if (!this.email.includes(".com")) {
        alert("Please enter a valid email address.");
      }
      this.createAccountClicked = !this.createAccountClicked;
    },
    finishCreate() {
      if (this.password === this.passwordConfirm) {
        this.create();
        router.push({ path: "/settingUpPage" });
      } else {
        alert("Plase make sure your password match.");
      }
    },
    create() {
      var axios = require("axios");
      var data = JSON.stringify({
        id: 0,
        userMail: this.email,
        userPassword: this.password,
      });

      var config = {
        method: "post",
        url: "https://localhost:5001/api/UserLogin",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    backToMain() {
      router.push({ path: "/" });
    },
  },
};
</script>

<template>
  <router-view v-bind="this.setHeight()">
  </router-view>
</template>

<script>
import router from '../router'

export default {
  name: 'App',
  methods: {
    setHeight () {
      if (router.currentRoute.path === '/loginPage') {
        document.getElementsByTagName('html')[0].style.height = '380px'
      } else {
        document.getElementsByTagName('html')[0].style.height = '350px'
      }
    }
  }
}
</script>

<style>
html {
  width: 350px;
}
</style>

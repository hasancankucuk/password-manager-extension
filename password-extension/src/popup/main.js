import Vue from 'vue'
import App from './App.vue'
import router from '../router'
import store from '../store'

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  render: h => { return h(App) },
  router
})

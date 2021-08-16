import Vue from 'vue'
import App from './App.vue'
import router from '../router'
import store from '../store'

chrome.runtime.sendMessage({
  popupOpen: true
})
/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  render: h => {
    return h(App)
  },
  router,
  mounted() {
    if (store.state.isLoggedIn) {
      if (router.currentRoute.path === '/loginPage') {
        router.push({
          path: '/'
        });
      }
    } else if (router.currentRoute.path !== '/loginPage') {
      router.push({
        path: '/loginPage'
      });
    }

    browser.tabs.executeScript(null, {
      code: 'var s = document.documentElement.outerHTML; chrome.runtime.sendMessage({action: "getSource", source: s});'
    })
    chrome.runtime.sendMessage({
      action: 'getSource'
    })

    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {})
  }
})
import localizedService from '../src/services/localized-services'
import store from '../src/store'

window.userMail = ''
window.userPassword = ''
window.url = ''

// TODO icon url değiştirilecek
function createNotifications () {
  chrome.notifications.create('NOTFICATION_ID', {
    type: 'basic',
    iconUrl: 'chrome-extension://abpggcnejmnbfeobnnmljaodkmkbkpcc/img/recenlty-used-icon.f28f8109.svg',
    title: localizedService.getLocalizedMessages('extName'),
    message: localizedService.getLocalizedMessages('notificationMessage')
  })
}

function setLocalStorage (settingsKey) {
  if (settingsKey.key === 'notifications') {
    localStorage.setItem('notifications', !store.state.isNotificationsEnable)
  } else if (settingsKey.key === 'toolbarNotifications') {
    localStorage.setItem('toolbarNotifications', !store.state.isToolbarNotificationEnable)
  }
}

function getLocalStorage () {
  var getNotification = JSON.parse(localStorage.getItem('notification'))
  var getToolbarNotification = JSON.parse(localStorage.getItem('toolbarNotifications'))
  if (localStorage.getItem('notifications') === null && localStorage.getItem('toolbarNotifications') === null) {

  } else {
    store.dispatch('setNotifications', getNotification)
    store.dispatch('setToolbarNotifications', getToolbarNotification)
  }
}

function authControl (auth) {
  if (auth.key === 'loggedIn') {
    store.dispatch('setLogIn', true)
    localStorage.setItem('logInfo', true)
  } else if (auth.key === 'loggedOut') {
    store.dispatch('setLogIn', false)
    localStorage.setItem('logInfo', false)
  }
}

function getAuthStatus (message) {
  if (message.popupOpen) {
    store.dispatch('setLogIn', localStorage.getItem('logInfo'))
  }
}

function getInfo (mesg) {
  if (mesg.action === 'getSource') {
    var temp = document.createElement('html')
    temp.innerHTML = mesg.source
    temp.getElementsByTagName('input').forEach(element => {
      if (element.type === 'text') {
        window.userMail = element.value
      }
      if (element.type === 'password') {
        window.userPassword = element.value
      }
      if (window.userPassword !== '' || window.userMail !== '') {
        saveUserAccounts()
      }
    })
  }
}

function saveUserAccounts () {
  if (window.userPassword === '' || window.userMail === '') {
    return
  }
  var axios = require('axios')
  var data = JSON.stringify({ id: 0, savedUsername: window.userMail, savedPassword: window.userPassword, savedUrl: window.url })
  var config = {
    method: 'post',
    url: 'https://192.168.0.28:5001/api/SaveAccountInfo',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  }

  axios(config).then(function (response) {
  }).catch(function (error) {
    console.log(error)
  })
}

function activatePopup () {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    window.url = tabs[0].url
  })
  try {
    chrome.runtime.sendMessage({ msg: 'activatePopup' })
  } catch (error) {
    console.log(error)
  }
}

// browser.tabs.onActivated.addListener(saveUserAccounts)
browser.tabs.onActivated.addListener(getLocalStorage)
browser.runtime.onMessage.addListener(setLocalStorage)
browser.tabs.onActivated.addListener(createNotifications)
browser.runtime.onMessage.addListener(authControl)
chrome.runtime.onMessage.addListener(getAuthStatus)
browser.runtime.onMessage.addListener(getInfo)
browser.tabs.onUpdated.addListener(activatePopup)
browser.tabs.onActivated.addListener(activatePopup)

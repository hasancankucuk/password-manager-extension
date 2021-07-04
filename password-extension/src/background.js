import localizedService from '../src/services/localized-services'
import store from '../src/store'
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

browser.tabs.onActivated.addListener(getLocalStorage)
browser.runtime.onMessage.addListener(setLocalStorage)
browser.tabs.onActivated.addListener(createNotifications)

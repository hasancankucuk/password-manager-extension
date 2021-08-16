import localizedService from '../src/services/localized-services'
import store from '../src/store'
import userInfoServices from './services/userInfoServices';
import saveAccountInfoModel from './models/saveAccountInfoModel';

window.infoServices = new userInfoServices();
window.userMail = ''
window.userPassword = ''
window.url = ''

function createNotifications(notifyId) {
  console.log(`notifyId`, notifyId);
  chrome.notifications.create('notifyId', {
    type: 'basic',
    iconUrl: 'icons/16.png',
    title: localizedService.getLocalizedMessages('extName'),
    message: localizedService.getLocalizedMessages('notificationMessage')
  })
}

function setLocalStorage(settingsKey) {
  if (settingsKey.key === 'notifications') {
    localStorage.setItem('notifications', !store.state.isNotificationsEnable)
  } else if (settingsKey.key === 'toolbarNotifications') {
    localStorage.setItem('toolbarNotifications', !store.state.isToolbarNotificationEnable)
  }
}

function getLocalStorage() {
  var getNotification = JSON.parse(localStorage.getItem('notification'))
  var getToolbarNotification = JSON.parse(localStorage.getItem('toolbarNotifications'))
  if (localStorage.getItem('notifications') === null && localStorage.getItem('toolbarNotifications') === null) {

  } else {
    store.dispatch('setNotifications', getNotification)
    store.dispatch('setToolbarNotifications', getToolbarNotification)
  }
}

// function authControl (auth) {
//   if (auth.key === 'loggedIn') {
//     store.dispatch('setLogIn', true)
//     localStorage.removeItem('token')
//     localStorage.removeItem('tokenId')
//     localStorage.removeItem('username')
//   } else if (auth.key === 'loggedOut') {
//     store.dispatch('setLogIn', false)
//     localStorage.removeItem('token')
//     localStorage.removeItem('tokenId')
//     localStorage.removeItem('username')
//   }
// }

function getAuthStatus(message) {
  window.url = "";
  if (message.popupOpen) {
    store.dispatch('setLogIn', localStorage.getItem('token'))
  }
}

function getInfo(mesg) {
  if (!localStorage.getItem("tokenId")) {
    return;
  }

  if (mesg.action === 'getSource') {
    console.log(window.url === mesg.url);
    if (window.url === mesg.url) {
      return;
    }

    var temp = document.createElement('html')
    temp.innerHTML = mesg.source;
    temp.getElementsByTagName('input').forEach(element => {
      if (element.type === 'text') {
        window.userMail = element.value
      } 
      
      if (element.type === 'password') {
        window.userPassword = element.value
      }

      if (!!window.userPassword && !!window.userMail) {
        window.url = mesg.url;
        saveUserAccounts(window.userPassword, window.userMail, mesg.url);
        window.userPassword = "";
        window.userMail = "";
        return;
      }
    })
  }
}

function saveUserAccounts(userPassword, userMail, url) {
  if (!userPassword && !userMail) {
    return;
  }

  var accountInfoModel = new saveAccountInfoModel();
  accountInfoModel.savedUrl = `${url}`;
  accountInfoModel.savedUsername = userMail;
  accountInfoModel.savedPassword = userPassword;
  accountInfoModel.userInfoModelId = localStorage.getItem("tokenId");

  window.infoServices.saveAccount(accountInfoModel).then(resp => {
    createNotifications(resp.data.id);
    window.url = url;
  }).catch(err => {
    window.url = "";
  });
}

function activatePopup() {
  window.url = "";
  chrome.tabs.query({
    currentWindow: true,
    active: true
  }, function (tabs) {
    if (tabs.length > 0) {
      window.url = tabs[0].url
    } else {
      window.url = undefined;
    }
  })
  try {
    chrome.runtime.sendMessage({
      msg: 'activatePopup'
    })
  } catch (error) {
    console.log(error)
  }
}

chrome.browserAction.onClicked.addListener(function (activeTab) {
  chrome.tabs.executeScript(null, {
    file: "js/content-script.js"
  });
});

// browser.tabs.onActivated.addListener(saveUserAccounts)
browser.tabs.onActivated.addListener(getLocalStorage)
browser.runtime.onMessage.addListener(setLocalStorage)
browser.tabs.onActivated.addListener(createNotifications)
// browser.runtime.onMessage.addListener(authControl)
chrome.runtime.onMessage.addListener(getAuthStatus)
browser.runtime.onMessage.addListener(getInfo)
browser.tabs.onUpdated.addListener(activatePopup)
browser.tabs.onActivated.addListener(activatePopup)
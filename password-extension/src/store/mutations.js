export default {
  setNotificationsMutation (state, payload) {
    state.isNotificationsEnable = payload
  },
  setToolbarNotificationMutation (state, payload) {
    state.isToolbarNotificationEnable = payload
    console.log(payload)
  }
}

export default {
  setNotifications ({ commit }, payload) {
    commit('setNotificationsMutation', payload)
  },
  setToolbarNotifications ({ commit }, payload) {
    commit('setToolbarNotificationMutation', payload)
  },
  setLogIn ({ commit }, payload) {
    commit('setLogInMutation', payload)
  }
}

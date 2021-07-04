import Vue from 'vue'
import Vuex from 'vuex'
import VuexWebExtensions from 'vuex-webextensions'
import state from './state'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)
export default new Vuex.Store({
  state,
  actions,
  mutations,
  plugins: [
    VuexWebExtensions({
      syncActions: false,
      // loggerLevel: 'debug',
      persistentStates: ['stateone']
    })
  ]
})

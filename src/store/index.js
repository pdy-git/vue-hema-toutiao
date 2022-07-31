import Vue from 'vue'
import Vuex from 'vuex'
import { setToken, getToken } from '@/utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  // JSON.parse(localStorage.getItem('HEIMA_TOUTIAO_TOUKEN'))
  state: {
    tokenObj: getToken() || {}
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.tokenObj = payload
      // localStorage.setItem('HEIMA_TOUTIAO_TOUKEN', JSON.stringify(payload))
      setToken(payload)
    }
  },
  actions: {},
  modules: {}
})

import { createStore } from 'vuex'

export default createStore({
  state: {
    auth: false,
    isAdmin: false
  },
  getters: {
    getAuth(state) {
      return state.auth
    },
    getIsAdmin(state) {
      return state.isAdmin
    }
  },
  mutations: {
    setAuth(state, payload) {
      state.auth = payload
    },
    setIsAdmin(state, payload) {
      state.isAdmin = payload
    }
  },
  actions: {
  },
  modules: {
  }
})

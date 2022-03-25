import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      tabMap: undefined,
    }
  },
  mutations: {
    setTabMap(state, payload) {
      state.tabMap = payload
    },
  },
  actions: {},
  modules: {},
})

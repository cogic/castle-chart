/**
 * @Author: Cogic
 * @Date: 2021-12-21 13:58:35
 * @LastEditors: Cogic
 * @LastEditTime: 2022-03-02 03:08:28
 * @Description: 
 */
import { createStore } from 'vuex'

export default createStore({
  state(){
    return {
      tabMap: undefined
    }
  },
  mutations: {
    setTabMap (state,payload) {
      state.tabMap = payload
    }
  },
  actions: {
  },
  modules: {
  }
})

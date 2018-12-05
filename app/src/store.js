import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dialogState: false
  },
  getters: {
    dialogState: state => {
      return state.dialogState
    }
  },
  mutations: {
    changeDialogState: (state, payload) => {
      state.dialogState = payload.state;
    }
  },
  actions: {
    HANDLE_DIALOG_STATE: ({ commit }, payload) => {
      commit('changeDialogState', payload);
    }
  }
})

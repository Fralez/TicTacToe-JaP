import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dialogState: false,
    drawerState: false,
    rankingUsers: []
  },
  getters: {
    dialogState: state => {
      return state.dialogState
    },
    drawerState: state => {
      return state.drawerState
    },
    rankingUsers: state => {
      return state.rankingUsers
    }
  },
  mutations: {
    changeDialogState: (state, payload) => {
      state.dialogState = payload.state;
    },
    changeDrawerState: (state, payload) => {
      state.drawerState = payload.state;
    },
    addRankingUsers: (state, payload) => {
      state.rankingUsers = payload.users;
    }
  },
  actions: {
    HANDLE_DIALOG_STATE: ({ commit }, payload) => {
      commit('changeDialogState', payload);
    },
    HANDLE_DRAWER_STATE: ({ commit }, payload) => {
      commit('changeDrawerState', payload);
    },
    PUSH_RANKING_USERS: (context, payload) => {
      context.commit('addRankingUsers', payload); 
    }
  }
})

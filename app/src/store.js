import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Tic-Tac-Toe API
import API from '@/general/ticTacToeApi.js'

export default new Vuex.Store({
  state: {
    // Rules dialog
    dialogState: false,
    // Home drawer
    drawerState: false,
    // Ranking top 5 users
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
    API_USERS: async (context, payload) => {
      const actionType = payload.type;
      switch(actionType) {
        case 'ranking':
          var res = await API.Users.ranking()
          var users = res.data
          context.commit('addRankingUsers', { users })
        break;
      }
    }
  }
})

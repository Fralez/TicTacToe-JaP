import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Tic-Tac-Toe API
import API from '@/general/ticTacToeApi.js'

export default new Vuex.Store({
  state: {
    // Rules dialog
    dialogState: false,
    // User form snackbar
    snackbar: {
      state: false,
      color: '',
      text: ''
    },
    // Ranking top 5 users
    rankingUsers: [],
    // Active user
    activeUser : null
  },
  getters: {
    dialogState: state => {
      return state.dialogState
    },
    rankingUsers: state => {
      return state.rankingUsers
    },
    snackbar: state => {
      return state.snackbar
    },
    activeUser: state => {
      return state.activeUser
    }
  },
  mutations: {
    changeDialogState: (state, payload) => {
      state.dialogState = payload.state;
    },
    changeSnackbar: (state, payload) => {
      state.snackbar = payload
    },
    addRankingUsers: (state, payload) => {
      state.rankingUsers = payload.users;
    },
    activeUser: (state, payload) => {
      state.activeUser = payload.user[0]
    }
  },
  actions: {
    HANDLE_DIALOG_STATE: ({ commit }, payload) => {
      commit('changeDialogState', payload);
    },
    HANDLE_SNACKBAR: ({ commit }, payload) => {
        commit('changeSnackbar', payload)
    },
    API_USERS: async (context, payload) => {
      const actionType = payload.type;

      switch(actionType) {
        case 'ranking':
          var res = await API.Users.ranking()
          var users = res.data
          context.commit('addRankingUsers', { users })
          break;
        
        case 'logIn':
          const res = await API.Users.logIn(payload.user)
          const user = res.data.user
          if(res.data.logIn) context.commit('activeUser', { user })
          break;
        
      }
    }
  }
})

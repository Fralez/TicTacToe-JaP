import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Tic-Tac-Toe API
import API from '@/general/ticTacToeApi.js'

export default new Vuex.Store({
  state: {
    // Rules dialog
    dialogState: false,
    // Log in player two state
    logInPlayerTwoState: false,
    // User form snackbar
    snackbar: {
      state: false,
      color: '',
      text: ''
    },
    // Ranking top 5 users
    rankingUsers: [ ],
    // Active user
    activeUser: { },
    // Active user matches    
    activeUserMatches: [ ],
    // Player two
    playerTwo: { },
    //Player's turn counter
    playerCounter: 0,
    // Match end dialog modal
    matchEndDialog: false,
    // Match result
    matchResult: 'tie'
  },
  getters: {
    dialogState: state => state.dialogState,

    rankingUsers: state => state.rankingUsers,

    snackbar: state => state.snackbar,

    activeUser: state => state.activeUser,

    playerTwo: state => state.playerTwo,

    logInPlayerTwoState: state => state.logInPlayerTwoState,

    playerCounter: state => state.playerCounter,

    playerTurn: state => state.playerCounter % 2 == 0 ? state.activeUser : state.playerTwo,

    matchEndDialog: state => state.matchEndDialog,

    matchEndDialogText: (state) => {
      if(state.matchResult == 'winCase') {
        const player = state.playerCounter % 2 == 0 ? state.activeUser : state.playerTwo
        return `${player.name} Win!`
      } else if(state.matchResult == 'tie'){
        return 'Tie!'
      }
    }
  },
  mutations: {
    changeDialogState: (state, payload) => state.dialogState = payload.state,
    
    changeLogInPlayerTwoState: (state, payload) => state.logInPlayerTwoState = payload.state,
     
    changeSnackbar: (state, payload) => state.snackbar = payload,
    
    addRankingUsers: (state, payload) => state.rankingUsers = payload.users,
    
    activeUser: (state, payload) => state.activeUser = payload,
    
    playerTwo: (state, payload) => state.playerTwo = payload,
    
    logOut: state => state.activeUser = null,
    
    countPlayerTurn: state => state.playerCounter++,

    setActiveUserMatches: (state, payload) => state.activeUserMatches = payload,
    
    winCaseMatchResult: state => state.matchResult = 'winCase',
    
    matchPoint: state => {
      state.matchResult = 'tie'
      state.matchEndDialog = !state.matchEndDialog
    }
  },
  actions: {
    HANDLE_DIALOG_STATE: ({ commit }, payload) => {
      commit('changeDialogState', payload);
    },
    HANDLE_LOGIN_PLAYER_TWO_STATE: ({ commit }, payload) => {
      commit('changeLogInPlayerTwoState', payload);
    },
    HANDLE_SNACKBAR: ({ commit }, payload) => {
        commit('changeSnackbar', payload)
    },
    API_USERS: async (context, payload) => {
      const actionType = payload.type;

      switch(actionType) {
        case 'ranking':
          var resRanking = await API.Users.ranking()
          var users = resRanking.data
          context.commit('addRankingUsers', { users })
          break;
        
        case 'logIn':
          var resLogIn = await API.Users.logIn(payload.user)
          var user = resLogIn.data.user[0]
          if(!payload.playerTwo) {
            if(resLogIn.data.logIn) context.commit('activeUser', user)
          } else {
            context.commit('playerTwo', user)
          }
          break;
        
        case 'getUserMatches':
          var resMatches = await API.Users.matches(payload.userId)
          var matches = resMatches.data
          context.commit('setActiveUserMatches', matches)
          break;
      }
    },
    API_POST_MATCH: async ({ commit }, payload) => {
      const res = await API.Matches.postOne(payload)
      commit('matchPoint')
      if(!res.data.tie) {
        commit('winCaseMatchResult')
      }
    },
    SET_ACTIVE_USER: ({ commit }, payload) => {
      commit('activeUser', payload.user)
    },
    LOG_OUT: ({ commit }) => {
      commit('logOut')
    },
    COUNT_TURN: ({ commit }) => {
      commit('countPlayerTurn')
    },
    MATCH_POINT: ({ commit }) => {
      commit('matchPoint')
    }
  }
})

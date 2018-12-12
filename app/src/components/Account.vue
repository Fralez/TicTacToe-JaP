<template>
  <div class="account">
    <v-container fluid>
      <v-layout text-xs-center row wrap>
        <v-flex xs12>
          <span class="display-2">Account</span>
        </v-flex>
      </v-layout>
      <v-layout row wrap align-center justify-center>
        <v-flex xs12 md6 class="pt-5">
          <v-container>
            <v-card flat color="rgba(0, 128, 128, .6)">
              <v-card-title class="display-1 center-el">
                Personal Info
              </v-card-title>
              <v-layout wrap fill-height class="pa-3">

                <v-flex xs12 class="pb-4">
                  <div class="subheading">Username</div>
                  <div class="headline">
                    <v-btn fab flat small @click="toggleEditName">
                      <v-icon>edit</v-icon>
                    </v-btn>
                    {{ this.$store.getters.activeUser.name }}
                  </div>
                </v-flex>
                
                <v-flex xs12 md4>
                  <div class="subheading">Victories</div>
                  <div class="headline">{{ this.$store.getters.activeUser.victories }}</div>
                </v-flex>

                <v-flex xs12 md4>
                  <div class="subheading">Ties</div>
                  <div class="headline">{{ this.$store.getters.activeUser.ties }}</div>
                </v-flex>

                <v-flex xs12 md4>
                  <div class="subheading">Defeats</div>
                  <div class="headline">{{ this.$store.getters.activeUser.defeats }}</div>
                </v-flex>
              
              </v-layout>
            </v-card>
          </v-container>
        </v-flex>
        <v-flex xs12 md12 class="pa-4 center-el">
          <v-btn round large class="teal lighten-3 play-btn" @click="openPlayerTwoLogIn">
            <span class="display-2">Play!</span>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>

    <v-dialog v-model="editDialog" width="700">
      <v-card color="teal lighten-3">
        <v-card-title class="headline teal">
          Edit Name
        </v-card-title>
        <v-card-text class="subheading">
          <v-text-field
            label="New name"
            v-model="newName"
          >

          </v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" flat @click="changeName">
            Change
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <PlayModal />
    <Snackbar />
  </div>
</template>

<script>
import API from '../general/ticTacToeApi.js'

import PlayModal from './PlayModal'
import Snackbar from '../views/Snackbar'

  export default {
    components: { 'PlayModal': PlayModal, 'Snackbar': Snackbar },
    data() {
      return {
        editDialog: false,
        newName: ''
      }
    },
    methods: {
      openPlayerTwoLogIn() {
        this.$store.dispatch('HANDLE_LOGIN_PLAYER_TWO_STATE', { state: true })        
      },
      toggleEditName() {
        this.editDialog = !this.editDialog 
      },
      async changeName() {
        if(!this.newName.trim()) {
          return null
        }
        const updateInfo = {
          name: this.newName
        }

        JSON.stringify(updateInfo)
        
        await API.Users.updateOne(this.$route.params.userId, updateInfo);
        this.toggleEditName()
        this.$store.dispatch('HANDLE_SNACKBAR', {
          state: true,
          color: 'teal accent-3',
          text: 'Name changed! Refresh the page to see the changes'
        })
      }
    },
    created() {
      (async () => {
        const userId = this.$route.params.userId
        const res = await API.Users.getOne(userId)
        const user = res.data
        this.$store.dispatch('SET_ACTIVE_USER', { user })
      })()
    }
  }
</script>

<style scoped>
.center-el {
  display: flex;
  justify-content: center;
}
.play-btn {
  min-height: 15vw;
  min-width: 30vw;
}

</style>
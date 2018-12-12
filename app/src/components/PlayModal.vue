<template>
  <div class="playModal">
    <v-dialog v-model="logInPlayerTwoState" width="700">
      <v-card color="teal lighten-3">
        <v-card-title class="headline teal">
          Log in Player 2
        </v-card-title>
        <div>
          <v-form class="pa-3">
            <v-text-field
              v-model="user.name"
              label="Username"
              color="black"
              :rules="formRules"
              required
            >
            </v-text-field>
            <v-text-field
              type="password"
              v-model="user.password"
              label="Password"
              color="black"
              :rules="formRules"
              required
            ></v-text-field>
          </v-form>
        </div>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" flat @click="logIn">
            Log In
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user: {
          name: '',
          password: ''
        },
        formRules: [
          v => !!v || 'Required field'
        ]
      }
    },
    computed: {
      logInPlayerTwoState: {
        get() {
          return this.$store.getters.logInPlayerTwoState;
        },
        set() {
          return this.closeLogInPlayerTwo();
        }
    },
  },
  methods: {
    logIn() {
      (async () => {
          // Log In
        try {
          await this.$store.dispatch('API_USERS', {
            type: 'logIn',
            user: this.user,
            playerTwo: true
          })
          if(this.$store.getters.activeUser._id === this.$store.getters.playerTwo._id) throw Error()
          this.$router.push({
            name: 'play',
            query: {
              playerOne: this.$store.getters.activeUser._id,
              playerTwo: this.$store.getters.playerTwo._id
            }
          })
          this.closeLogInPlayerTwo()
        } catch (error) {
          const snackbarPayload = {
            state: true,
            color: 'error',
            text: 'Error, please verify the fields filled'
          }
          this.$store.dispatch('HANDLE_SNACKBAR', snackbarPayload) 
        }
      })()
    },
    closeLogInPlayerTwo() {
      this.$store.dispatch('HANDLE_LOGIN_PLAYER_TWO_STATE', { state: false })        
    }
  }
}
</script>

<style scoped>

</style>
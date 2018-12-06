<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex>
        <v-card flat color="rgba(0, 128, 128, .6)" class="userForm pa-4">
          <v-card-title class="display-1 d-flex userForm--text">
            {{ formText }}
          </v-card-title>
          <v-form>
            <v-text-field
              v-model="user.name"
              label="Username"
              color="black"
              :rules="formRules"
              required
            ></v-text-field>
            <v-text-field
              type="password"
              v-model="user.password"
              label="Password"
              color="black"
              :rules="formRules"
              required
            ></v-text-field>
          </v-form>
          <v-btn class="teal lighten-3" @click="submitForm" flat>
            {{ formText }}
          </v-btn>
          <v-flex xs12>
            <v-btn flat small class="caption text-capitalize font-weight-light" v-if="!signUpMode" :ripple="false" @click="changeMode">
              Not a user? Sign Up Now!
            </v-btn>
            <v-btn flat small class="caption text-capitalize font-weight-light" v-if="signUpMode" :ripple="false" @click="changeMode">
              Oops! Actually I already have a user
            </v-btn>
          </v-flex>
        </v-card>
      </v-flex>
    </v-layout>
    
    <div class="text-xs-center">
      <v-snackbar v-model="snackbar" bottom :timeout="2000" color="teal accent-3">
        <span class="black--text">Sign up successful!</span>
        <v-btn color="teal darken-4" flat @click="snackbar = false">
          Close
        </v-btn>
      </v-snackbar>
    </div>
  </v-container>
</template>

<script>
import API from '../general/ticTacToeApi.js'

  export default {
    name: 'UserForm',
    data() {
      return {
        formText: 'Log In',
        formRules: [
          v => !!v || 'Required field'
        ],
        user: {
          name: '',
          password: ''
        },
        // Form mode
        signUpMode: false,
        // Form state
        submitted: false,
        // Sign up snackbar
        snackbar: false
      }
    },
    methods: {
      async submitForm() {
        if(!this.signUpMode) {
          // Log In
          const res = await API.Users.logIn(this.user);

          if(res.data.logIn) this.submitted = true && this.$router.push({ name: 'account' })
          
          this.handleSubmit(this.submitted)
        } else {
          // Sign Up
          const res = await API.Users.postOne(this.user)
          if(res.status == 201) {
            this.submitted = true
            this.snackbar = true
          }
          this.changeMode()
        }
      },
      handleSubmit() {
        
      },
      changeMode() {
        this.signUpMode = !this.signUpMode
        this.user = {
          name: `${this.user.name}`,
          password: ''
        }
      }
    },
    watch: {
      signUpMode: function(value) {
        if (value) {
          this.formText = 'Sign Up'
        } else {
          this.formText = 'Log In'        
        }
      },
      dialog (val) {
        if (!val) return
      }
    }
  }
</script>

<style scoped>

.userForm--text {
  justify-content: center;
}

</style>
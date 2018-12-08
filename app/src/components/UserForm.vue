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
            >
              <v-tooltip slot="append" top color="teal" v-if="signUpMode">
                  <v-icon @click="validateName" slot="activator" color="black" dark>check_circle</v-icon>
                  <span class="black--text">Validate name</span>
              </v-tooltip>
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

    <Snackbar />
  </v-container>
</template>

<script>
import API from '../general/ticTacToeApi.js'

import Snackbar from '../views/Snackbar'

  export default {
    name: 'UserForm',
    components: { 'Snackbar': Snackbar },
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
        signUpMode: false
      }
    },
    methods: {
      async submitForm() {
        if(!this.signUpMode) {
          // Log In
          this.$store.dispatch('API_USERS', {
            type: 'logIn',
            user: this.user
          })
          if(this.$store.getters.activeUser) {
            this.$router.push({ name: 'account' })
          } else {
            const snackbarPayload = {
              state: true,
              color: 'error',
              text: 'Error, please verify the fields filled'
            }
            this.$store.dispatch('HANDLE_SNACKBAR', snackbarPayload) 
          }
        } else {
          // Sign Up
          let snackbarPayload =  { }
          try {
            const res = await API.Users.postOne(this.user)
            if(res.status == 201) {
              this.submitted = true
              snackbarPayload = {
                state: true,
                color: 'teal accent-3',
                text: 'Sign Up Successful! Now Log in'
              }
              this.changeMode()
            }  
          } catch (error) {
            snackbarPayload = {
              state: true,
              color: 'error',
              text: 'Error, please verify the fields filled'
            }
          }
          this.$store.dispatch('HANDLE_SNACKBAR', snackbarPayload)
        }
      },
      changeMode() {
        this.signUpMode = !this.signUpMode
        this.user = {
          name: `${this.user.name}`,
          password: ''
        }
      },
      async validateName() {
        if(this.signUpMode) {
          if(!this.user.name) return null  

          const res = await API.Users.index();

          const userWithName = res.data.find(({ name }) => {
            return this.user.name === name
          })

          let snackbarPayload = { };
          if (userWithName) {
            snackbarPayload = {
              state: true,
              color: 'error',
              text: 'Username already taken'
            }
          } else {
            snackbarPayload = {
              state: true,
              color: 'success',
              text: 'Username available'
            }
          }
          this.$store.dispatch('HANDLE_SNACKBAR', snackbarPayload)
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
      }
    }
  }
</script>

<style scoped>

.userForm--text {
  justify-content: center;
}

</style>
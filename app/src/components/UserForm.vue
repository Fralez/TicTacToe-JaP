<template>
  <v-card flat color="rgba(0, 128, 128, .6)" class="userForm pa-4">
    <v-card-title class="display-1 d-flex signIp--title">
      {{ heading }}
    </v-card-title>
    <v-form>
      <v-text-field
        v-model="user.name"
        label="Username"
        color="black"
        required
      ></v-text-field>
      <v-text-field
        v-model="user.password"
        label="Password"
        color="black"
        required
      ></v-text-field>
    </v-form>
    <v-btn class="teal lighten-3" @click="submitForm" flat>
      {{ btnText }}
    </v-btn>
  </v-card>
</template>

<script>
// Tic-Tac-Toe API
import API from '../general/ticTacToeApi.js'


  export default {
    name: 'UserForm',
    data() {
      return {
        heading: 'Log In',
        btnText: 'Log In',
        user: {
          name: '',
          password: ''
        }
      }
    },
    methods: {
      async submitForm() {
        // check if user is actually signed up
      }
    },
    mounted() {
      if(this.$route.name == 'home') {
        this.heading = 'Not a user? Sign Up Now!'
        this.btnText = 'Sign Up'
        this.submitForm = async function() {
          
        }
      }
    }
  }
</script>

<style scoped>

.signIp--title {
  justify-content: center;
}

</style>
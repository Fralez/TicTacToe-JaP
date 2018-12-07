<template>
  <div class="Home">
    <v-container fluid align-center>
      <v-layout row wrap justify-space-around align-center>

        <v-flex xs12 md4 text-xs-center class="ma-3">
          <SignIn />
        </v-flex>

        <v-flex xs12 md5>
          <Ranking />
        </v-flex>

      </v-layout>
    </v-container>

  </div>
</template>

<script>
import SignIn from '../components/UserForm'
import Ranking from '../components/Ranking'


  export default {
    components: {
      'SignIn': SignIn,
      'Ranking': Ranking,
    }    
  }
</script>

<style scoped>

</style>
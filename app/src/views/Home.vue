<template>
  <div class="Home">
    <Navbar />
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

    <Rules />
    <Drawer />
  </div>
</template>

<script>
import Navbar from './Navbar'
import Rules from './Rules'
import Drawer from './Drawer'
import SignIn from '../components/UserForm'
import Ranking from '../components/Ranking'


  export default {
    components: {
      'Navbar': Navbar,
      'Rules': Rules,
      'SignIn': SignIn,
      'Ranking': Ranking,
      'Drawer': Drawer
    }    
  }
</script>

<style scoped>

</style>
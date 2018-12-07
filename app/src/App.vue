<template>
  <v-app class="teal lighten-1 disable--UserSelect">    
    <v-content>
      <Navbar app/>
      <router-view />
      <Rules />
    </v-content>
  </v-app>
</template>

<script>
import Navbar from './views/Navbar'
import Rules from './views/Rules'

export default {
  name: 'App',
  components: {
    'Navbar': Navbar,
    'Rules': Rules,
  }
}
</script>

<style>
.disable--UserSelect {
  user-select: none;
}
</style>

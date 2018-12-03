<template>
  <div class="Navbar">
    <v-toolbar app>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title class="headline">Tic Tac Toe</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn :to="{ name: 'rules' }" flat class="subheading">Rules</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped>

</style>
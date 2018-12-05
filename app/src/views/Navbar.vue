<template>
  <div class="navbar">
    <v-toolbar flat app class="teal lighten-1">
      
      <!-- Mobile -->
      <v-toolbar-side-icon class="hidden-md-and-up" @click="changeDrawerState">
        <v-icon>menu</v-icon>
      </v-toolbar-side-icon>      

      <v-toolbar-side-icon disabled v-if="this.$vuetify.breakpoint.mdAndUp">
        <img src="../assets/TicTacToe.svg" class="ticTacToeIcon">
      </v-toolbar-side-icon>
      
      <v-toolbar-title class="headline">
        <span class="font-weight-light">Tic </span>
        <span class="font-weight-regular"> Tac </span>
        <span class="font-weight-medium"> Toe</span>
      </v-toolbar-title>
      
      <v-spacer></v-spacer>

      <v-toolbar-side-icon disabled v-if="!this.$vuetify.breakpoint.mdAndUp">
        <img src="../assets/TicTacToe.svg" class="ticTacToeIcon">
      </v-toolbar-side-icon>
      
      <!-- Desktop -->
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn router :to="{ name: 'play' }" flat class="subheading font-weight-regular">Play</v-btn>
        <v-btn flat class="subheading font-weight-regular" @click="openRules">Rules</v-btn>
      </v-toolbar-items>
    
    </v-toolbar>

    <v-layout>
      <v-navigation-drawer app temporary width="200" v-model="drawerState" class="teal darken-1">
        <v-list>
          
          <v-list-tile router :to="{ name: 'play' }" flat class="subheading font-weight-regular">
            <v-list-tile-title>
              Play
            </v-list-tile-title>
          </v-list-tile>

          <v-list-tile flat class="subheading font-weight-regular" @click="openRules">
            <v-list-tile-title>
              Rules
            </v-list-tile-title>
          </v-list-tile>
        
        </v-list>
      </v-navigation-drawer>
    </v-layout>
  </div>
</template>

<script>
  export default {
    name: 'Navbar',
    data() {
      return {
        drawerState: false
      }
    },
    methods: {
      openRules() {
        this.$store.dispatch('HANDLE_DIALOG_STATE', { state: true })
      },
      changeDrawerState() {
        this.drawerState = !this.drawerState
      }
    }
  }
</script>

<style scoped>
.ticTacToeIcon {
  height: 2.5rem;
}

</style>
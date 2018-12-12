<template>
  <div class="navbar">
    <v-toolbar flat app class="teal lighten-1">

      <v-toolbar-side-icon disabled>
        <img src="../assets/TicTacToe.svg" class="ticTacToeIcon">
      </v-toolbar-side-icon>
      
      <v-toolbar-title class="headline">
        <span class="font-weight-light">Tic </span>
        <span class="font-weight-regular"> Tac </span>
        <span class="font-weight-medium"> Toe</span>
      </v-toolbar-title>
      
      <v-spacer></v-spacer>
 
      <v-toolbar-items>
        <v-btn @click="goToHistory" v-if="this.$route.name == 'account'" small flat :fab="!this.$vuetify.breakpoint.mdAndUp">
          <span v-if="this.$vuetify.breakpoint.mdAndUp" class="subheading font-weight-regular">
            History
          </span>
          <v-icon v-if="!this.$vuetify.breakpoint.mdAndUp" medium>history</v-icon>
        </v-btn>

        <v-btn @click="goBack" v-if="this.$route.name == 'history'" small flat :fab="!this.$vuetify.breakpoint.mdAndUp">
          <span v-if="this.$vuetify.breakpoint.mdAndUp" class="subheading font-weight-regular">
            Back
          </span>
          <v-icon v-if="!this.$vuetify.breakpoint.mdAndUp" medium>arrow_back</v-icon>
        </v-btn>
      </v-toolbar-items>
      
      <v-toolbar-items v-if="this.$route.name == 'account'" @click="logOut">
        <v-btn flat small :fab="!this.$vuetify.breakpoint.mdAndUp">
          <span v-if="this.$vuetify.breakpoint.mdAndUp" class="subheading font-weight-regular">
            Log out
          </span>
          <img src="../assets/logout.svg" v-if="!this.$vuetify.breakpoint.mdAndUp" class="accountIcon">
        </v-btn>
      </v-toolbar-items>

      <v-toolbar-side-icon @click="openRules">
        <v-icon color="grey darken-4">info_outline</v-icon>
      </v-toolbar-side-icon>
    
    </v-toolbar>
  </div>
</template>

<script>
  export default {
    name: 'Navbar',
    methods: {
      openRules() {
        this.$store.dispatch('HANDLE_DIALOG_STATE', { state: true })
      },
      openDrawer() {
        this.$store.dispatch('HANDLE_DRAWER_STATE', { state: true })        
      },
      logOut() {
        this.$store.dispatch('LOG_OUT')
        this.$router.push({ name: 'home' })
      },
      goToHistory() {
        this.$router.push({ name: 'history', params: { userId: this.$route.params.userId} })
      },
      goBack() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
.ticTacToeIcon {
  height: 2.5rem;
}

.accountIcon {
  height: 1.5rem;
}

</style>

<template>
  <v-navigation-drawer app temporary width="200" v-model="drawerState" class="teal lighten-2" v-if="this.$vuetify.breakpoint.smAndDown">
    <v-container>
      <v-layout row justify-center>
        <v-flex>
          <v-list>
            
            <v-list-tile router :to="{ name: 'play' }" flat class="subheading font-weight-regular">
              <v-list-tile-action>
                <v-icon>play_arrow</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>Play</v-list-tile-title>
            </v-list-tile>

            <v-list-tile flat class="subheading font-weight-regular" @click="openRules">
              <v-list-tile-action>
                <v-icon>chrome_reader_mode</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>Rules</v-list-tile-title>
            </v-list-tile>
          
          </v-list>
        </v-flex>
      </v-layout>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
  export default {
    computed: {
      drawerState: {
        get() {
          return this.$store.getters.drawerState;
        },
        set(state) {
          if(!state) return this.closeDrawer();
        }
      }
    },
    methods: {
      openRules() {
        this.$store.dispatch('HANDLE_DIALOG_STATE', { state: true })
      },
      closeRules() {
        this.$store.dispatch('HANDLE_DIALOG_STATE', { state: false })        
      },
      closeDrawer() {
        this.$store.dispatch('HANDLE_DRAWER_STATE', { state: false })        
      }
    }
  }
</script>

<style scoped>

</style>
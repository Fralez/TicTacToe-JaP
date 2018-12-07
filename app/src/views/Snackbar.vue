<template>
  <div class="text-xs-center">
    <v-snackbar v-model="snackbar.state" bottom :timeout="3000" :color="`${snackbar.color}`">
      <span class="black--text">{{ snackbar.text }}</span>
      <v-btn color="black" flat @click="this.closeSnackbar">
        Close
      </v-btn>
    </v-snackbar>
  </div></template>
<script>
import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'snackbar'
      ])
    },
    methods: {
      closeSnackbar() {
          this.$store.dispatch('HANDLE_SNACKBAR', {
            state: false,
            color: '',
            text: ''
          })
      }
    }
  }
</script>

<style scoped>

</style>
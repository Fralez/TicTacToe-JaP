<template>
  <div class="play">
    <v-container>
      <v-layout align-center row justify-end>
        <v-flex  xs12 md6>
          <span class="display-4">Moves: {{ playerTurn.name }} - {{ mark }}</span>
        </v-flex>
          <Board />
      </v-layout>

      <v-dialog v-model="this.$store.getters.matchEndDialog" persistent width="500">
        <v-card color="teal lighten-3" >
          <v-card-title class="headline teal center-el">
            {{ this.$store.getters.matchEndDialogText }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="black" flat @click="goToAccount">
              Go to account
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import Board from './gameElements/Board'

  export default {
    data() {
      return {
        data: null
      }
    },
    computed: {
      playerTurn() {
        return this.$store.getters.playerTurn
      },
      mark() {
        return this.$store.state.playerCounter % 2 == 0 ? 'X' : 'O'
      }
    },
    methods: {
      goToAccount() {
        this.$router.go(-1)
        this.$store.dispatch('MATCH_POINT')
      }
    },
    components: {
      'Board': Board
    }
  }
</script>

<style scoped>
.center-el {
  display: flex;
  justify-content: center;
}
</style>
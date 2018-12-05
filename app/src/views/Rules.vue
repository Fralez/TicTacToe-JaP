<template>
  <div>
    <v-dialog v-model="dialogState" width="700">
      <v-card color="teal lighten-3">
        <v-card-title class="headline teal">
          Rules
        </v-card-title>
        <v-card-text class="subheading">
          The object of Tic Tac Toe is to get three in a row. You play on a three by three game board. The first player is known as X and the second is O. Players alternate placing Xs and Os on the game board until either oppent has three in a row or all nine squares are filled. X always goes first, and in the event that no one has three in a row, the stalemate is called a cat game.
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" flat @click="closeRules">
            Ok! Let's play!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

  export default {
    computed: {
      dialogState: {
        get() {
          return this.$store.getters.dialogState;
        },
        set() {
          return this.closeRules();
        }
      }
    },
    methods: {
      closeRules() {
        this.$store.dispatch('HANDLE_DIALOG_STATE', { state: false })        
      }
    },
  }
</script>

<style scoped>

</style>
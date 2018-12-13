<template>
  <div>
    <v-container class="my-5">
     
      <div>
        <span class="display-2 d-flex ranking--title mb-4" app>
          History
        </span>
        <span class="subheading d-flex ranking--title mt-4 ml-3" app>
          Most Recent
        </span>

        <v-card flat color="rgba(0, 128, 128, .6)" width="1000" v-for="(match, index) in matches" :key="index">
          <v-layout row wrap :class="`pa-3`" align-center >
            <v-flex xs6 md6>
              <div class="subheading">Against:</div>
              <div class="headline">{{ userNames[index] }}</div>
            </v-flex>
            <v-flex xs6 md4>
              <div class="subheading">Result:</div>
              <div class="headline">{{ matchResult(match) }}</div>
            </v-flex>
          </v-layout>
        </v-card>
      </div>

    </v-container>
  </div>
</template>

<script>
import API from '../general/ticTacToeApi.js'

  export default {
    data() {
      return {
        userNames: [

        ]
      }
    },
    methods: {
      matchResult(match) {
        if(match.tie) {
          return 'Tie'
        } else {
        return match.winner == this.activeUserId ? 'Victory' : 'Defeat'  
        }
      }
    },
    computed: {
      activeUserId() {
        return this.$store.getters.activeUser._id
      },
      matches() {
        return this.$store.state.activeUserMatches.reverse()
      }
    },
    created() {
      (async () => {
        await this.$store.dispatch('API_USERS', { type: 'getUserMatches', userId: this.$route.params.userId })
        
        this.matches.forEach(match => {
          (async () => {
            let playerTwo
            this.activeUserId !== match.players[0] ? playerTwo = match.players[0] : playerTwo = match.players[1]
            
            const res = await API.Users.getOne(playerTwo)
            this.userNames.push(res.data.name)
          })()
        })
      })()

    }
  }
</script>

<style scoped>

</style>
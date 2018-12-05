<template>
  <div>
    <v-container class="my-5">

      <v-card flat color="rgba(0, 128, 128, .6)">
        <v-card-title class="display-1 d-flex signIp--title">
          Ranking
        </v-card-title>
        <v-layout row wrap :class="`pa-3`" align-center v-for="(user, index) in rankingUsers" :key="index">
          <v-flex xs12 md2>
            <v-chip flat small 
            :class="{
              headline: true,
              firstRank: (index + 1 === 1),
              secondRank: (index + 1 === 2),
              thirdRank: (index + 1 === 3),
              normalChip: (index + 1 > 3)
            }" 
            >{{ index + 1 }}</v-chip>
          </v-flex>
          <v-flex xs6 md6>
            <div class="subheading">Player</div>
            <div class="headline">{{ user.name }}</div>
          </v-flex>
          <v-flex xs6 md4>
            <div class="subheading">Victories</div>
            <div class="headline">{{ user.victories }}</div>
          </v-flex>
        </v-layout>
        <v-divider />
      </v-card>

    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// Tic-Tac-Toe API
import API from '../general/ticTacToeApi.js'

  export default {
    name: 'Ranking',
    computed: {
      ...mapGetters([
        'rankingUsers'
      ])
    },
    mounted() {
      (async () => {
        const res = await API.Users.ranking()
        const users = res.data
        this.$store.dispatch('PUSH_RANKING_USERS', { users });
      })()
    }
  }
</script>

<style scoped>
.firstRank {
  background-color: #FFD700;
}

.secondRank {
  background-color: #C0C0C0;
}

.thirdRank {
  background-color: #cd7f32;
}

.normalChip {
  background-color: teal;
}

</style>
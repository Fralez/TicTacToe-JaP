<template>
  <div>
    <v-container class="my-5">

      <v-card flat hover color="rgba(0, 128, 128, .6)">
        <v-card-title class="display-1 d-flex ranking--title">
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
        <v-layout row>
          <v-flex xs12 class="d-flex ranking--title">
            <v-icon class="py-3" v-if="rankingUsers.length == 0">clear</v-icon>
          </v-flex>
        </v-layout>
      </v-card>

    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

  export default {
    name: 'Ranking',
    computed: {
      ...mapGetters([
        'rankingUsers'
      ])
    },
    created() {
      (async () => {
        this.$store.dispatch('API_USERS', { type: 'ranking' });
      })()
    }
  }
</script>

<style scoped>
.ranking--title {
  justify-content: center;
}

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
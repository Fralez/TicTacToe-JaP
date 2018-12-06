<template>
  <v-app class="teal lighten-1 disable--UserSelect">    
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.disable--UserSelect {
  user-select: none;
}
</style>

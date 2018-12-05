<template>
  <div class="login test">
    <v-form>
      <v-text-field
        v-model="user.name"
        label="Username"
        color="black"
        required
      ></v-text-field>
      <v-text-field
        v-model="user.password"
        label="Password"
        color="black"
        required
      ></v-text-field>
    </v-form>
  </div>
</template>

<script>
  export default {
    name: 'UserForm',
    data() {
      return {
        user: {
          name: '',
          password: ''
        }
      }
    }
  }
</script>

<style scoped>

.test {
  margin: 2rem;
}

</style>
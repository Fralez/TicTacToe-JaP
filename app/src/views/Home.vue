<template>
  <div class="Home">
    <Navbar />
    <SignIn />

    <Rules />
  </div>
</template>

<script>
import Navbar from './Navbar'
import Rules from './Rules'
import SignIn from '../components/UserForm'

  export default {
    components: {
      'Navbar': Navbar,
      'Rules': Rules,
      'SignIn': SignIn
    }    
  }
</script>

<style scoped>

</style>
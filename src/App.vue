<template>
    <v-app>
        <RegistrationForm/>
    </v-app>
</template>

<script>
import RegistrationForm from './components/RegistrationForm.vue'
export default {
  name: 'App',
  components: {
      RegistrationForm
  }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
}
html {
    overflow-y: auto
}
</style>

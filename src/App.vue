<template>
  <h1>vee validate v4 form</h1>
  <VeeForm />
</template>

<script>
import VeeForm from './components/VeeForm.vue';

export default {
  name: 'App',
  components: { VeeForm },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

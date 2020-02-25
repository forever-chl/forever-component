<template>
  <div id="app">
    <meeting></meeting>
  </div>
</template>

<script>
import Meeting from './components/Meeting.vue'

export default {
  name: 'app',
  components: {
    Meeting
  },
}
</script>

<style>
html{
  background:#f1f1f1;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

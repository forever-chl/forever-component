<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <SectorMenu :btnList="btnList" @operateClick="operateClick"/>
  </div>
</template>

<script>
import SectorMenu from './components/SectorMenu.vue'

export default {
  name: 'app',
  data(){
    return{
      btnList: [
          {
            text:"审核",
            item: 1
          },
          {
            text:"提交确认",
            item: 2
          },
          {
            text:"提交审核",
            item: 3
          }
      ]
    } 
  },
  components: {
    SectorMenu
  },
  methods:{
    operateClick(item){
      console.log(`operateClick${item}`)
    }
  }
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

<template>
  <div id="app">
    <van-nav-bar :title="title">
        <div class="left" slot="left" @click="goBack" v-if="isLeft">
          <van-icon name="arrow-left" />
          <span>返回</span>
        </div>
        <van-icon :name="rightIcon" slot="right" v-if="isRight"/>
    </van-nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import {NavBar,Icon} from 'vant'
import {mapState} from 'vuex'
export default {
  name: 'app',
  computed:{
    ...mapState({
      title: state => state.title,
      isLeft: state => state.isLeft,
      isRight: state => state.isRight,
      rightIcon: state => state.rightIcon
    })
  },
  components:{
    [NavBar.name]:NavBar,
    [Icon.name]:Icon
  },
  methods:{
    goBack(){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less">
  @import './assets/less/global.less';
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>

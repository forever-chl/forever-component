<template>
    <div :class="'SectorMenu '+(showMenu? 'show' :'')">
        <div class="operate" @click="operate"><span>操作</span></div>
        <div class="check" @click="operateClick(btnList[0].item)"><span>{{btnList[0].text}}</span></div>
        <div class="confirm" @click="operateClick(btnList[1].item)"><span>{{btnList[1].text}}</span></div>
        <div class="giveCheck" @click="operateClick(btnList[2].item)"><span>{{btnList[2].text}}</span></div>
    </div>
</template>

<script>
export default {
  name: 'SectorMenu',
  props: {
    btnList: Array[Object]
  },
  data(){
    return{
      showMenu:false
    }
  },
  methods:{
    operate(){
      this.showMenu = !this.showMenu
    },
    operateClick(item){
        this.showMenu = !this.showMenu
        this.$emit('operateClick',item)
    }
  }
}
</script>

<style lang="less">
   .SectorMenu{
    position: fixed;
    bottom: 37px;
    right: 37px;
    z-index: 100;
    .operate{
        position: absolute;
        bottom:0;
        right:0;
        z-index: 1;
        width:42px;
        height:42px;
        background: #ddedff;
        color:#1f76f3;
        font-size: 12px;
        box-shadow: 0px 3px 5px 1px rgba(31, 118, 243, 0.1);
        border-radius: 100%;
        text-align: center;
        line-height: 42px;
    }
    .check,.confirm,.giveCheck{
        position: absolute;
        bottom:0;
        right:0;
        transform: translate(0,0);
        font-size: 12px;
        color:#1f76f3;
        z-index: 0;
        width:42px;
        height:42px;
        background:#fff;
        box-shadow: 0px 3px 5px 1px rgba(31, 118, 243, 0.1);
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.3s linear;
        span{
            width:24px;
            line-height: 16px;
        }
    }
    &.show{
        .check{
           transform: translate(-60px,15px);
           transition: all 0.3s linear;
        }
        .confirm{
            transform: translate(-37px,-41px);
            transition: all 0.3s linear;
        }
        .giveCheck{
            transition: all 0.3s linear;
            transform: translate(15px,-59px);
        }
    }
}
</style>>

<!--退款和退款记录两栏-->
<template>
<div class="weui-tab">
    <div class="weui-navbar">
        <div class="weui-navbar__item" :class="{'weui-bar__item_on':select==0}" @click="selected(0)">
            申请售后
            <img src="images/default_wap/select.png" alt="" class="selected" >
        </div>
        <div class="weui-navbar__item" :class="{'weui-bar__item_on':select==1}" @click="selected(1)">
            申请记录
            <img src="images/default_wap/select.png" alt="" class="selected">
        </div>
        
    </div>
</div>
    
</template>
<style>
.weui-navbar__item.weui-bar__item_on img{
    display: block;
}
.selected{
    width: 50px;
    height: 3px;
    margin:  0 auto;
    position: relative;
    top: -3px;
    display: none;  
}
.weui-navbar__item.weui-bar__item_on{
    color:#fe9b0c;
}
.weui-navbar{
    background: white;
    height: 44px;
}
.weui-tab{
    float: left;
    height: 44px;
    width: 100vw;
}
.weui-navbar__item.weui-bar__item_on{
    background: white;
}
.weui-navbar__item:after{
    border: none
}
.weui-navbar:after{
    border: none
}
.weui-navbar__item{
    color: #454545;
    font-size: 14px;
    line-height: 44px;
}
.weui-navbar__item{
    padding: 0
}
</style>
<script>
export default {
  data:function(){
      return {
          select:0
      }
  },
  methods:{
      selected:function (index) {
          this.select=index;
          this.$emit('change-status',index);
        //   更改状态列表
      }
  }
}
</script>



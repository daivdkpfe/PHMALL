<!--
需要栅格
-->
<template>
  <div class="Navbar">
      <!-- <div  v-for="menu in menu-list">ss</div> -->
    <grow>
        <gcol v-for="(menu,index) in menulist" class="menu" v-bind:class="{'selected':select==index}" @click.native="select=index">
            <p>{{menu}}</p>
            <div class="selected_div" v-show="select==index"></div>
        </gcol>
    </grow>
    <div class="page" v-for="(menu,index) in menulist" v-show="index==select">
        <slot :name="'Navbar_page_'+index">这是页面{{index}}</slot>
    </div>
  </div>
</template>
<style>
.Navbar{
    width: 100%;
    float: left;
}
.Navbar .menu{
    line-height: 44px;
    text-align: center;
    font-size: 14px;
    color: #454545;
    height: 44px;
    overflow: hidden;
}
.Navbar .selected{
    color:#FEB90c;
}
.Navbar .selected_div{
    width: 80%;
    height: 5px;
    margin: 0 auto;
    background: #FEB90c;
    position: relative;
    top: -5px;
}
.Navbar .page{
    width:100%;
    float:left;
}
</style>
<script>
export default {
    data:function(){
        return{
            select:0
        }
    },
  props:['menulist','selected'],
  watch:{
      
  },
  mounted:function(){
     
   
      this.select=typeof(this.selected)=='undefined'||this.selected>this.menulist.length?0:this.selected;
  }
}
</script>

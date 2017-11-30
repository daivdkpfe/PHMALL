<!--搜索框-->
<template>
  <div class="search_div">
    <div class="input_div" :class="{isbtn:isbtn}">
      <Icon type="search" size="20"></Icon>
      <input type="text" placeholder="请输入..." class="search_input" @focus="isbtn=true" :class="{isbtn_input:isbtn}" @blur="isbtn=false">
      
    </div>
    <button class="search_button" v-bind:class="{show:isbtn}">搜索</button>
  </div>

</template>
<style>
/* placeholder样式 */
.search_input::-webkit-input-placeholder{
text-indent: 10px;
}
.search_input::-moz-input-placeholder{
text-indent: 10px;
}
.search_input::-ms-input-placeholder{
  text-indent: 10px;
}
/* placeholder样式 */
.search_button{
  width: 0px;
  height: 30px !important;
  margin-top: 7px;
  float: left;
  position: relative;
    left: -10px;
 visible:none;
  border: none;
  color: #454545;
  opacity:0;
  overflow: hidden;
  background: rgba(0,0,0,0) !important;
    transition: all 0.5s;
-moz-transition: all 0.5s;	/* Firefox 4 */
-webkit-transition: all 0.5s;	/* Safari 和 Chrome */
-o-transition: all 0.5s;

}
.show{
  visibility: visible;
  width: 50px;
 opacity:100;
}
.ivu-icon-search{
  width: 40px;
  text-align: center;
  line-height: 30px;
  float: left;
}
.search_div{
  width: 100vw;
  height: 44px;
  
  background: white;
  float: left;
}
.input_div{
  height: 30px;
  float: left;
  width: 355px;
  border-radius: 6px;
  background: #efeff4;
  margin: 7px 10px;
  transition: width 0.5s;
-moz-transition: width 0.5s;	/* Firefox 4 */
-webkit-transition: width 0.5s;	/* Safari 和 Chrome */
-o-transition: width 0.5s;
}
.search_input{
  width: 315px;
  border: none;
  height: 30px;
  float: left;
  background:none;
  text-indent: 10px;
    transition: width 0.5s;
-moz-transition: width 0.5s;	/* Firefox 4 */
-webkit-transition: width 0.5s;	/* Safari 和 Chrome */
-o-transition: width 0.5s;
}
.isbtn_input{
  width: 265px;
}
.isbtn{
  width: 305px;
}
</style>
<script>
export default {
  data:function(){
    return{
      isbtn:false
    }
  }
}
</script>


<!--一級分類的頂部栏-->
<template>
  <div class="header" v-bind:class="{orange:opcity}">
      <div class="mb10">
          <img src="images/default_wap/phmall.png" class="logo" alt="">
          <input type="text" class="search_input" placeholder="请输入关键字">
          <img src="images/default_wap/index_change.png" class="change" alt="">
      </div>
  </div>
</template>
<style>
.change{
    width: 20px;
    height: 20px;
    margin-top: 12px;
    float: left;
}
.header{
    position: fixed;
    z-index: 99;
    height: 44px;
    width: 100vw;
   
}
.mb10{
    margin: 0 10px;
    height: 44px;
}
.logo{
    width: 60px;
    float: left;
    margin-top: 7px;
}
.search_input{
    float: left;
    width: 255px;
    height: 30px;
    border-radius: 6px;
    border: none;
    margin: 7px 10px;
    text-indent: 10px;
}
input::-webkit-input-placeholder{
    text-indent: 10px;
}    /* 使用webkit内核的浏览器 */
input:-moz-placeholder{
    text-indent: 10px;
}                  /* Firefox版本4-18 */
input::-moz-placeholder{
    text-indent: 10px;
}                  /* Firefox版本19+ */
input:-ms-input-placeholder{
    text-indent: 10px;
}           /* IE浏览器 */

.orange{
background: linear-gradient(to right,#fe9b0c,#ff8000); 
}


</style>

<script>
export default {
  props:['opcity']
}
</script>

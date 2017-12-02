<!--评价item-->
<template>
  <div class="evaluation_item">
    <img :src="img" data-src="images/default_wap/load.png"  class="fl" alt="">
    <p class="sl1">{{content}}</p>
  </div>
</template>
<style>
.evaluation_item{
    /* 佈局 */
    width: 100%;
    height: 55px;
    background: white;
    border-top: 1px solid #EEE;
}
.evaluation_item img{
  width: 35px;
  height: 34px;
  margin: 10px;
}
.evaluation_item p{
  width: 220px;

  line-height: 55px;
  font-size: 15px;
  color: #454545;
}
</style>
<script>
export default {
  props:['content','img']
}
</script>


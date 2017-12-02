<!--评价item-->
<template>
  <a :href="href">
    <div class="evaluation_item">
      <img  :src="img"    class="fl" alt="">
      <p class="sl1 fl">{{content}}</p>
      <img src="images/default_wap/return.png" class="fr typeimg" alt="">
      <p class="fr type">{{type}}</p>
    </div>
  </a>
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
  background: url('../public/images/default_wap/load.png')
}
.evaluation_item p{
  width: 220px;
  line-height: 55px;
  font-size: 15px;
  color: #454545;
}
.evaluation_item .type{
  width: 50px;
  text-align: right;
}
.evaluation_item .typeimg{
  margin: 0;
  width: 20px;
  height:20px;
  margin-top: 17.5px;
  transform: rotate(180deg);
  -ms-transform: rotate(180deg);		/* IE 9 */
  -webkit-transform: rotate(180deg);	/* Safari and Chrome */
  -o-transform: rotate(180deg);		/* Opera */
  -moz-transform: rotate(180deg);
  margin-right: 10px;
}
</style>
<script>
export default {
  props:['content','img','data_img','href','type']
}
</script>


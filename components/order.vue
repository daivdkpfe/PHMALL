<!--订单栏-->
<template>
  <div class="order_div">
      <img src="images/default_wap/load.png" :data-src="'http://www.phmall.com.ph/union/'+goods.img" class="goods_img" alt="">
      <p class="goods_name sl2 fl">{{goods.goods_name}}</p>
      <p class="goods_attr fl sl1">{{attr}}</p>
      
      <slot name="refund_detail">
        <div class="order_button">退款详情</div>
      </slot>
      
      <slot name="reg_refund">
        <a href="./regrefund"><div class="order_button">申请售后</div></a>
      </slot>
  </div>
</template>
<style>
.order_div{
    float: left;
    width: 100vw;
    height: 120px;
    background: white;
}
.goods_img{
    float: left;
    width: 100px;
    height: 100px;
    margin: 10px;
}
.goods_name{
    font-size: 15px;
    color: #454545;
    line-height: 18px;
    margin-top: 18px;
    margin-left: 10px;
    width: 230px;
}
.goods_attr{
    width: 230px;
    font-size: 13px;
    color: #adadad;
    margin-left: 10px;
    line-height: 18px;
    margin-top: 5px;
}
.order_button{
    width: 80px;
    height: 30px;
    color: #fe9b0c;
    border: 1px solid #fe9b0c;
    border-radius: 6px;
    float: right;
    line-height: 30px;
    text-align: center;
    margin-right: 10px;
}
</style>
<script>
export default {
    data:function(){
        return{
            attr:''
        }
    },
  props:['goods'],
  mounted:function(){
      var i=this.goods.goods_attr.split("|");
        i.pop();
        console.log(i);
        var str='';
        for(let s in i){
            str+=' '+i[s];
        }
     this.attr=str;
  }
}
</script>

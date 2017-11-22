<!--订单顶部栏-->
<template>
    <div>
        <div class="order_top">
            订单号：{{info["0"].ordersn}}
        </div>
        <order :goods='info[0]'>
            <slot name="refund_detail">
                   <div slot="refund_detail"></div>
            </slot>
            <slot name="reg_refund">
                   <div slot="reg_refund"></div>
            </slot>
        </order>
    </div>
</template>
<style>
.order_top{
    background: white;
    margin-top: 10px;
    width: 100vw;
    float: left;
    border-bottom: 1px solid #eee;
    height: 44px;
    font-size: 15px;
    color: #454545;
    line-height: 44px;
    text-indent: 10px;
}
</style>
<script>
export default {
  props:['info'],
  mounted:function(){
      console.log(this.info);
  }
}
</script>

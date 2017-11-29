<!--三級標題-->
<template>
  <div class="big_div">
    <div class="h44 header">
        <div class="header_div h44">
            <slot name="left">
            <img src="images/default_wap/return.png" class="back fl" alt="">
            </slot>
            <slot name="right">
            <img src="images/default_wap/moreblack.png" class="back fr" alt="">
            </slot>
            <p>
{{title}}
            </p>
        </div>
    </div>
</div>
</template>
<style>
    .header{
        box-shadow: 0px 10px 125px rgba(0,0,0,0.1);
        width: 100vw;
        background: white;
        position: relative;
    }
    .header_div{
        width: 355px;
        margin: 0 auto;
    }
    .header_div img{
        width: 20px;
        height:20px;
        margin-top: 12px;
    }
    .header_div p{
        font-size: 18px;
        color: #181818;
        line-height: 44px;
        text-align: center;
        background: url('images/default_wap/load.png')
    }
</style>

<script>
export default {
   props:['title'],
}
</script>

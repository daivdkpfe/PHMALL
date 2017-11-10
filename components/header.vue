<!--三級標題-->
<template>
  <div class="big_div">
    <div class="h44 header">
        <div class="header_div h44">
            <img src="images/default_wap/return.png" class="back fl" alt="">
            <img src="images/default_wap/moreblack.png" class="back fr" alt="">
            <p>
{{title}}
            </p>
        </div>
    </div>
</div>
</template>
<style>

    .header{
        width: 100vw;
        background: white;
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
        font-size: 15px;
        color: #181818;
        line-height: 44px;
        text-align: center;
    }
</style>

<script>
export default {
   props:['title'],
}
</script>

<template>
    <div class="fl">
        <div class="title_div">
            <div class="mar">
                <p class="title_txt">{{val.right_bottom2.title}}</p>
            </div>
        </div>
        <div class="ad_div">
            <img src="images/default_wap/load.png" alt="" class="ad_img_left" :data-src="imgurl+val.left.pic">
            <img src="images/default_wap/load.png" alt="" class="ad_img_right_top" :data-src="imgurl+val.right_top.pic">
            <img src="images/default_wap/load.png" alt="" class="ad_img_right_bottom"  :data-src="imgurl+val.right_bottom1.pic">
            <img src="images/default_wap/load.png" alt="" class="ad_img_right_bottom" :data-src="imgurl+val.right_bottom2.pic">
        </div>
    </div>
</template>
<style>
    .ad_img_left{
        width: 160px;
        height: 230px;
        float: left;
    }
    .ad_img_right_top{
        width: 215px;
        height: 110px;
        float: left;
    }
    .ad_img_right_bottom{
        width: 107px;
        height: 119px;
        float: left;
    }
    .mar {
        margin: 0 auto;
        height: 44px;
        display: inline-block;
        text-align: center;
        width: 100%;
        overflow: hidden;
    }

    .title_div {
        width: 100vw;
        height: 44px;
        float: left;
    }

    .title_txt {
        font-size: 15px;
        color: #454545;
        line-height: 44px;
        text-align: center;
        display: inline-block;
        position: relative;
    }

    .title_txt::before {
        content: "";
        display: block;
        width: 60px;
        height: 1px;
        background: black;
        line-height: 44px;
        position: absolute;
        top: 22px;
        left: 70px;
    }

    .title_txt::after {
        content: "";
        display: block;
        width: 60px;
        height: 1px;
        background: black;
        line-height: 44px;
        position: absolute;
        right: 70px;
        top: 22px;
    }

    .ad_div {
        width: 100vw;
        height: 253px;
    }
</style>
<script>
    export default {
        props: ['val','imgurl']
    }
</script>
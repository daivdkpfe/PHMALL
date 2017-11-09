<template>
    <div class="ppl_goods_div">
        <a :href="url">
            <img class="right_top_ad" src="images/default_wap/load.png" :data-src="img" alt="">
            <p class="ppl_goods_title"> {{productname}}</p>
            <p class="ppl_goods_price"> {{price}} </p>
        </a>
    </div>
</template>
<style>
    .ppl {
        width: 355px;
        margin: 0 auto;
    }

    .right_top_ad {
        width: 172px;
        height: 200px;
    }

    .ppl_goods_div {
        width: 172px;
        border-radius: 12px;
        background: white;
        overflow: hidden;
    }

    .ppl_goods_div img {
        width: 172px;
        height: 172px;
        float: left;
    }

    .ppl_goods_title {
        width: 152px;
        padding-left: 10px;
        font-size: 13px;
        color: #454545;
    }

    .ppl_goods_price {
        width: 152px;
        padding-left: 10px;
        font-size: 15px;
        color: #b80a2f;
    }
</style>
<script>
export default {
     props: ['productname', 'price', 'url', 'img'],
}
</script>
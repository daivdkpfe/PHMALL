<template>
    <div class="ppl_goods_div">
        <a href="./union/product?uid=' + item.goods_id +
					'&setp=1">
            <img class="right_top_ad" data-src="'+page.config.img_url+item.goods_pic +
					'" src="images/default_wap/load.png" alt="">
            <p class="ppl_goods_title"> + item.goods_name +
            </p>
            <p class="ppl_goods_price"> + item.goods_price + </p>
        </a>
    </div>
</template>
<style>

</style>
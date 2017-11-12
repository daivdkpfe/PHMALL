<template>
  <div class="content">
            <img src="images/default_wap/load.png" class="content_img" alt="" @touchstart="start" v-on:touchmove.prevent="touching" @touchend="end">
</div>
</template>
<style>
.content{
        width: 100vw;
        height: 70px;
        background: white;
        float: left;
        border-bottom: 1px solid #EEE;
    }
    .content_img{
        width: 50px;height: 50px;
        margin: 10px;
    }
</style>

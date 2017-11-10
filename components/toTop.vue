<!--返回頂部-->

<template>
  <img src="images/default_wap/totop.png" class="totop" alt="" @click="top()">
</template>
<style>
.totop{
    width: 50px;
    height: 50px;
    position: fixed;
    right: 10px;
    bottom: 10px;
}
</style>
<script>
export default {
    methods:{
        top:function(){
            scrollTo(0,0);
        }
    }
}
</script>

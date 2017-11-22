<template>
  <div class="Col" :style="'width:'+4*mSpan+'%'" >
      <slot></slot>
  </div>
</template>
<style>
.Flex .Col{
    float: left;
   
    overflow-x: hidden;
}
.full-width{
/*  width: 100% !important; */
}
</style>
<script>
export default {
  props:['span'],
  data:function(){
      return{
          mSpan:0
      }
  },
  mounted:function(){
      this.mSpan=this.span;
  }
}
</script>


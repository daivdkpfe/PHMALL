<template>
  <div class="button_div" v-bind:class="{lager:size=='lager',small:size=='small',autosize:size=='auto'}">
        <slot name="btntxt">{{size}} {{color}} button</slot>
  </div>
</template>
<style>

.lager{
  width: 95vw !important;
}
.button_div{
    width: 50vw;
    height: 30px;
    text-align: center;   
    border-radius: 6px;
    text-align: center;
    line-height: 30px;
    font-size: 13px;
    color: #ffffff;
    overflow: hidden;   
    background: orange;
   
}
.small{
  width: 80px;
}
.autosize{
  width: auto !important;
  padding: 0 10px;
  display: inline-block;
}
</style>
<script>
export default {
  data:function(){
    return{
      color:'orange'
    }
  },
  props:['size'],
  mounted:function(){
    if(typeof(this.btn_color)!='undefined'){
      this.color=this.btn_color;
    }
  }
}
</script>

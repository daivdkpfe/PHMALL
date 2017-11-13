<template>
  <div class="touch"  @touchstart="start" v-on:touchmove.prevent="touching" @touchend="end">
      <slot name='touch'>
           
      </slot>
  </div>
</template>
<style>
.touch{
  position: fixed; 
}
</style>
<script>
export default {
  props:['monitor'],
  methods:{
    start:function(){
      
      this.$emit('touchstart',event.changedTouches["0"].clientX,event.changedTouches["0"].clientY);
    },
    touching:function(event){
      if(this.monitor)
      {
      this.$emit('touching',event.changedTouches["0"].clientX,event.changedTouches["0"].clientY)
      }
    },
    end:function(){
      this.$emit('touchend',event.changedTouches["0"].clientX,event.changedTouches["0"].clientY);
    }
  }
}
</script>



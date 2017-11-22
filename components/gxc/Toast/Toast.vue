<template>
 <transition name="fade">
  <div class="toast" v-if="show">
      <i class="fa fa-spinner load" aria-hidden="true" v-if="type=='loading'"></i>
      <i class="fa fa-check-circle" aria-hidden="true" v-if="type=='success'"></i>
      <i class="fa fa-times-circle" aria-hidden="true" v-if="type=='error'"></i>
      <p>{{value}}</p>
  </div>
 </transition>
</template>
<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0
}
.toast .load{
    animation: load 1.5s;
    animation-iteration-count:infinite;
    animation-timing-function: linear;
}
@keyframes load
{
from {transform: rotate(0deg);}
to {transform: rotate(360deg);}
}
.toast i{
    font-size: 20px;
    font-size: 30px;
    margin-bottom: 10px;
}
.toast{
    border-radius: 6px;
    line-height: 20px;
    font-size: 15px;
    color: white;
    padding:15px 10px;
    text-align: center;
    background: rgba(0,0,0,0.8);
    position: fixed;
    top: 50vh;
    z-index: 510;
    left: 50vw;
    word-wrap: all;
    word-wrap:break-word;
    transform: translateX(-50%) translateY(-50%);
    /* 偏移50% */
}
</style>
<script>
export default {
    props:['type','value'],
  data:function(){
      return{
          
          show:false
      }
  },
  mounted:function(){
      setTimeout(() => {
          t.show=true;
      }, 1);
      var t=this;
      setTimeout(() => {
          t.show=false;
      }, 1000);
  }
}
</script>

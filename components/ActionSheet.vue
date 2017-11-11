<template>
<div>
  <button @click="show=!show">启动</button>
   <transition name="fade">
  <div class="mask" v-if="show" @click="show=!show">
        <div class="menu_list">
            <ul>
                <li>我是1</li>
                <li>我是2</li>
                <li>我是3</li>
                <li>我是4</li>
                <li>我是5</li>
                <li>我是6</li>
            </ul>
        </div>
    </div>
   </transition>
</div>
</template>
<style>
.mask{
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.8);
    top: 0;
    left: 0;
    z-index: 1;
}
.menu_list{
    width: 100vw;
    background: white;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 2;
}
.mask-enter-active, .mask-leave-active {
  transition: opacity 900ms
}
.mask-enter, .mask-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0;
  top: 0;
}
</style>
<script>
export default {
  data:function(){
      return{
          show:false
      }
  }
}
</script>



<!--单页-->
<template>
  <div class="full-page-div" v-bind:class="{full_page_show:full_page_show}">
      <slot></slot>
  </div>
</template>
<style>
.full-page-div{
    width: 0px;
    height: 100vh;
    background: white;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 2;
    transition: all 0.5s;
    -moz-transition: all 0.5s;	/* Firefox 4 */
    -webkit-transition: all 0.5s;	/* Safari 和 Chrome */
    -o-transition: all 0.5s;	/* Opera */
}
.full_page_show{
    width: 100vw;
}
</style>
<script>
export default {
  data:function(){
      return{
          full_page_show:false
      }
  }
}
</script>



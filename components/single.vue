<template>
  <div class="single-div">
      <div class="left">
          <slot></slot>
      </div>
      <div class="right">
          <slot name="right">

          </slot>
      </div>
  </div> 
</template>
<style>
    .single-div{
        width: 100%;
        height: 44px;
        
        background: white;

        

        float: left;

    }
    .single-div .left{
        width: 50%;

        font-size: 15px;
        line-height: 44px;
        color:#454545;
        text-align: left;
        text-indent: 10px;

        float: left;
    }
    .single-div .right{
        width: calc(50% - 10px);

        font-size: 15px;
        line-height: 44px;
        color:#454545;
        text-align: right;
        
        padding-right: 10px;
        float: left;
    }
</style>


<template>
  <div class="Flex">
      <div class="Row" >
          <slot></slot>
      </div>
  </div>
</template>
 <style>
 .Flex .Row{
     display: flex;
     flex-direction: row;
     flex-wrap:wrap;
     justify-content:flex-start;
        align-items: flex-start;
      align-content: flex-start;
 }
 </style>
 <script>
 export default {
   mounted:function(){
              var t=this;
              this.$children.forEach(function(item,index){
                  if(typeof(item.$props.span)=='undefined'){
                   t.$children[index].$data.mSpan=25/t.$children.length   
                  }
                  
              })
   }
 }
 </script>
 
 
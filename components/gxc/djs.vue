<template>
  <p class="fl right_txt sl1 time" v-html="txt"></p>
</template>
<script>
export default {
  
             
data: function () {
  return {
    counter: this.t,
    txt:''
  }
},
mounted:function(){
    
    var th=this;
    if(th.counter>0){
 var d = parseInt(this.counter/3600/24);
        if(d<10){
            d="0"+d;	
        }
        var h = parseInt((this.counter%(3600*24))/3600);
        if(h<10){
            h="0"+h;	
        }
        var m = parseInt((this.counter%(3600*24))%3600/60);
        if(m<10){
            m="0"+m;	
        }
        var s = parseInt((this.counter%(3600*24))%60);
        if(s<10){
            s="0"+s;	
        }
        var a=(d=="00")?"":'<span>'+d+' </span>:';
        var b=(h=="00")?"":'<span>'+ h+' </span>:';
        var c=(m=="00")?"":'<span>'+m+' </span>:';
        var d=(s=="00")?"":'<span>'+s+' </span>';
        th.txt=th.title+a+b+c+d;
        this.counter = this.counter -1;
    }
    else{
        th.txt=''
        return;
    }
       
setInterval(function(){
     if(th.counter>0){
    var d = parseInt(th.counter/3600/24);
        if(d<10){
            d="0"+d;	
        }
        var h = parseInt((th.counter%(3600*24))/3600);
        if(h<10){
            h="0"+h;	
        }
        var m = parseInt((th.counter%(3600*24))%3600/60);
        if(m<10){
            m="0"+m;	
        }
        var s = parseInt((th.counter%(3600*24))%60);
        if(s<10){
            s="0"+s;	
        }
        var a=(d=="00")?"":'<span>'+d+' </span>:';
        var b=(h=="00")?"":'<span>'+ h+' </span>:';
        var c=(m=="00")?"":'<span>'+m+' </span>:';
        var d=(s=="00")?"":'<span>'+s+' </span>';
        th.txt=th.title+(a+b+c+d);
        th.counter = th.counter -1;
     }
     else{
         
     }
},1000)
},
  props:['t','title']
}
</script>

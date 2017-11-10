<!--/* 拍卖商品列表 */-->
<template>
  <div class="auction_div">
            <a :href="'./union/auction_detail?uid='+auction.uid">
            <img src="images/default_wap/load.png" :data-src="imgurl+auction.goods_file1" class="goods_img fl" alt="">
            <p class="goods_name fl right_txt sl1">{{auction.goods_name}}</p>
            <p class="fl right_txt sl1 goods_pricce"><d>起拍价  </d>₱ {{auction.start_price}}</p>
            <p class="fl right_txt sl1 goods_one_pricce"><d>一口价  </d>₱ {{auction.end_price}}</p>
            <p class="fl right_txt sl1 time" v-html="txt"></p>
            </a>
    </div>
</template>
<style>
.auction_div{
        width: 100vw;
        height:103px;
        border-bottom: 1px solid rgb(239,239,244);
        background: white;
    }
    .goods_img{
        width: 83px;
        height:83px;
        margin: 10px;
    }
    .fl{
        float: left;
    }
    .right_txt{
        width: 250px;
        font-size: 15px;
        color: #454545;

        line-height: 20px;
    }
    .goods_name{
        margin-top: 7px;
    }
    .goods_pricce{
        font-size: 20px;
        color: #FF8200;
        line-height: 28px;
    }
    .goods_pricce d{
        font-size: 13px;
        color: #454545;
    }
    .goods_one_pricce{
        font-size: 13px;
        color: #454545;
        line-height: 20px;
    }
    .time{
        font-size: 13px;
        color: #454545;
    }
</style>
<script>

export default {


                
data: function () {
  return {
    counter: this.auction.end_date,
    txt:''
  }
},
mounted:function(){
    var validity=new Date().getTime();
var now_time=Math.round(validity/1000);

 this.counter=this.counter-now_time;
    
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
        th.txt='距离结束：'+a+b+c+d;
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
        th.txt='距离结束：'+(a+b+c+d);
        th.counter = th.counter -1;
     }
     else{
         
     }
},1000)
},
  props:['auction','imgurl']
}

</script>


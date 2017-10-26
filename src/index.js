




var left=0;
var right=0;
function add_to_ppl(str) {
	if(left<right)
	{
		page.left=page.left+str;
		left++;
	}
	else
	{
		page.right=page.right+str;

		right++;
	}

}

var page = new Vue({
	el: '.big_div',
	data: {
		flashs:[],
		coupon:"",
		left:'',
		right:"",
		flash_sales:[],
		goods_num:0,
		ad1:'',
		ad2s:'',
		ad3:'',
		ad4:'',
		cate1:'',
		cate2:'',
		cate3:'',
		cate4:'',
		cate5:'',
		cate6:'',
		cate7:'',
		cate8:'',
		cate9:'',
		cate10:'',
		cate11:'',
		cate12:''
	}
});

/*開始處理數據*/

$.post("./index",{},function(result){
	console.log(result);
	page.flashs=result.default_wap_flash;
	page.coupon=result.default_wap_coupon["0"];
	page.ad1=result.default_wap_ad_1["0"];
	page.ad2s=result.default_wap_ad_2;
	page.ad3=result.default_wap_ad_3['0'];
	page.cate1=result.default_wap_categroy_1["0"];
	page.cate2=result.default_wap_categroy_2["0"];
	page.cate3=result.default_wap_categroy_3["0"];
	page.cate4=result.default_wap_categroy_4["0"];
	page.cate5=result.default_wap_categroy_5["0"];
	page.cate6=result.default_wap_categroy_6["0"];
	page.cate7=result.default_wap_categroy_7["0"];
	page.cate8=result.default_wap_categroy_8["0"];
	page.cate9=result.default_wap_categroy_9["0"];
	page.cate10=result.default_wap_categroy_10["0"];
	page.cate11=result.default_wap_categroy_11["0"];
	page.cate12=result.default_wap_categroy_12["0"];
	page.ad4=result.default_wap_ad_4['0'];
	add_to_ppl('<div style="width: 172px;"><a href="'+result.default_wap_ad_5['0'].url+'"><img class="right_top_ad" src="images/default_wap/load.png" data-src="http://192.168.0.109/english/'+result.default_wap_ad_5['0'].pic+'" alt=""></div></a>');
	result.default_wap_hot_shop.forEach(function (item,index) {

		add_to_ppl('<div class="ppl_goods_div"><a href="./union/product?uid='+item.goods_id+'&setp=1"><img class="right_top_ad" data-src="http://192.168.0.109/english/'+item.goods_pic+'" src="images/default_wap/load.png" alt=""><p class="ppl_goods_title">'+item.goods_name+'</p><p class="ppl_goods_price">'+item.goods_price+'</p></a></div>');

	});


});
$.post("./index/get_onsale",{},function(result){

	page.flash_sales=result;
	page.goods_num=result.length*110+20*2;
});
$(".weui-tabbar").find("a").eq(0).addClass('weui-bar__item--on').find('img').attr('src','./images/default_wap/index1.png')
/*開始處理數據*/





$(document).ready(function () {
    $(".swiper-container").swiper({
        loop: true,
        autoplay: 3000,
//        observer: true,//修改swiper自己或子元素时，自动初始化swiper
//        observeParents: true//修改swiper的父元素时，自动初始化swiper
        observer: true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents: false,//修改swiper的父元素时，自动初始化swiper
        onSlideChangeEnd: function (swiper) {
            swiper.update();
        }
    });
});

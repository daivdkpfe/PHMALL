
import product from '../components/product.vue'
import index_ad from '../components/index_ad.vue'
import index_header from '../components/index_header.vue'
import lang_ch from '../lanuage/lanuage_ch'
import lang_en from '../lanuage/lanuage_en'
import config from '../include/global'

var lang=lang_ch;



export function install(Vue) {
	Vue.component("product",product);
	Vue.component("ad",index_ad);
	Vue.component("top",index_header);
	var left = 0;
	var right = 1;
	
	function add_to_ppl(str) {
		if (left < right) {
			page.left_product.push(str)
			left++;
		} else {
			page.right_product.push(str)
			right++;
		}
	}
	
	
	var page = new Vue({
		el: '.big_div',
		data: {
			flashs: [],
			coupon: "",
			left: '',
			right: "",
			flash_sales: [],
			goods_num: 0,
			ad1: '',
			ad2s: [],
			ad3: '',
			ad4: '',
			cate1: '',
			cate2: '',
			cate3: '',
			cate4: '',
			cate5: '',
			cate6: '',
			cate7: '',
			cate8: '',
			cate9: '',
			cate10: '',
			cate11: '',
			cate12: '',
			config: config,
			left_product: [],
			right_product: [],
			right_top_ad_url:'',
			right_top_ad_img:'',
			scrolled:false,
			lang:{}
		},
		mounted: function () {
			
			if(this.getsetcookie('lang')!='en')
			{
				this.lang=lang_ch
			}else{
				this.lang=lang_en
			}
			
			window.addEventListener('scroll', this.handleScroll);
		},
		methods:{
			handleScroll () {
				this.scrolled = window.scrollY > 215;
				
			  },

			  setcookie: function (name, value, days) {
				
					var d = new Date;
				
					d.setTime(d.getTime() + 24*60*60*1000*days);
				
					window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
				
				},
				
				getsetcookie: function (name) {
				
					var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
				
					return v ? v[2] : null;
				
				},
				
				deletesetcookie: function (name) {
				
					this.set(name, '', -1);
				
				}
		}
		
	});
	/*開始處理數據*/
	$.post("./index", {}, function (result) {
		result = result.data;
		page.flashs = result.default_wap_flash;
/* 		page.coupon = result.default_wap_coupon["0"]; */

		page.cate1 = result.default_wap_categroy_1["0"];
		page.cate2 = result.default_wap_categroy_2["0"];
		page.cate3 = result.default_wap_categroy_3["0"];
		page.cate4 = result.default_wap_categroy_4["0"];
		page.cate5 = result.default_wap_categroy_5["0"];
		page.cate6 = result.default_wap_categroy_6["0"];
		page.cate7 = result.default_wap_categroy_7["0"];
		page.cate8 = result.default_wap_categroy_8["0"];
		page.cate9 = result.default_wap_categroy_9["0"];
		page.cate10 = result.default_wap_categroy_10["0"];
		page.cate11 = result.default_wap_categroy_11["0"];
		page.cate12 = result.default_wap_categroy_12["0"];

		
		var list={}
		result.default_wap_ad_2.forEach(function(item,index){
			
			if(index % 4==0){
				list={};
				list.left=item;
			}
			else if(index % 4==1)
			{
				list.right_top=item;
			}
			else if(index % 4==2)
			{
				list.right_bottom1=item;
			}
			else if(index % 4==3)
			{
				list.right_bottom2=item;
				item.title=lang.index_ad_title[(index+1)/4-1]
				page.ad2s.push(list);
			}
		})

		

		page.right_top_ad_url=page.config.img_url+result.default_wap_ad_5['0'].url
		page.right_top_ad_img=page.config.img_url+ result.default_wap_ad_5['0'].pic;
		result.default_wap_hot_shop.forEach(function (item, index) {
			add_to_ppl(item);
		});
	
	
	});
	$.post("./index/get_onsale", {}, function (result) {
		result = result.data;
		page.flash_sales = result;
		page.goods_num = result.length * 110 + 20 * 2;
	});
	
	
	$(".weui-tabbar").find("a").eq(0).addClass('weui-bar__item--on').find('img').attr('src',
		'./images/default_wap/index1.png')
	/*開始處理數據*/
	
	
	
	
	
	$(document).ready(function () {
		$(".swiper-container").swiper({
			loop: true,
			autoplay: 3000,
			//        observer: true,//修改swiper自己或子元素时，自动初始化swiper
			//        observeParents: true//修改swiper的父元素时，自动初始化swiper
			observer: true, //修改swiper自己或子元素时，自动初始化swiper
			observeParents: false, //修改swiper的父元素时，自动初始化swiper
			onSlideChangeEnd: function (swiper) {
				swiper.update();
			}
		});
	});
}


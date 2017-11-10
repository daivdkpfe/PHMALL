
import lang_ch from '../lanuage/lanuage_ch'
import lang_en from '../lanuage/lanuage_en'

import cookie from '../util/util.js'
import config from '../include/global'

import header from '../components/product_list_header.vue'
import cate from '../components/threecate.vue'
import product from '../components/auction_list_product.vue'
import totop from '../components/toTop.vue'
import screen from '../components/screen.vue'
var lang=lang_ch;



export function install(Vue) {
    Vue.component("top", header);
    Vue.component("product",product);
    Vue.component("cate",cate);
    Vue.component('totop',totop);
    Vue.component('screen',screen);
    var page = new Vue({
        el: '.big_div',
        data: {
            select:1,
            down:false,
            index:0,
            cat:'',
            start:0,
            cates:[],
            t:100,
            auction_list:[],
            lang:{},
            config:config,
            status:0,
            // 0已开始1未开始2已结束
        },
        methods:{
            cs:function(str){
                var t=this;
                this.status=str;
                this.start=0;
                this.cat=0;
                $.post('./auction',{cat:t.cat,start:t.start,status:t.status},function (result) {
                    result=result.data;
                    t.auction_list=[];
                    if(result!=0 && result.length>0)
                    {
                        result.forEach(function (item,index) {
                            t.auction_list.push(item);
                            t.start++;
                        })
                    }
                })
            },
            get_cate:function (index,cate_uid) {
                this.select=index+1;
            }
        },
        mounted:function () {
            var t=this;
            if(cookie.getsetcookie('lang')!='en')
			{
				this.lang=lang_ch
			}else{
				this.lang=lang_en
            }
            
            $.post("./category",{},function (result) {
                result=result.data;
                page.cates=result;
                page.cat=result[0].uid;
                $.post('./auction',{cat:t.cat,start:t.start,status:t.status},function (result) {
                    result=result.data;
                    
                    if(result!=0 && result.length>0)
                    {
                        result.forEach(function (item,index) {
                            t.auction_list.push(item);
                            t.start++;
                        })
                    }
                })

            });

        }
    });


    //滚动加载
    $(document.body).infinite();
    var loading = false;  //状态标记
    var t=page;

    $(document.body).infinite(0).on("infinite", function() {
        
                if(loading) return;
                loading = true;
                //下拉到底部更新

                $.post('./auction',{cat:t.cat,start:t.start,status:t.status},function (result) {
                    result=result.data;
                    
                    if(result!=0 && result.length>0)
                    {
                        result.forEach(function (item,index) {
                            t.auction_list.push(item);
                            t.start++;
                        })
                    }else{
                        scrollTo(0,0);
                        $.modal({
                            title: "警告",
                            text: "已经没有啦~",
                            buttons: [
                                { text: "確定"}
                            ]
                        });
                        
                    }
                    loading = false;
                })
               

            });
}
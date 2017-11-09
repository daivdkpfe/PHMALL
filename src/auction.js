import Vue from 'vue'
import lang_ch from '../lanuage/lanuage_ch'
import lang_en from '../lanuage/lanuage_en'
import header from '../components/header.vue'
import cookie from '../util/util.js'

var lang=lang_ch;



export function install(Vue) {
    Vue.component("top", header);
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
            lang:{}
        },
        methods:{
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

                $.post('./auction',{cat:t.cat,start:t.start},function (result) {
                    result=result.data;
                    console.log(result);
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
    
}
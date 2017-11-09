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
            select: 1,
            address_list: [],
            lang:{}
        },
        methods: {
            selects: function (uid, index) {
                var x = index;
                var t=this;
                $.post('/address/edit', {
                    uid: uid
                }, function (result) {
                    result = result.data;
                    $('.weui-switch').removeAttr('checked');
                    $('.weui-switch').eq(x).prop('checked', 'checked');
                    
                        t.address_list[x].is_buy=1;
                 
                    
                    t.address_list.forEach(function(item,index){
                       if(item.is_buy==1)
                       {
                        item.is_buy=0
                       }
                       if(index==x)
                       {
                        item.is_buy=1
                       }
                       Vue.set(t.address_list,index,item);
                        
                    });
                    
                });

            },
            deletes: function (uid, index) {
                var x = this;
                var bl = false;
                $.post('/address/delete', {
                    uid: uid
                }, function (result) {
                    result = result.data;
                    if (result == '1') {
                        $.toptip(t.lang._031, 'success');
                        x.address_list.splice(index, 1);
                    } else {
                        $.toptip(t.lang._032, 'error');
                    }
                });
            }
        },
        mounted:function(){
            var t=this;
            if(cookie.getsetcookie('lang')!='en')
			{
				this.lang=lang_ch
			}else{
				this.lang=lang_en
            }
            
            $.post('/address', {}, function (result) {
                
                result=result.data;
                t.address_list = result;
            })
        }
    });

    
}


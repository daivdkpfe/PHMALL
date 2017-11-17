import Vue from 'vue';
/* import iView from 'iview'; */
import lang_ch from '../lanuage/lanuage_ch'
import lang_en from '../lanuage/lanuage_en'



import cookie from '../util/util.js'
import config from '../include/global'

import header from '../components/header.vue'
import content from '../components/content.vue'
import touch from '../components/gxc/touch.vue'
import threesms from '../components/threesms.vue'
import release from '../components/release.vue'
import fullpage from '../components/full-page.vue'
import contact from '../components/contact.vue'



/* Vue.use(iView); */
var lang=lang_ch;
Vue.component("top", header);
Vue.component("full-page",fullpage);
Vue.component('contact',contact);
var page=new Vue({
    el:'.big_div',
    data:{
        user_list:[{selected:true},{selected:false}],
        all_selected:true
    },
    methods:{
        fullpage:function(){
            this.$refs.full_page.full_page_show=true;
        },
        all_select:function(){
            this.all_selected=!this.all_selected;
            var t=this;
            this.user_list.forEach(function(item,index){
                t.user_list[index].selected=t.all_selected;
            });
           

        }
    },
    mounted:function(){
        
    }
})
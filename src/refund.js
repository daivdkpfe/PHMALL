import Vue from 'vue';
import iView from 'iview';
import lang_ch from '../lanuage/lanuage_ch'
import lang_en from '../lanuage/lanuage_en'

import cookie from '../util/util.js'
import config from '../include/global'

import header from '../components/header.vue'
import cate from '../components/refundcate.vue'
import order from '../components/order.vue'
import ordertop from '../components/ordertop.vue'


var lang=lang_ch;


    Vue.component("top", header);
    Vue.component("cate",cate);
    Vue.component("order",order);
    Vue.component("ordertop", ordertop);
    
    var page=new Vue({
        el:'.big_div',
        data:{
            ss:'xx'
        }
    })


import Vue from 'vue';
import iView from 'iview';
import lang_ch from '../lanuage/lanuage_ch'
import lang_en from '../lanuage/lanuage_en'

import cookie from '../util/util.js'
import config from '../include/global'

import header from '../components/header.vue'
import order from '../components/order.vue'
import ordertop from '../components/ordertop.vue'
import ActionSheet from '../components/ActionSheet.vue'

var lang=lang_ch;

    Vue.component("order",order);
    Vue.component("ordertop", ordertop);
    Vue.component("top", header);
    Vue.component('action-sheet',ActionSheet);
    var page=new Vue({
        el:'.big_div',
        data:{
            ss:'xx'
        }
    })
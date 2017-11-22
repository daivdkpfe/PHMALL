import Vue from 'vue';
/* import iView from 'iview'; */
import lang_ch from '../lanuage/lanuage_ch'
import lang_en from '../lanuage/lanuage_en'



import cookie from '../util/util.js'
import config from '../include/global'

import header from '../components/header.vue'
import gRow from '../components/gxc/Row.vue'
import gCol from '../components/gxc/Col.vue'




/* Vue.use(iView); */
var lang = lang_ch;
Vue.component("top", header);
Vue.component("grow", gRow);
Vue.component("gcol", gCol);


var page = new Vue({
    el: '.big_div',
    mounted: function() {
        $.post('/myshare', {}, function() {

        })
    }
})
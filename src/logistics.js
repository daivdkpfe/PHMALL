import Vue from 'vue';
import iView from 'iview';

import lang_ch from '../lanuage/lanuage_ch'
import lang_en from '../lanuage/lanuage_en'
import header from '../components/header.vue'
Vue.use(iView);



    var lang=lang_ch;
    Vue.component("top", header);
    var page = new Vue({
        el:'.big_div'
    });

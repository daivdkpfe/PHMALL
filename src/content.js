import Vue from 'vue';
import iView from 'iview';
import lang_ch from '../lanuage/lanuage_ch'
import lang_en from '../lanuage/lanuage_en'

import cookie from '../util/util.js'
import config from '../include/global'

import header from '../components/header.vue'
import touch from '../components/gxc/touch.vue'
import search from '../components/search.vue'
import gbutton from '../components/gxc/g-button.vue'

Vue.use(iView);
var lang=lang_ch;

    Vue.component("top", header);
    Vue.component("touch", touch);
    Vue.component('search',search);
    Vue.component('gbutton',gbutton);

    var page=new Vue({
        el:'.big_div'
    })
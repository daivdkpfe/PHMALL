import lang_ch from '../lanuage/lanuage_ch'
import lang_en from '../lanuage/lanuage_en'


import cookie from '../util/util.js'
import config from '../include/global'

import header from '../components/header.vue'
import order from '../components/order.vue'
import ordertop from '../components/ordertop.vue'
import grow from '../components/gxc/Flex/Row.vue'
import gcol from '../components/gxc/Flex/Col.vue'



export function install(Vue) {
    Vue.component("top", header);
    Vue.component('order',order);
    Vue.component('ordertop',ordertop);
    Vue.component('grow', grow);
    Vue.component('gcol', gcol);
    
}
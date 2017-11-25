/* import iView from 'iview'; */
import lang_ch from '../lanuage/lanuage_ch'
import lang_en from '../lanuage/lanuage_en'



import cookie from '../util/util.js'
import config from '../include/global'

import header from '../components/header.vue'
import navbar from '../components/gxc/Navbar.vue';
import grow from '../components/gxc/Flex/Row.vue'
import gcol from '../components/gxc/Flex/Col.vue'
import coupon from '../components/coupon.vue'

export function install(Vue) {
    Vue.component("top", header);
    Vue.component('navbar', navbar);
    Vue.component('grow', grow);
    Vue.component('gcol', gcol);
    Vue.component('coupon', coupon);
}
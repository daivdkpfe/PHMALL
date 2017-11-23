import iView from 'iview';

import lang_ch from '../lanuage/lanuage_ch'
import lang_en from '../lanuage/lanuage_en'
import header from '../components/header.vue'
import order from '../components/order.vue'
import ordertop from '../components/ordertop.vue'
import alert from '../components/gxc/alert/alert'


export function install(Vue) {
    Vue.use(iView);
    Vue.use(alert);
    Vue.component("top", header);
    Vue.component("order", order);
    Vue.component("ordertop", ordertop);
}
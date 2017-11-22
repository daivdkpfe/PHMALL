import Toast from './Toast.vue'
import Vue from 'vue';

function instance(values, types) {
    var type = "";
    var value = '我是Vaule';
    if (type != '') {
        type = types;
    }
    if (value != '') {
        value = values;
    }
    var vueObj = new Vue({
        template: `<Toast value="` + values + `" type="` + types + `"></Toast>`,
        components: { Toast },
    });
    const component = vueObj.$mount();
    document.body.appendChild(component.$el);
}
export default function() {
    Vue.prototype.$Toast = function(value = '', type = '') {
        instance(value, type);
    };
}
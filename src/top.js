import Vue from 'vue'
import header from '../components/header.vue'




export function install(Vue) {
    Vue.component("top", header);
}
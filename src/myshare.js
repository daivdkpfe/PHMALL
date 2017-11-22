import Vue from 'vue';
/* import iView from 'iview'; */
import lang_ch from '../lanuage/lanuage_ch'
import lang_en from '../lanuage/lanuage_en'



import cookie from '../util/util.js'
import config from '../include/global'

import header from '../components/header.vue'
import gRow from '../components/gxc/Row.vue'
import gCol from '../components/gxc/Col.vue'
import Toast from '../components/gxc/Toast/Toast'



/* Vue.use(iView); */
var lang = lang_ch;
Vue.component("top", header);
Vue.component("grow", gRow);
Vue.component("gcol", gCol);
Vue.use(Toast);

var page = new Vue({
    el: '.big_div',
    data: {
        myshare_list: []
    },
    methods: {
        del: function(uid, index) {
            var that = this;

            $.post('./myshare/del', { uid: uid }, function(data) {
                if (data.ret == '200') {
                    var datas = data.data;
                    that.myshare_list.splice(index, 1);
                    that.$Toast('刪除成功');
                } else if (data.ret == '201') {
                    window.location.href = "./login";
                }
            })
        }
    },
    mounted: function() {

        var that = this;
        $.post('/myshare', {}, function(data) {

            if (data.ret == '200') {
                var datas = data.data;
                that.myshare_list = datas
            } else if (data.ret == '201') {

                window.location.href = "./login";
            }

        })
    }
})
import Vue from 'vue';
import iView from 'iview';
import lang_ch from '../lanuage/lanuage_ch'
import lang_en from '../lanuage/lanuage_en'

import cookie from '../util/util.js'
import config from '../include/global'

import header from '../components/header.vue'
import content from '../components/content.vue'
import touch from '../components/gxc/touch.vue'
import threesms from '../components/threesms.vue'
import release from '../components/release.vue'
import ActionSheet from '../components/gxc/ActionSheet.vue'
Vue.component('actionsheet', ActionSheet);
Vue.use(iView);
var lang = lang_ch;

Vue.component("top", header);
Vue.component("contentuser", content);
Vue.component("touch", touch);
Vue.component('three', threesms);
Vue.component('release', release);

var page = new Vue({
    el: '.big_div',
    data: {
        x: 0,
        y: 0,
        startx: 0,
        starty: 0,
        sms_list: [],
        sms_send_list: [],
        notice: [],
        sms_notice_list: [],
        menu_list: ['发送短消息', '发送广播'] //ActionSheet列表
    },
    methods: {
        sb: function(x) {
            this.x = x.changedTouches["0"].clientX;
            this.y = x.changedTouches["0"].clientY;
        },
        start: function(x, a) {
            this.startx = x.changedTouches["0"].clientX;
            this.starty = x.changedTouches["0"].clientY;
        },
        end: function(x, a) {
            if (this.startx - x.changedTouches["0"].clientX > 0) {
                alert("左移");
            } else if (this.startx - x.changedTouches["0"].clientX < 0) {
                alert("右移");
            }
            if (this.starty - x.changedTouches["0"].clientY > 0) {
                alert("上移");
            } else if (this.starty - x.changedTouches["0"].clientY < 0) {
                alert("下移");
            }


        },
        clickActionSheet: function() {
            this.$refs.ActionSheet.show = !this.$refs.ActionSheet.show;

        }, //外部触发ActionSheet
        chosed: function(index, val) {
            var that = this;

            if ('1' == index) {
                window.location.href = "./sms_send?type=notice"
            } else {
                window.location.href = "./sms_send?type=sms"

            }


        }
    },
    mounted: function() {
        var that = this;
        var t = this;
        $.post('./sms', {}, function(data) {

            var datas = data.data;
            if (data.ret == "200") {
                datas.forEach((val, index) => {
                    datas[index].reg_date = return_date(val.reg_date);
                });

                t.sms_list = datas;


            } else {
                window.location.href = './login';
            }

        });
        $.post('./sms/send', {}, function(data) {
            console.log('sss' + data);
            if (data.ret == "200") {

                var datas = data.data;
                datas.forEach((val, index) => {
                    datas[index].reg_date = return_date(val.reg_date);
                });

                t.sms_send_list = datas;
            } else {
                window.location.href = './login';
            }


        });
        $.post('./sms/notice', {}, function(data) {



            if (data.ret == "200") {
                var datas = data.data;
                datas.forEach((val, index) => {
                    datas[index].reg_date = return_date(val.reg_date);
                });
                t.sms_notice_list = datas;
            } else {
                window.location.href = './login';
            }


        });

    }


})
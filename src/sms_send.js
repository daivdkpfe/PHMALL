import Vue from 'vue';
/* import iView from 'iview'; */
import lang_ch from '../lanuage/lanuage_ch'
import lang_en from '../lanuage/lanuage_en'



import cookie from '../util/util.js'
import config from '../include/global'

import header from '../components/header.vue'
import content from '../components/content.vue'
import touch from '../components/gxc/touch.vue'
import threesms from '../components/threesms.vue'
import release from '../components/release.vue'
import fullpage from '../components/full-page.vue'
import contact from '../components/contact.vue'

import Toast from '../components/gxc/Toast/Toast'



/* Vue.use(iView); */
var lang = lang_ch;
Vue.component("top", header);
Vue.component("full-page", fullpage);
Vue.component('contact', contact);

Vue.use(Toast);
var page = new Vue({
    el: '.big_div',
    data: {
        all_selected: false,
        friend_list: [],
        selected_user: '',
        selected_txt: '',
        title: '',
        content: '',
        is_broadcast: 0
    },
    methods: {
        fullpage: function() {
            this.$refs.full_page.full_page_show = true;
        },
        all_select: function() {
            this.all_selected = !this.all_selected;
            var t = this;
            this.friend_list.forEach(function(item, index) {
                t.friend_list[index].selected = t.all_selected;
            });
        },
        ok: function() {
            var that = this;
            this.$refs.full_page.full_page_show = false;
            that.selected_txt = "";
            this.friend_list.forEach((item, index) => {
                if (item.selected) {
                    that.selected_txt += item.member_id + ',';
                }
            });
            that.selected_txt = that.selected_txt.substr(0, that.selected_txt.length - 1)
            console.log(this.friend_list);
        },
        send: function(val) {

            var that = this;
            if (that.title == "" || that.content == "") {
                that.$Toast("標題或內容不能为空");
                return;
            }
            if (val == "notice") {
                that.selected_txt = 'All members'
                that.is_broadcast = 1
            }
            if (that.selected_txt == "") {
                that.$Toast("请选择收件人");
                return;
            }
            $.post('./sms_send/send', {
                to_id: that.selected_txt,
                title: that.title,
                content: that.content,
                is_broadcast: that.is_broadcast
            }, function(data) {
                var respond = data.data;

                if (data.ret = '200') {
                    that.$Toast('发送成功');
                    setTimeout(() => {
                        window.history.back();
                    }, 1000);

                }
            })
            that.selected_txt = "";
        },

    },
    mounted: function() {
        var that = this;
        $.post('./sms_send', {}, function(data) {
            console.log(data);
            var respond = data.data;
            if (data.ret == "200") {
                respond.forEach(function(item, index) {
                    respond[index].selected = false;
                })
                that.friend_list = respond;
            } else {
                window.location.href = "./login";
            }
        })
    }
})
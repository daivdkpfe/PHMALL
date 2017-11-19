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



/* Vue.use(iView); */
var lang = lang_ch;
Vue.component("top", header);
Vue.component("full-page", fullpage);
Vue.component('contact', contact);
var page = new Vue({
    el: '.big_div',
    data: {
        all_selected: false,
        friend_list: [],
        selected_user: '',
        selected_txt: ''
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
            this.$refs.full_page.full_page_show = false;

            console.log(this.friend_list);
        },
        send: function() {
            var that = this;

            console.log(this.friend_list);
            that.selected_txt = "";
            this.friend_list.forEach((item, index) => {
                if (item.selected) {
                    that.selected_txt += item.member_id + ',';
                }
            });
            console.log(that.selected_txt.substr(0, that.selected_txt.length - 1));
            console.log(that.title);
            console.log(that.content);
        }
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
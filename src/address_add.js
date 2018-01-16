import lang_ch from '../lanuage/lanuage_ch'
import lang_en from '../lanuage/lanuage_en'
import header from '../components/header.vue'




var uid=window.location.href.replace('http://phmall.ganxiaochuan.top/address_add?uid=','');
uid=uid.replace('http://192.168.0.105:88/address_add?uid=','');
console.log(uid);
var lang = lang_ch;



export function install(Vue) {
    Vue.component("top", header);
    var page = new Vue({
        el: '.big_div',
        data: {
            p: '',
            c: '',
            cc: '',
            receiver: '',
            phone_num: '',
            address: '',
            zipcode: '',
            ssx: '',
            lang: {}
        },
        methods: {
            setcookie: function (name, value, days) {

                var d = new Date;

                d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);

                window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
            },

            getsetcookie: function (name) {

                var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');

                return v ? v[2] : null;

            },

            deletesetcookie: function (name) {

                this.set(name, '', -1);

            },
            submits: function () {
                var t = this;
                $.post("/address_add/edit", {
                    uid: uid,
                    consignee: this.receiver,
                    address: page.address,
                    zipcode: page.zipcode,
                    mobile: page.phone_num,
                    province: page.p,
                    city: page.c,
                    county: page.cc
                }, function (result) {
                    result = result.data;
                    if (result == 0) {
                        $.toptip(t.lang._021, 'error');
                    } else if (result == -1) {
                        $.toptip(t.lang._022, 'error');
                    } else if (result == 1) {
                        $.toptip(t.lang._023, 'success');
                        window.history.back(); //返回上一页
                    }
                })
            }
        },
        mounted: function () {

            if (this.getsetcookie('lang') != 'en') {
                this.lang = lang_ch
            } else {
                this.lang = lang_en
            }

        }
    });


    $(function () {
        $("#ssx").cityPicker({
            title: "选择省市县",
            onClose: function (p) {
                var s = p.value;
                page.p = s[0];
                page.c = s[1];
                page.cc = s[2];
            }
        });
        if (uid == '') {
            //           没有uid，是添加
        } else {
            //            有UID,获取信息
            $.post('./address_add', {
                uid: uid
            }, function (result) {
                console.log(result);
                result = result.data;
                if (result != '0' || result.length > 0) {
                    page.receiver = result["0"].consignee;
                    page.phone_num = result["0"].mobile;
                    page.address = result["0"].address;
                    page.zipcode = result["0"].zipcode;
                    var ssx = '';
                    page.p = result["0"].province;
                    page.c = result["0"].city;
                    page.cc = result["0"].county;
                    ssx = page.p + " " + page.c + " " + page.cc;
                    page.ssx = ssx;
                }
            })
        }
    });
}
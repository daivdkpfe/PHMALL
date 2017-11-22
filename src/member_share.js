import Vue from 'vue';
import iView from 'iview';

import lang_ch from '../lanuage/lanuage_ch'
import lang_en from '../lanuage/lanuage_en'
import header from '../components/header.vue'
import order from '../components/order.vue'
import ordertop from '../components/ordertop.vue'

Vue.use(iView);
Vue.component("top", header);
Vue.component("order", order);
Vue.component("ordertop", ordertop);
var page = new Vue({
    el: '.big_div',
    data: {
        value6: '',
        defaultList: [

        ],
        imgName: '',
        visible: false,
        uploadList: [],
    },
    mounted() {
        this.uploadList = this.$refs.upload.fileList;
    },
    methods: {
        handleView(name) {

            this.imgName = name;
            this.visible = true;
        },
        handleRemove(file) {

            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },
        handleSuccess(res, file) {

            file.url = 'http://192.168.0.105/english/xx/' + res;
            file.name = 'http://192.168.0.105/english/xx/' + res;
        },
        handleFormatError(file) {

            this.$Notice.warning({
                title: 'The file format is incorrect',
                desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
            });
        },
        handleMaxSize(file) {

            this.$Notice.warning({
                title: 'Exceeding file size limit',
                desc: 'File  ' + file.name + ' is too large, no more than 2M.'
            });
        },
        handleBeforeUpload() {

            const check = this.uploadList.length < 3;
            if (!check) {
                this.$Notice.warning({
                    title: 'Up to five pictures can be uploaded.'
                });
            }
            return check;
        }
    },
    mounted: function() {
        $.post('/member_share', { uid: 281 }, function(data) {
            console.log(data);
        })
    }
})
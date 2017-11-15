<template>
    <touch v-on:touchstart='touchstart' v-on:touching='touching' v-on:touchend='touchend' monitor='true' ref="touchdiv" >
        <div class="content_div" slot="touch"  id="touch" v-bind:class="{istouch:istouch}">
                <div class="touch_btn" >
                    删除
                </div>
                <div class="content">
                     <slot name="slide">
                    <img src="images/default_wap/load.png" class="content_img" alt="">

                    <div class="content_right">
                        <p class="content_id">
                            苏弃
                        </p>
                        <p class="content_time">
                            2017-14-25 14:30
                        </p>
                        <p class="content_value sl1">
                            垃圾来及来及打算速度vdfvfvasvf 是否色调风格和健康劳动法规和巨亏i
                        </p>
                    </div>
                     </slot>
                </div>
           
        </div>
         
    </touch>
</template>
<style>
    body {
        overflow: hidden;
    }

    .touch {
        position: relative !important;
    }

    .content_div {
        width: calc(100vw + 50px);
        position: relative;
        left: 0px;
        transition:left 0.5s;
        -moz-transition:left 0.5s; /* Firefox 4 */
        -webkit-transition:left 0.5s; /* Safari and Chrome */
        -o-transition:left 0.5s; /* Opera */
    }

    .content {
        width: 100vw;
        height: 70px;
        float: right;
        background: white;
        float: left;
        border-bottom: 1px solid #EEE;
    }

    .touch_btn {
        width: 50px;
        height: 70px;
        float: right;
        color: white;
        text-align: center;
        line-height: 70px;
        background: #ff8000;
    }

    .content_id {
        font-size: 15px;
        margin-top: 13px;
        line-height: 18px;
        text-indent: 10px;
        float: left;
        color: #454545;
    }

    .content_time {
        font-size: 13px;
        margin-top: 13px;
        line-height: 18px;
        float: right;
        margin-right: 10px;
        color: #adadad;
    }

    .content_right {
        width: 305px;
        height: 70px;
        float: left;
    }

    .content_value {
        width: 305px;
        height: 18px;
        line-height: 18px;
        position: relative;
        top: 9px;
        color: #adadad;
        text-indent: 10px;
    }

    .content_img {
        width: 50px;
        float: left;
        height: 50px;
        margin: 10px;
    }

    .istouch {
        left: -50px;

    }

    
</style>
<script>
    export default {
        data: function () {
            return {
                x: '',
                y: '',
                left: '',
                top: '',
                istouch: false,
                notouch:false
            }
        },
        methods: {
            touchstart: function (x, y) {
                this.x = x;
                console.log('我开始拖动了');
            }, //touch
            touching: function (x, y) {
            },
            touchend: function (x, y) {
                if (x - this.x > 20) {
                    
                    this.istouch = false;
                } else if (this.x-x > 20) {
                  
                    this.istouch = true;
                }
                console.log('我结束拖动了');
            }
        }
    }
</script>
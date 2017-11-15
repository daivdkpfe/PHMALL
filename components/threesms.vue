<!--开始，进行中，结束三栏-->
<template>
    <div>
        <div class="weui-tab">
            <div class="weui-navbar">
                <div class="weui-navbar__item" :class="{'weui-bar__item_on':select==0}" @click="selected(0)">
                    收件箱
                    <img src="images/default_wap/select.png" alt="" class="selected">
                </div>
                <div class="weui-navbar__item" :class="{'weui-bar__item_on':select==1}" @click="selected(1)">
                    发件箱
                    <img src="images/default_wap/select.png" alt="" class="selected">
                </div>
                <div class="weui-navbar__item" :class="{'weui-bar__item_on':select==2}" @click="selected(2)">
                    通知
                    <img src="images/default_wap/select.png" alt="" class="selected">
                </div>
            </div>
        </div>
        <div class="g-temp">
            <div v-if="select==0">
                <slot name="slot1">我是1</slot> 
            </div>
            <div v-if="select==1">
               <slot name="slot2">我是2</slot> 
            </div>
            <div v-if="select==2">
                <slot name="slot3">我是3</slot> 
            </div>
        </div>
    </div>
</template>
<style>
    .g-temp{
        width: 100vw;
        float: left;
    }
    .weui-navbar__item.weui-bar__item_on img {
        display: block;
    }

    .selected {
        width: 50px;
        height: 3px;
        margin: 0 auto;
        position: relative;
        top: -3px;
    }

    .weui-navbar__item.weui-bar__item_on {
        color: #fe9b0c;
    }

    .weui-navbar {
        background: white;
        height: 44px;
        width: 100vw;
    }

    .weui-tab {
        float: left;
        width: 100vw;
        height: 44px;
    }

    .weui-navbar__item.weui-bar__item_on {
        background: white;
    }

    .weui-navbar__item:after {
        border: none
    }

    .weui-navbar:after {
        border: none
    }

    .weui-navbar__item {
        color: #454545;
        font-size: 14px;
        line-height: 44px;
    }

    .weui-navbar__item {
        padding: 0
    }

    .selected {
        display: none;
    }
</style>
<script>
    export default {
        data: function () {
            return {
                select: 0
            }
        },
        methods: {
            selected: function (index) {
                this.select = index;
                this.$emit('change-status', index);
                //   更改状态列表
            }
        }
    }
</script>
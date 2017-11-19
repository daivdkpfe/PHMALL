<template>
  <touch v-on:touchstart='touchstart' v-on:touching='touching' v-on:touchend='touchend' monitor='true' ref="touchdiv" v-if="!deted">
    <div class="content_div" slot="touch" id="touch" v-bind:class="{istouch:istouch}">
      <div class="touch_btn" @click="det(smsdata.uid,sms_type)">
        删除
      </div>

      <div class="content" v-bind:class="{nodown:nodown}">
        <slot name="slide">
          <img src="images/default_wap/load.png" :data-src="'http://www.phmall.com.ph/union/'+smsdata.img" class="content_img" alt="">

          <div class="content_right">
            <p class="content_id">
              {{smsdata.from_id}}
            </p>
            <p class="content_time">
              {{smsdata.reg_date}}
            </p>
            <p class="content_value sl1">
              {{smsdata.title}}
            </p>
            <img src="images/default_wap/down.png" class="down" @click="nodown=false"v-show="nodown" alt="">
            <img src="images/default_wap/up.png" class="down" @click="nodown=true" alt="" v-show="!nodown">
          </div>
          <div class="full-info" v-show="!nodown">
            <p class="from_id">
              发件人：{{smsdata.from_id}}
            </p>
            <p class="to_id">
              收件人：{{smsdata.to_id}}
            </p>
            <p class="content_title">
              标题：{{smsdata.title}}
            </p>
            <p class="content_value">
              内容：{{smsdata.content}}
            </p>

          </div>
        </slot>
        <slot name="notice">
          
          <p class="notice_title sl1">
            {{smsdata.title}}
          </p>
          <p class="notice_value sl2">
            {{smsdata.content}}
          </p>
          <p class="notice_time">
           {{smsdata.reg_date}}
          </p>
          <img src="images/default_wap/down.png" class="notice_down" @click="nodown=false" v-show="nodown" alt="">
          <img src="images/default_wap/up.png" class="notice_down" @click="nodown=true" alt="" v-show="!nodown">
          <div class="full-info" v-show="!nodown">
            
            <p class="from_id">
              发件人：{{smsdata.from_id}}
            </p>
            <p class="to_id">
              收件人：{{smsdata.to_id}}
            </p>
            <p class="content_title">
              标题：{{smsdata.title}}
            </p>
            <p class="content_value">
              内容：{{smsdata.content}}
            </p>

          </div>
        </slot>
      </div>

    </div>

  </touch>
</template>
<style>
.notice_div .nodown{
  height: 100px !important;
}
  .content_div .nodown {
    height: 70px;
  }
  .content_div .full-info{
    background: white;
  }
  .content_div .full-info .from_id {
    height: 18px;
    line-height: 18px;
    margin-top: 77px;
    color: #adadad;
    font-size: 13px;
    padding-left: 10px;
  }
.notice_div .full-info .from_id {
    height: 18px;
    line-height: 18px;
    margin-top: 7px;
    color: #adadad;
    font-size: 13px;
    padding-left: 10px;
  }
  .content_div .full-info .to_id {
    height: 18px;
    line-height: 18px;
    margin-top: 4px;
    color: #adadad;
    font-size: 13px;
    padding-left: 10px;
  }

  .content_div .full-info .content_title {
    height: 18px;
    line-height: 18px;
    margin-top: 4px;
    color: #adadad;
    font-size: 13px;
    padding-left: 10px;
  }

  .content_div .full-info .content_value {
    width: 285px;
    line-height: 18px;
    position: relative;
    color: #adadad;
    text-indent: 0;
    top: 0;
    height: inherit;
    color: #adadad;
    font-size: 13px;
    padding-left: 10px;
  }

  body {
    overflow-x: hidden !important;
        height: 100vh;
  }

  html {
    overflow-x: hidden;
  }

  .touch {
    position: relative !important;
  }

  .content_div {
    width: calc(100vw + 50px);
    position: relative;
    left: 0px;
    transition: left 0.5s;
    -moz-transition: left 0.5s;
    /* Firefox 4 */
    -webkit-transition: left 0.5s;
    /* Safari and Chrome */
    -o-transition: left 0.5s;
    /* Opera */
  }

  .content_div .down {
    width: 15px;
    height: 15px;
    float: right;
    margin-right: 10px;
  }

  .content_div .notice_down {
    width: 15px;
    height: 15px;
    float: right;
    margin-right: 10px;
    position: relative;
    top: -15px;
  }

  .content {
    width: 100vw;
    float: right;
    background: white;
    float: left;
    border-bottom: 1px solid #eee;
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
    width: 285px;
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
    props: ["smsdata",'sms_type'],
    data: function () {
      return {
        x: "",
        y: "",
        left: "",
        top: "",
        istouch: false,
        nodown: true,
        deted:false
        // notouch:false
      };
    },
    watch:{
      nodown:function(){
        this.istouch=false;
      }
    },
    methods: {
      touchstart: function (x, y) {
        this.x = x;
      }, //touch
      touching: function (x, y) {},
      touchend: function (x, y) {
        if (x - this.x > 20) {
          this.istouch = false;
          if (e && e.preventDefault) e.preventDefault();
          else
            //IE
            window.event.returnValue = false;
        } else if (this.x - x > 20) {
          this.istouch = true;
          this.nodown = true;
          if (e && e.preventDefault) e.preventDefault();
          else
            //IE
            window.event.returnValue = false;
        }
      },
      det:function(uid,type){
        var that=this;
        $.post('./sms/det',{uid:uid,type:type},function(data){
          console.log(data);
          var respond=data.data;
          if(data.ret=='200')
          {
              if(respond.status==1){
                that.deted=true;
              }
              else{

              }
          }
          else{
            window.location.href='./login';
          }
        })
      }
    }
  };
</script>
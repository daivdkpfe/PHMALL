<template>
 <transition name="fade">
  <div class="alert_mask" v-if="alert_show">
    <div class="alert_alert_div">
      <p class="alert_alert_title">
        {{title}}
      </p>
      <p class="alert_alert_value">
         {{value}}
      </p>
      <div class="alert_alert_button">
         <div class="alert_alert_btn_one" v-if="btn.length==1"  @click.stop="clickok()">{{btn[0]}}</div>
        <div class="alert_alert_btn_two" @click.stop="clickok()"  v-if="btn.length==2">{{btn[0]}}</div>
        <div class="alert_alert_btn_two" @click.stop="clickcancel()" v-if="btn.length==2">{{btn[1]}}</div>
      </div>
    </div>
  </div>
 </transition>
</template>
<style>
.alert_alert_btn_one{
  width: 100%;
  line-height: 44px;
  text-align: center;
  color: #adadad;
}
.alert_alert_btn_two{
  width: 50%;
  float: left;
  line-height: 44px;
  text-align: center;
  color: #adadad;
}
.alert_alert_button{
  width: 80vw;
  height: 44px;
}
.alert_alert_value{
  width: 80vw;
  margin: 0;
  line-height: 23px;
  padding: 15px 0;
  text-align: center;
   border-bottom: 1px solid #EEE;
}
.alert_alert_title{
  text-align: center;
  line-height: 70px;
  font-size: 15px;
  height: 70px;
  margin: 0;
  width: 80vw;
}
.alert_mask{
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.8);
    position: fixed;
    z-index:503;
    left: 0;
    top: 0;
}
.alert_alert_div{
  width: 80vw;
  background: white;
  margin:calc((100vh - 150px)/2 - 50px) auto;
  border-radius:6px; 
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0
}
</style>
<script>
export default {
  props:['alert_show','title','value','btn'],
  mounted:function(){
   
  },methods:{
    clickok:function(){
      this.alert_show=false;
      this.$emit('clickok')
    },
    clickcancel:function(){
      this.alert_show=false;
      this.$emit('clickcancel')
    }
  }
}
</script>

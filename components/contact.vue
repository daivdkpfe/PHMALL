<template>
  <div class="contact_contact_div" @click="check_box_select()">
      <div class="check-bok" v-bind:class="{'check-bok-selected':user_info.selected}" ></div>
      <img class="contact_contact_img" src="images/default_wap/load.png" :data-src="'http://www.phmall.com.ph/union/'+user_info.img" alt="">
      <p class="contact_contact_name">{{user_info.member_id}}</p>
  </div>
</template>
<style>


.check-bok.check-bok-selected,.all-check-box-div .check-bok-selected{
    background: url('/images/default_wap/selected_check_box.png');
    background-size:100% 100%;
    border: none !important;
}
.check-bok{
    width: 15px;
    height: 15px;
    border: 1px solid #adadad;
    border-radius: 15px;
    float: left;
    margin-top: 14px;
    margin-left: 10px;
   
}
.contact_contact_div{
    height: 44px;
    float: left;
    width: 100vw;
    border-bottom: 1px solid rgb(239,239,244);
    background: white;
}
.contact_contact_img{
    width: 34px;
    height: 34px;
    margin: 5px;
    float: left;
    border-radius: 4px;
}
.contact_contact_name{
    color: #454545;
    font-size: 15px;
    line-height: 44px;
    text-align: left;
    text-indent: 10px;
    float: left;
}
</style>
<script>
export default {
  methods:{
      check_box_select:function() {
          
            this.user_info.selected=!this.user_info.selected;
           this.$emit('update:user_info', this.user_info);
           
      }
  },
    props:['user_info']
}
</script>


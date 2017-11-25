<template>
  <div class="coupon_div">
      <div class="top">
          <img class="coupon_img" src="images/default_wap/load.png" alt="">
          <div class="coupon_info">
              <p class="coupon_name">菲淘網1號店</p>
              <p class="coupon_date">截止日期：2017/12/25</p>              
          </div>
      </div>
      <div class="bottom">
          <div class="bl_div">
              <!-- 波浪div -->
              <img src="images/default_wap/bl.png" alt="">
              <div class="coupon_info">
                  <ul>
                      <li>满3000立减200</li>
                      <li>不与本店其他活动叠加使用不与本店其他活动叠加使用不与本店其他活动叠加使用不与本店其他活动叠加使用不与本店其他活动叠加使用不与本店其他活动叠加使用不与本店其他活动叠加使用不与本店其他活动叠加使用不与本店其他活动叠加使用</li>                      
                  </ul>
                  <div class="coupon_price">
                      <p>₱ 6600.00</p>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>
<style>
    .coupon_div{
        /* height: 144px; */
        width: calc(100% - 20px);
        overflow: hidden;
        background:#FFF;
        margin: 10px;
        border-radius: 6px;
    }
    .coupon_div .top{
        height: 76px;
        overflow: hidden;
        width: 100%;
        background: rgb(188,188,188);
    }
    .coupon_div .bottom{
        height: auto;
        width: 100%;
        background: white;
    }
    .coupon_div .coupon_img{
        width: 58px;
        height: 58px;
        background: green;
        border: 2px solid #FFF;
        border-radius: 30px;
        margin: 10px;
        float: left;
    }
    .coupon_div .top .coupon_info{
        width: calc(100% - 170px);
        height: 100%;
        float: left;
    }
    .coupon_div .top .coupon_info p{
        height: 50%;
        line-height: 38px;
        font-size: 15px;
        color: #FFF;
    }
    .coupon_div .bottom .bl_div{
        width: 100%;
        background: rgb(188,188,188);
    }
    .coupon_div .bottom .bl_div img{
        width: 100%;
        height: 100%;
        background: rgb(188,188,188);
        float: left;
    }
    .coupon_div .bottom .coupon_info ul{
        width: 100%;
        background: #FFF;
        float: left;
        padding-left: 20px !important;
    }
    .coupon_div .bottom .coupon_info li{
        line-height: 18px;
        margin-top: 4px;
        list-style-type:disc;
        font-size: 13px;
        color: #adadad;
    }
    .coupon_div .bottom .coupon_price{
            width: 100%;
            line-height: 48px;
    font-size: 24px;
    color: #adadad;
    background: white;
    text-align: right;
    text-indent: 10px;
    float: right;


    }
    .coupon_div .bottom .coupon_price p{
        margin-right: 10px;
    }
</style>

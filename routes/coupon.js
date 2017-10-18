var express = require('express');
var router = express.Router();
var io = require('socket.io');
var fs = require("fs");
/* GET home page. */



router.get('/', function(req, res, next) {
    var cate=0;
    if(req.query.c>0)
    {

        cate=req.query.c;
    }
  res.render('coupon', { title: 'PHMALL',cate:cate});//c=cate
});
router.post("/",function (req,res,next) {
    console.log(req.body.start);
  var sql=[];
  var str="";


  sql.push(get_now_time());

    if(req.body.cate!=0)
    {
        str='and coupon_cat = ? ';//处理不同分类的数据
        sql.push(req.body.cate);
    }
   sqlQueryMore("SELECT uid,supplier_id,end_date,discount,coupon_img,price_lbound,sale_price FROM `mvm_coupon_cat` WHERE od>10000 AND end_date>? "+str+" ORDER BY od DESC LIMIT "+req.body.start+",7",sql,function (err,coupon,xx) {
       if(err){
         logger.info("Caught exception:"+err);
       }
       else
       {
           if(coupon.length>0)
           {
               var s=0;
               coupon.forEach(function (item,index) {
                   var sql=[];
                   sql.push(item.supplier_id);
                   sqlQueryMore("select shop_name from `mvm_member_shop` where m_uid = ?",sql,function (err,supplier_name,xx) {
                       if(err){
                           logger.info("Caught exception:"+err);
                       }
                       coupon[index]['shop_name']=supplier_name['0']['shop_name'];
                       s++;
                       if(s==coupon.length)
                       {
                           res.json(coupon);
                       }

                   })
               })

           }
           else
           {
               res.json("");
           }


       }
   });
});
module.exports = router;

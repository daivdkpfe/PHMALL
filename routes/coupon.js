//  
//                                  _oo8oo_
//                                 o8888888o
//                                 88" . "88
//                                 (| -_- |)
//                                 0\  =  /0
//                               ___/'==='\___
//                             .' \\|     |// '.
//                            / \\|||  :  |||// \
//                           / _||||| -:- |||||_ \
//                          |   | \\\  -  /// |   |
//                          | \_|  ''\---/''  |_/ |
//                          \  .-\__  '-'  __/-.  /
//                        ___'. .'  /--.--\  '. .'___
//                     ."" '<  '.___\_<|>_/___.'  >' "".
//                    | | :  `- \`.:`\ _ /`:.`/ -`  : | |
//                    \  \ `-.   \_ __\ /__ _/   .-` /  /
//                =====`-.____`.___ \_____/ ___.`____.-`=====
//                                  `=---=`
// 
//   			天灵灵，地灵灵，奉请祖师来显灵。
// 				一请莱尊二进制，二请巴贝奇创雏形。
// 				三请艾达写代码，四请诺依曼率群英。 
// 				五请阿兰俏图灵，六请里奇汤普逊。
// 				七请网络三老祖，八请盖茨广进金。
// 				九请李纳斯多开源，十请迪恩再创新。
// 				恭请bat三巨头，率领网上众水军
//  
//       ~~~~~~~Powered by https://github.com/ottomao/bugfreejs~~~~~~~
// 
//                          佛祖保佑         永无bug
//                          
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
                        var respod={
                            ret:'200',
                            data:coupon
                        };
                        res.json(respod);
                       }

                   })
               })

           }
           else
           {
            var respod={
                ret:'200',
                data:''
            };
            res.json(respod);
               
           }


       }
   });
});
module.exports = router;

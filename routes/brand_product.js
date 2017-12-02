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
   /* async function run() {
        var a = await sqlasnyc("select * from `mvm_config` limit 1");
        console.log(a);
    }
    run();*/
    res.render('brand_product', { title: 'PHMALL',cat:req.query.cat });
});
router.post('/',function (req,res,next) {

    var cat=parseInt(req.body.cat);
    var start=parseInt(req.body.start);


     async function run() {
        var brand_product = await sqlasnyc("SELECT uid,goods_name,goods_sale_price,goods_file1,goods_status,goods_stock,supplier_id,goods_hit FROM `mvm_goods_table` WHERE goods_brand=? ORDER BY register_date DESC LIMIT "+start+",15",[cat]);
        var respod={
            ret:'200',
            data:brand_product
        };
        res.json(respod);
        
        }
        run();
});
router.post('/brand',function (req,res,next) {
    var cat =req.body.cat;
    console.log(cat);
     async function run() {
        var a = await sqlasnyc("SELECT id,brandname,logo,weburl,train FROM `mvm_brand_table` WHERE isCheck='1' AND id=?",[cat]);
        var respod={
            ret:'200',
            data:a
        };
        res.json(respod);
        
    }
    run();
})
module.exports = router;

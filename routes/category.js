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




router.post('/', function(req, res, next) {
    var arr=[];
    sqlQueryMore("select category_name,category_name_ch,uid from `mvm_category` where supplier_id=0 and category_id=0",arr,function (err,category,xx) {
        if(err) logger.info("Caught exception:"+err);
        var respod={
            ret:'200',
            data:category
        };
        res.json(respod);
        
    })
});
router.get('/',function (req,res,next) {
    if(typeof(req.query.cat)=='undefined' || req.query.cat<0)
    {
        req.query.cat=0;
    }
    console.log(req.query.cat);
    res.render('category', { title: 'PHMALL',cat:req.query.cat});
});

router.post('/get_goods',function (req,res,next) {
    console.log(req.body);
    async function run() {

            var start=parseInt(req.body.start);

            if(req.body.cat==0)
            {
                var sql=[];
                var sqlstr="SELECT uid,goods_name,goods_sale_price,goods_file1,goods_status,goods_stock,supplier_id,goods_hit FROM `mvm_goods_table` ORDER BY register_date DESC LIMIT "+start+", 20";
            }
            else
            {
                var sql=[];
                var sqlstr=" SELECT uid,goods_name,goods_sale_price,goods_file1,goods_status,goods_stock,supplier_id,goods_hit FROM `mvm_goods_table` WHERE goods_cat=?  ORDER BY register_date DESC LIMIT "+start+", 20";
                sql.push(req.body.cat);
            }
            var categroy=await sqlasnyc(sqlstr,sql);
            var respod={
                ret:'200',
                data:categroy
            };
            res.json(respod);
            
    }
    run();
});
module.exports = router;

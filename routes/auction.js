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

    /*async function run() {
        var a = await sqlasnyc("select * from `mvm_config` limit 1");
        console.log(a);
    }
    run();*/
    res.render('./auction', { title: 'PHMALL'});
});

router.post('/',function (req,res,next) {
    var start=parseInt(req.body.start);
    
    var status=req.body.status;
    
    var statussql="AND ga.start_date<=? AND ga.end_date>=?";
    if(status==1)
    {
       statussql=" AND ga.start_date>?";
    }
    else if(status==2){
        statussql=" AND ga.end_date<? ";
    }
    
    async function run() {
         var auction = await sqlasnyc("SELECT ga.uid,ga.goods_name,ga.goods_file1,ga.goods_status,ga.supplier_id,ga.goods_hit,ga.start_date,ga.end_date, ga.end_price,ga.start_price,ga.bid_add,ga.is_complete FROM `mvm_goods_auction` ga LEFT JOIN `mvm_member_shop` ms ON ga.supplier_id=ms.m_uid WHERE ga.approval=1 AND ms.isSupplier=3 and show_status=1 "+statussql+" ORDER BY ga.start_date ASC LIMIT "+start+",10",[get_now_time(),get_now_time()]);
         var respod={
            ret:'200',
            data:auction
        };
        res.json(respod);
     }
     run();
})
module.exports = router;

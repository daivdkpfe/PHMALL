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

    // async function run() {
    //     var a = await sqlasnyc("select * from `mvm_config` limit 1");
    //     console.log(a);
    // }
    // run();
    res.render('group_list', { title: 'PHMALL' });
});

router.post('/',function (req,res,next) {


    async function run() {
        if(req.body.cate==0)
        {
            var sqlstr='SELECT gg.uid,gg.goods_name,gg.goods_sale_price,gg.goods_file1,gg.goods_status,gg.goods_stock,gg.supplier_id, gg.goods_hit,gg.start_date,gg.end_date,ggd.goods_market_price FROM `mvm_goods_group` gg LEFT JOIN `mvm_member_shop` ms ON gg.supplier_id=ms.m_uid LEFT JOIN `mvm_goods_group_detail` ggd ON ggd.g_uid=gg.uid WHERE gg.approval=1 AND ms.isSupplier=3 AND gg.start_date<='+get_now_time()+' AND gg.end_date>='+get_now_time()+' AND gg.show_status=1 ORDER BY gg.start_date ASC LIMIT 0,20';
            var sql=[];
        }
        else
        {
            var sqlstr='SELECT gg.uid,gg.goods_name,gg.goods_sale_price,gg.goods_file1,gg.goods_status,gg.goods_stock,gg.supplier_id, gg.goods_hit,gg.start_date,gg.end_date,ggd.goods_market_price FROM `mvm_goods_group` gg LEFT JOIN `mvm_member_shop` ms ON gg.supplier_id=ms.m_uid LEFT JOIN `mvm_goods_group_detail` ggd ON ggd.g_uid=gg.uid WHERE gg.approval=1 AND ms.isSupplier=3 AND gg.start_date<='+get_now_time()+' AND gg.end_date>='+get_now_time()+' AND gg.show_status=1 AND gg.goods_cat=? ORDER BY gg.start_date ASC LIMIT 0,20';
            var sql=[];
            sql.push(req.body.cate);
        }

        var a = await sqlasnyc(sqlstr,sql);
        var respod={
            ret:'200',
            data:a
        };
        res.json(respod);
        
    }
    run();

});
module.exports = router;

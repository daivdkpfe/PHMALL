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



router.get('/', function (req, res, next) {

    res.render('supply', {
        title: 'PHMALL'
    });


});
router.post('/', function (req, res, next) {
    var type = req.body.type;
    var start = parseInt(req.body.start);
    if (!start) {
        start = 0;
    }
    async function run() {

        var want_supply = await sqlasnyc("SELECT uid,goods_name,intro,price,province,city,county,register_date,pic FROM `mvm_want_supply` WHERE approval_date>10 AND goods_cat=? ORDER BY approval_date DESC LIMIT " + start + ",15", [type]);
        var respod={
            ret:'200',
            data:want_supply
        };
        res.json(respod);
        
    }
    run();
});
router.post('/buy', function (req, res, next) {
    var type = req.body.type;
    var start = parseInt(req.body.start);
    if (!start) {
        start = 0;
    }

    async function run() {

        var want_buy = await sqlasnyc("SELECT uid,goods_name,intro,price,province,city,county,register_date,pic FROM `mvm_want_buy` WHERE approval_date>10 AND goods_cat=? ORDER BY approval_date DESC LIMIT " + start + ",15", [type]);
        var respod={
            ret:'200',
            data:want_buy
        };
        res.json(respod);
        
    }
    run();
});
router.post('/get_ad', function (req, res, next) {
    memcached.getMulti(['default_wap_supply'], function (err, data) {
        console.log(data);
        if (err) {
            console.log(err);
        }
        var respod={
            ret:'200',
            data:data
        };
        res.json(respod);
        
    });
});
module.exports = router;
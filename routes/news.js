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
    res.render('news', { title: 'PHMALL' });
});
router.post('/',function (req,res,next) {
    async function run() {
        var a = await sqlasnyc("select * from `mvm_badmin_table` where supplier_id=0 order by od desc",[]);
        var respod={
            ret:'200',
            data:a
        };
        res.json(respod);
        
    }
    run();
});
router.post('/list',function (req,res,next) {
    var ps_name=req.body.ps_name;

    async function run() {
        var badmin = await sqlasnyc("select * from `mvm_bmain` where ps_name=? and supplier_id=0 order by od desc",[ps_name]);
        badmin.forEach(function (item,index) {
            badmin[index].register_date=return_date(item.register_date);
        })
        var respod={
            ret:'200',
            data:badmin
        };
        res.json(respod);
        
    }
    run();
})
module.exports = router;

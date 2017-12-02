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
    res.render('point_list', {
        title: 'PHMALL'
    });
});


router.post("/", function (req, res, next) {
    var start = 0;
    start = parseInt(req.body.start);
    var cate_uid = req.body.cate_uid;
    var catestr = "";
    var sql = [];
    if (cate_uid != 0) {
        catestr = ' and gc.goods_cat=?';
        sql.push(cate_uid);
    }
    async function run() {
        var point = await sqlasnyc("SELECT gc.uid,gc.goods_name,gc.goods_sale_price,gc.goods_sale_point,gc.goods_file1,gc.goods_status,gc.goods_stock,gc.supplier_id,gc.goods_hit FROM `mvm_goods_change` gc LEFT JOIN `mvm_member_shop` ms ON gc.supplier_id=ms.m_uid WHERE gc.approval=1 AND ms.isSupplier=3 AND gc.show_status =1 " + catestr + " ORDER BY gc.register_date DESC LIMIT " + start + ",20", sql);
        var respod = {
            ret: '200',
            data: point
        };
        res.json(respod);

    }
    run();
})

router.post('/info', function (req, res, next) {

    var m_uid = req.session.m_uid;
    var m_id = req.session.m_id;
    var info = {};
    async function run() {
        var member = await sqlasnyc("select member_point from `mvm_member_table` where uid=? and member_id=?", [m_uid, m_id]);


        memcached.get('default_wap_point_list', function (err, data) {
            if (member != 0) {
                data.member_point = member[0];
            }
            var respod = {
                ret: '200',
                data: data
            };
            res.json(respod);

        });




    }
    run();
})



module.exports = router;
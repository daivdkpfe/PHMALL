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
    run(); */
    res.render('myshare', { title: 'PHMALL' });
});

router.post('/', function(req, res, next) {
    var m_uid = req.session.m_uid;
    if (req.session.sign && req.session.m_id) {
        async function run() {
            var order_share = await sqlasnyc("select uid,goods_name,og_uid,g_uid,goods_table,attr,buy_price,comment,pics,love,m_uid,register_date from `mvm_order_share` where m_uid=?", [m_uid]);



            for (let i in order_share) {
                order_share[i].pics = unserialize(order_share[i].pics);
                // 序列化图片
                if (order_share[i].pics.length <= 0) {
                    var goods = await sqlasnyc("select goods_file1 from `" + order_share[i].goods_table + "` where uid =? limit 1", [order_share[i].g_uid]);
                    if (goods != 0) {
                        order_share[i].pics = [];
                        order_share[i].pics.push('union/' + goods[0].goods_file1);
                        console.log(goods[0].goods_file1);
                    }
                }
                // 如果没有图片，给他商品图
            }




            var respod = {
                ret: '200',
                data: order_share
            }
            res.json(respod);
        }
        run();
    } else {
        var respod = {
            ret: '201',
            data: {}
        }
        res.json(respod);
    }
});
router.post('/del', function(req, res, next) {
    if (req.session.sign && req.session.m_id) {
        var m_uid = req.session.m_uid;
        var uid = req.body.uid;
        async function run() {
            await sqlasnyc('delete from `mvm_order_share` where uid=? and m_uid=?', [uid, m_uid]);
            var respod = {
                ret: '200',
                data: { status: 1 }
            }
            res.json(respod);
        }
        run();
    } else {
        var respod = {
            ret: '201',
            data: {}
        }
        res.json(respod);
    }
})
module.exports = router;
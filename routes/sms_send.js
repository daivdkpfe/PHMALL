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
    run();  */
    if (req.session.sign && req.session.m_id) {
        console.log("sssssssssssssssss:" + req.query.type);
        if ('notice' == req.query.type) {
            res.render('sms_send_notice', { title: 'PHMALL', type: req.query.type });
        } else {
            res.render('sms_send_sms', { title: 'PHMALL', type: req.query.type });
        }
    } else {
        res.redirect('./login'); //重定向
    }
});

router.post('/', function(req, res, next) {
    if (req.session.sign && req.session.m_id) {
        var m_uid = req.session.m_uid;
        async function run() {
            var friend = await sqlasnyc("select * from `mvm_friend` where belong_uid=?", [m_uid]);

            if (friend != 0 && friend.length > 0) {
                for (let i in friend) {
                    var img = await sqlasnyc('select member_image from `mvm_member_table` where member_id=?', [friend[i].member_id]);
                    friend[i].img = img[0].member_image;
                }
            }

            var respod = {
                ret: '200',
                data: friend
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
router.post('/send', function(req, res, next) {
    if (req.session.sign && req.session.m_id) {
        var post = req.body;
        var m_uid = req.session.m_uid;
        var m_id = req.session.m_id;
        var to_id = req.body.to_id;
        var title = req.body.title;
        var content = req.body.content;
        var is_broadcast = req.body.is_broadcast;
        async function run() {
            await sqlasnyc('insert into `mvm_sms` set from_id=?,to_id=?,title=?,content=?,is_broadcast=?', [m_id, to_id, title, content, is_broadcast]);
            var respod = {
                ret: '200',
                data: 1
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
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
    if (req.session.sign && req.session.m_id) {
        res.render('sms', { title: 'PHMALL' });

    } else {
        res.redirect('./login'); //重定向
    }
});
router.post('/', function(req, res, next) {
    async function run() {
        if (req.session.sign && req.session.m_id) {
            var m_id = req.session.m_id;
            var m_uid = req.session.m_uid;
            var sql = "SELECT uid,from_id,to_id,title,reg_date,content FROM `mvm_sms` WHERE is_broadcast='0' AND to_id=? AND to_del='0' ORDER BY uid DESC";




            var sms = await sqlasnyc(sql, [m_id]);
            if (sms != 0 && sms.length > 0) {
                for (let i in sms) {
                    var img = await sqlasnyc('select member_image from `mvm_member_table` where member_id=?', [sms[i].from_id]);
                    console.log(img);
                    sms[i].img = img[0].member_image;
                }


            }
            var respod = {
                ret: '200',
                data: sms
            }
            res.json(respod);
        } else {
            var respod = {
                ret: '201',
                data: {}
            };
            res.json(respod);
        }
    }


    run();
})
router.post('/send', function(req, res, next) {
    async function run() {
        if (req.session.sign && req.session.m_id) {
            var m_id = req.session.m_id;
            var m_uid = req.session.m_uid;
            var sql = "SELECT uid,from_id,to_id,title,reg_date,content FROM `mvm_sms` WHERE is_broadcast='0'  AND from_id=? AND send_del='0' ORDER BY uid DESC";
            var sms = await sqlasnyc(sql, [m_id]);

            if (sms != 0 && sms.length > 0) {
                for (let i in sms) {
                    if (sms[i].to_id.includes(',')) {
                        sms[i].img='';
                    } else {
                        var img = await sqlasnyc('select member_image from `mvm_member_table` where member_id=?', [sms[i].to_id]);
                        console.log(sms[i].to_id);
                        console.log(img);
                        if (img == '0') {} else {
                            sms[i].img = img[0].member_image;
                        }

                    }

                }
            }
            var respod = {
                ret: '200',
                data: sms
            }
            res.json(respod);
        } else {
            var respod = {
                ret: '201',
                data: {}
            };
            res.json(respod);
        }
    }


    run();
});
router.post('/notice', function(req, res, next) {
    async function run() {
        if (req.session.sign && req.session.m_id) {
            var m_id = req.session.m_id;
            var m_uid = req.session.m_uid;
            var sql = "SELECT uid,from_id,to_id,title,reg_date,content FROM `mvm_sms`   WHERE is_broadcast='1' ORDER BY uid DESC";
            var sms = await sqlasnyc(sql, [m_id]);
            
            var respod = {
                ret: '200',
                data: sms
            }
            res.json(respod);
        } else {
            var respod = {
                ret: '201',
                data: {}
            };
            res.json(respod);
        }
    }


    run();
});
router.post('/det', function(req, res, next) {
    var uid = parseInt(req.body.uid);
    var type = req.body.type;
    var m_id = req.session.m_id;
    async function run() {
        if (req.session.sign && req.session.m_id) {

            if (type == 'send') {
                await sqlasnyc("UPDATE `mvm_sms` SET send_del='1' WHERE uid=? AND from_id=?", [uid, m_id]);
                var respod = {
                    ret: '200',
                    data: {
                        status: 1
                    }
                };
                res.json(respod);

            } else if (type == 'admin') {
                await sqlasnyc("DELETE FROM `mvm_sms` WHERE uid=? AND is_broadcast='1'", [uid]);
                var respod = {
                    ret: '200',
                    data: {
                        status: 1
                    }
                };
                res.json(respod);
            } else if (type == 'receive') {
                await sqlasnyc("UPDATE `mvm_sms` SET to_del='1' WHERE uid=? AND to_id=?", [uid, m_id]);
                var respod = {
                    ret: '200',
                    data: {
                        status: 1
                    }
                };
                res.json(respod);
            }
        } else {
            var respod = {
                ret: '201',
                data: {}
            };
            res.json(respod);
        }
    }
    run();

})
module.exports = router;
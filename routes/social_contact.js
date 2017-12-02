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


    /*async function run() {



        var a = await sqlasnyc("select * from `mvm_config` limit 1");
        console.log(a);



    }
    run();*/

    if (req.session.sign && req.session.m_id) {
        res.render('./social_contact', {
            title: 'PHMALL'
        });
    } else {
        // res.render('union/product', {title: 'PHMALL',uid:req.query.uid,setp:req.query.setp});
        res.redirect('./login'); //重定向
    }


});
router.post('/supply', function (req, res, next) {
    if (req.session.sign && req.session.m_id) {
        var m_uid = req.session.m_uid;
        var m_id = req.session.m_id;
        async function run() {
            var supply = await sqlasnyc('select * from `mvm_want_supply` where m_uid=?', [m_uid]);
            var respod = {
                ret: '200',
                data: supply
            };
            res.json(respod);

        }
        run();
    } else {
        var respod = {
            ret: '201',
            data: 0
        };
        res.json(respod);

    }
});
router.post('/buy', function (req, res, next) {
    if (req.session.sign && req.session.m_id) {
        var m_uid = req.session.m_uid;
        var m_id = req.session.m_id;
        async function run() {
            var buy = await sqlasnyc('select * from `mvm_want_buy` where m_uid=?', [m_uid]);
            var respod = {
                ret: '200',
                data: buy
            };
            res.json(respod);

        }
        run();
    } else {
        var respod = {
            ret: '201',
            data: 0
        };
        res.json(respod);

    }
})
router.post("/supply/end", function (req, res, next) {
    console.log(req.body.uid);
    async function run() {
        var m_uid = req.session.m_uid;
        var uid = parseInt(req.body.uid);
        await sqlasnyc('update `mvm_want_supply` set approval_date=10 where uid=? and m_uid=?', [uid, m_uid]);

        var respod = {
            ret: '200',
            data: 1
        };
        res.json(respod);

    }
    run();
});
router.post("/supply/del", function (req, res, next) {
    console.log(req.body.uid);
    async function run() {
        var m_uid = req.session.m_uid;
        var uid = parseInt(req.body.uid);
        await sqlasnyc('DELETE from mvm_want_supply where uid=? and m_uid=?', [uid, m_uid]);

        var respod = {
            ret: '200',
            data: 1
        };
        res.json(respod);

    }
    run();
});



router.post("/buy/end", function (req, res, next) {
    console.log(req.body.uid);
    async function run() {
        var m_uid = req.session.m_uid;
        var uid = parseInt(req.body.uid);
        await sqlasnyc('update `mvm_want_buy` set approval_date=10 where uid=? and m_uid=?', [uid, m_uid]);
        var respod = {
            ret: '200',
            data: 1
        };
        res.json(respod);

    }
    run();
});
router.post("/buy/del", function (req, res, next) {
    console.log(req.body.uid);
    async function run() {
        var m_uid = req.session.m_uid;
        var uid = parseInt(req.body.uid);
        await sqlasnyc('DELETE from mvm_want_buy where uid=? and m_uid=?', [uid, m_uid]);

        var respod = {
            ret: '200',
            data: 1
        };
        res.json(respod);

    }
    run();
});


router.post('/msg_from_me', function (req, res, next) {
    console.log("xx");
    var m_id = req.session.m_id;
    var start = parseInt(req.body.start);
    async function run() {

        var msg = await sqlasnyc("SELECT * from `mvm_want_buy_msg` where m_id=? union all SELECT * from `mvm_want_supply_msg` where m_id=? order by register_date desc limit " + start + ",10", [m_id, m_id]);
        if (msg != 0) {
            for (let s in msg) {
                var member_image = await sqlasnyc("select member_image from `mvm_member_table` where member_id=?", [msg[s].m_id]);
                if (member_image != 0) {
                    msg[s].member_image = member_image[0].member_image;
                }
                if (msg[s].type == 1) {
                    var supply = await sqlasnyc('select * from `mvm_want_supply` where uid=?', [msg[s].buy_id]);
                    if (supply != 0) {
                        msg[s].info = supply[0];
                    }

                } else if (msg[s].type == -1) {
                    var buy = await sqlasnyc('select * from `mvm_want_buy` where uid=?', [msg[s].buy_id]);
                    if (buy != 0) {
                        msg[s].info = buy[0];
                    }

                }
            }
        }
        var respod = {
            ret: '200',
            data: msg
        };
        res.json(respod);

    }
    run();


});
router.post('/msg_to_me', function (req, res, next) {

    var m_id = req.session.m_id;
    var start = parseInt(req.body.start);
    var m_uid = req.session.m_uid;
    async function run() {

        var msg = await sqlasnyc("SELECT * from `mvm_want_buy_msg` where buy_m_uid=? union all SELECT * from `mvm_want_supply_msg` where supply_m_uid=? order by register_date desc limit " + start + ",10", [m_uid, m_uid]);
        console.log('1');
        if (msg != 0) {
            for (let s in msg) {
                var member_image = await sqlasnyc("select member_image from `mvm_member_table` where member_id=?", [msg[s].m_id]);
                if (member_image != 0) {
                    msg[s].member_image = member_image[0].member_image;
                }
                if (msg[s].type == 1) {
                    var supply = await sqlasnyc('select * from `mvm_want_supply` where uid=?', [msg[s].buy_id]);
                    if (supply != 0) {
                        msg[s].info = supply[0];
                    }

                } else if (msg[s].type == -1) {
                    var buy = await sqlasnyc('select * from `mvm_want_buy` where uid=?', [msg[s].buy_id]);
                    if (buy != 0) {
                        msg[s].info = buy[0];
                    }

                }
            }
        }
        var respod = {
            ret: '200',
            data: msg
        };
        res.json(respod);

    }
    run();


});
router.post('/del_msg/sup', function (req, res, next) {
    var uid = req.body.uid;
    async function run() {
        await sqlasnyc('delete from `mvm_want_supply_msg` where uid=?', [uid]);
        var respod = {
            ret: '200',
            data: 1
        };
        res.json(respod);

    }
    run();
});
router.post('/del_msg/buy', function (req, res, next) {
    var uid = req.body.uid;
    async function run() {
        await sqlasnyc('delete from `mvm_want_buy_msg` where uid=?', [uid]);
        var respod = {
            ret: '200',
            data: 1
        };
        res.json(respod);

    }
    run();
});
router.post('/use_msg/buy', function (req, res, next) {
    var uid = req.body.uid;
    async function run() {
        await sqlasnyc('update `mvm_want_buy_msg` set approval_date=? where uid=?', [get_now_time(), uid]);
        var msg = await sqlasnyc('select buy_id from `mvm_want_buy_msg` where uid=?', [uid]);
        var buy = await sqlasnyc('update `mvm_want_buy` set approval_date=10 where uid=?', [msg[0].buy_id]);
        var respod = {
            ret: '200',
            data: 1
        };
        res.json(respod);

    }
    run();
});
router.post('/use_msg/sup', function (req, res, next) {
    var uid = req.body.uid;
    async function run() {
        await sqlasnyc('update `mvm_want_supply_msg` set approval_date=? where uid=?', [get_now_time(), uid]);
        var msg = await sqlasnyc('select supply_id from `mvm_want_supply_msg` where uid=?', [uid]);
        var buy = await sqlasnyc('update `mvm_want_supply` set approval_date=10 where uid=?', [msg[0].supply_id]);
        var respod = {
            ret: '200',
            data: 1
        };
        res.json(respod);

    }
    run();
});
module.exports = router;
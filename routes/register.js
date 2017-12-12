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
var request = require('request');
/* GET home page. */


router.post('/phchat', function (req, res, next) {

    if (req.session.sign) {
        var token_data = {};
        token_data['m_id'] = "NONE";
        token_data['m_uid'] = "NONE";
        token_data['register_time'] = "NONE";
        token_data['status'] = "Logined";
        var respod = {
            ret: '200',
            data: token_data
        };
        res.json(respod);

        return;
    } else {
        var insdata = [];
        insdata.push(req.body.login_id);
        insdata.push(md5(req.body.pass1));
        insdata.push(new Buffer(req.body.pass1).toString('base64'));
        insdata.push(req.body.member_tel11);
        insdata.push(get_now_time());

        var sqldata = [];
        sqldata.push(req.body.member_tel11);
        sqldata.push(req.body.login_id);


        sqlQueryMore("select uid from `mvm_member_table` where member_tel1 =? or member_id=?", sqldata, function (err, vals, xx) {
            if (err) logger.info("Caught exception:" + err);
            if (vals.length > 0) {


                var respod = {
                    ret: '203',
                    data: "重複的ID或手機號碼"
                };
                res.json(respod);

            } else {
                sqlQueryMore("INSERT INTO `mvm_member_table` (`member_class`, `member_id`, `member_pass`, `base_pass`,  `member_tel1`, `register_date`) VALUES ('1', ?, ?, ?, ?, ?)", insdata, function (err, vals, xx) {

                    if (err) {
                        var errarr = {};

                        logger.info("INSERT INTO `mvm_member_table` (`member_class`, `member_id`, `member_pass`, `base_pass`,  `member_tel1`, `register_date`) VALUES ('1', ?, ?, ?, ?, ?)" + "    " + insdata);
                        errarr['err'] = "Register Fail";


                        var respod = {
                            ret: '203',
                            data: errarr
                        };
                        res.json(respod);

                    } else {
                        //插入成功，我想要不直接給他綁定了第三方登錄好了
                        var token = generateMixed(32); //生成token


                        var token_data = {};
                        token_data['m_id'] = req.body.login_id; //用户ID
                        token_data['m_uid'] = vals.insertId; //用户UID
                        token_data['register_time'] = get_now_time(); //获取当前时间戳
                        token_data['token'] = token;
                        token_data['status'] = "Success";
                        req.session.sign = true;
                        req.session.m_id = req.body.login_id;
                        req.session.m_uid = vals.insertId;
                        var insdata = [];
                        insdata.push(token_data['m_uid']);
                        insdata.push(token_data['m_id']);
                        insdata.push(token_data['token']);
                        insdata.push(token_data['register_time']);
                        sqlQueryMore("insert into `english`.`oauth_login` (`m_uid`, `m_id`, `token`, `type`, `register_time`) VALUES ( ?, ?, ?, '1', ?);", insdata, function (err, vals, xx) {
                            if (err) //插入失败，一般是因为token重复了
                            {
                                logger.info("insert into `english`.`oauth_login` (`m_uid`, `m_id`, `token`, `type`, `register_time`) VALUES ( ?, ?, ?, '1', ?);" + "    " + insdata);
                                // logger.info("Caught exception:"+err);
                                token_data['m_id'] = 'None'; //用户ID
                                token_data['m_uid'] = 'None'; //用户UID
                                token_data['register_time'] = 'None'; //获取当前时间戳
                                token_data['token'] = 'None';
                                token_data['status'] = "Fail";
                                //失败后把token归0
                            }


                            var respod = {
                                ret: '200',
                                data: token_data
                            };
                            res.json(respod);

                        }); //插入数据库
                        // 插入第三方库成功了
                    }

                });


                var respod = {
                    ret: '200',
                    data: insdata
                };
                res.json(respod);

            }
        });
    }




});
router.post('/', function (req, res, next) {
    
    console.log('post:' + req.body.member_tel11);
    if (req.session.sign) {
        var token_data = {};
        token_data['m_id'] = "NONE";
        token_data['m_uid'] = "NONE";
        token_data['register_time'] = "NONE";
        token_data['status'] = "Logined";

        var respod = {
            ret: '200',
            data: token_data
        };
        res.json(respod);

    } else {
        var insdata = [];
        insdata.push(req.body.login_id);
        insdata.push(md5(req.body.pass1));
        insdata.push(new Buffer(req.body.pass1).toString('base64'));
        insdata.push(req.body.member_tel11);
        insdata.push(get_now_time());

        var sqldata = [];
        sqldata.push(req.body.member_tel11);
        sqldata.push(req.body.login_id);


        var sql = [];
        sql.push('63' + req.body.member_tel11);
        sql.push(get_now_time());
        sql.push(req.body.code);

        sqlQueryMore("select uid from `mvm_member_table` where member_tel1 =? or member_id=?", sqldata, function (err, vals, xx) {
            console.log(vals);
            if (err) logger.info("Caught exception:" + err);
            if (vals.length > 0) {
                var respod = {
                    ret: '203',
                    data: "重複的ID或手機號碼"
                };
                res.json(respod);

            } else {

                sqlQueryMore("select * from `mvm_send_code` where type=0 and phone_number=? and end_time>? and code=?", sql, function (err, vals, xx) {
                    console.log(vals);
                    if (vals.length <= 0) {

                        var err = {};
                        err['err'] = "驗證碼錯誤";
                        var respod = {
                            ret: '203',
                            data: err
                        };
                        res.json(respod);

                    } else {
                        
                        sqlQueryMore("INSERT INTO `mvm_member_table` (`member_class`, `member_id`, `member_pass`, `base_pass`,  `member_tel1`, `register_date`) VALUES ('1', ?, ?, ?, ?, ?)", insdata, function (err, vals, xx) {
                            if (err) {
                                var errarr = {};
                                logger.info("INSERT INTO `mvm_member_table` (`member_class`, `member_id`, `member_pass`, `base_pass`,  `member_tel1`, `register_date`) VALUES ('1', ?, ?, ?, ?, ?)" + "    " + insdata);
                                errarr['err'] = "Register Fail";
                                var respod = {
                                    ret: '203',
                                    data: errarr
                                };
                                res.json(respod);
                            } else {
                                //插入成功，我想要不直接給他綁定了第三方登錄好了
                                sqlQueryMore("INSERT INTO `mvm_member_oauth` (`m_uid`, `oauth_uid`, `token`, `type`) VALUES ( ?, ?, ?,'facebook')",[vals.insertId,req.body.oauth_uid,req.body.token,req.body.oauth] , function (err, vals, xx) {
                                    if(err){
                                        logger.info("INSERT INTO `mvm_member_table` (`member_class`, `member_id`, `member_pass`, `base_pass`,  `member_tel1`, `register_date`) VALUES ('1', ?, ?, ?, ?, ?)" + "    " + insdata);
                                    }
                                });
                                var token_data = {};
                                token_data['m_id'] = req.body.login_id; //用户ID
                                token_data['m_uid'] = vals.insertId; //用户UID
                                token_data['register_time'] = get_now_time(); //获取当前时间戳
                                token_data['status'] = "Success";
                                req.session.sign = true;
                                req.session.m_id = req.body.login_id;
                                req.session.m_uid = vals.insertId;
                                var respod = {
                                    ret: '200',
                                    data: token_data
                                };
                                res.json(respod);

                                // 插入第三方库成功了



                                post3000('', '/register', {
                                    id: token_data['m_id'],
                                    username: token_data['m_id'],
                                    phone: req.body.member_tel11,
                                    member_pass: md5(req.body.pass1),
                                    base_pass: new Buffer(req.body.pass1).toString('base64'),
                                    password: req.body.pass1
                                }, function (result) {
                                    console.log(result);
                                })
                            }

                        });

                    }
                });

            }
        });

    }

});
router.get('/', function (req, res, next) {
    res.render('register', {
        title: 'Express'
    });
});
router.get('/phchat', function (req, res, next) {
    res.render('login', {
        title: 'Express'
    });
});
module.exports = router;
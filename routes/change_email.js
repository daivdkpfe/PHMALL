var express = require('express');
var router = express.Router();
var io = require('socket.io');
var fs = require("fs");
/* GET home page. */



router.get('/', function (req, res, next) {
    if (req.session.sign && req.session.m_id) {
        res.render('change_email', {
            title: 'PHMALL'
        });
    } else {
        res.redirect('../login'); //重定向
    }
});
router.post('/', function (req, res, next) {
    var m_id = req.session.m_id;
    var email = req.body.email;
    var code = req.body.code;
    var m_uid = req.session.m_uid;
    async function run() {
        var lostpass = await sqlasnyc('select * from `mvm_lostpass` where user_id=? and lost_type=2 and info=? and lost_str=?', [m_id, email, code]);
        if (lostpass != 0) {
            await sqlasnyc('update `mvm_member_table` set member_email=? where uid=? and member_id=?', [email, m_uid, m_id]);
            var respod = {
                ret: '200',
                data: 1
            };
            res.json(respod);

        } else {
            var respod = {
                ret: '200',
                data: 0
            };
            res.json(respod);

        }
    }
    run()
});
router.post('/send', function (req, res, next) {
    async function run() {
        if (req.session.sign && req.session.m_id) {
            var member = await sqlasnyc('select member_email from `mvm_member_table` where uid=? and member_id=?', [req.session.m_uid, req.session.m_id]);

            if (member != 0) {
                if (req.body.email != member[0].member_email) {
                    var jieguo = false;
                    var rnd = generateMixed(8);
                    SendEmail(req.body.email, 'PHMALL:My Website,My Decision .Let\'s Create Your Own Online Shop !.Verification code for email modification',
                        '<div style="background:rgb(251,250,222);\n' +
                        '                    width:100%;\n' +
                        '                    height:600px;">\n' +
                        '                <div style="width:400px;height:400px;margin:0 auto;background:white;border:100px solid rgb(251,250,222);">\n' +
                        '                    <p style="text-align: left;\n' +
                        '                    width:300px;\n' +
                        '                    line-height: 30px;\n' +
                        '\n' +
                        '                    margin:10px;\n' +
                        '                    margin-left:30px;\n' +
                        '                    float: left;">Your Verication code for changing Basic information is  ' + rnd + ' . Please enter code and click SAVE</p>\n' +
                        '                &nbsp;\n' +
                        '\n' +
                        '                <p style="text-align: left;\n' +
                        '                    width:300px;\n' +
                        '                    line-height: 30px;\n' +
                        '\n' +
                        '                    margin:10px;\n' +
                        '                    margin-left:30px;\n' +
                        '                    float: left;">Thank you</p>\n' +
                        '\n' +
                        '                <p><br />\n' +
                        '                <br />\n' +
                        '                <br />\n' +
                        '                <br />\n' +
                        '\n' +
                        '                &nbsp;</p>\n' +
                        '\n' +
                        '                <p>&nbsp;</p>\n' +
                        '\n' +
                        '                <p style="text-align: right;\n' +
                        '                    width:300px;\n' +
                        '                    line-height: 30px;\n' +
                        '\n' +
                        '                    margin:10px;\n' +
                        '                    margin-left:30px;\n' +
                        '                    float: left;">From:PHMALL</p>\n' +
                        '                </div>\n' +
                        '                </div>\n' +
                        '                    ',
                        function (result) {

                            if (result.indexOf("请求成功") > 0) {

                                jieguo = true;
                                var sql = [];

                                sql.push(req.session.m_id);
                                sql.push(rnd);
                                sql.push(req.body.email);
                                sql.push(get_now_time());


                                sqlQueryMore('replace `mvm_lostpass` set user_id=?,lost_type=2,lost_str=?,info=?,lost_time=?', sql, function (err, val, xx) {
                                    if (err) logger.info("Caught exception:" + err);
                                    var respod = {
                                        ret: '200',
                                        data: 1
                                    };
                                    res.json(respod);

                                })
                            } else {
                                var respod = {
                                    ret: '200',
                                    data: auction
                                };
                                res.json(respod);

                            }
                        });
                } else {
                    var respod={
                        ret:'200',
                        data:0
                    };
                    res.json(respod);
                    
                }




            } else {
                var respod={
                    ret:'200',
                    data:0
                };
                res.json(respod);
                
            }

        } else {
            var respod={
                ret:'201',
                data:0
            };
            res.json(respod);
            
        }

    }
    run();
});
module.exports = router;
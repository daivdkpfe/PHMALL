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
        res.render('sms_send', { title: 'PHMALL' });
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

module.exports = router;
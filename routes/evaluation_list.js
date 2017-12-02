var express = require('express');
var router = express.Router();
var io = require('socket.io');
var fs = require("fs");
/* GET home page. */



router.get('/', function (req, res, next) {

    /* async function run() {
        var a = await sqlasnyc("select * from `mvm_config` limit 1");
        console.log(a);
    }
    run(); */
    if (req.session.sign && req.session.m_id) {
        res.render('evaluation_list', {
            title: 'PHMALL'
        });
    } else {
        res.redirect('../login'); //重定向
    }
});
router.post('/buyer', function (req, res, next) {
    if (req.session.sign && req.session.m_id) {
        var m_id=req.session.m_id;
        async function run() {
            var evaluation = await sqlasnyc("select * from `mvm_order_goods_comment` where from_id=? ", [m_id]);
            for (let i in evaluation) {
                evaluation[i].img = await sqlasnyc('select member_image from `mvm_member_table` where member_id=?', [evaluation[i].to_id]);
            }
            var respond = {
                ret: 200,
                data: evaluation
            }
            res.json(respond);
        }
        run();
    } else {
        var respond = {
            ret: 201,
            data: {}
        }
        res.json(respond);
    }
})
router.post('/seller', function (req, res, next) {
    var m_id=req.session.m_id;
    async function run() {
        
        var evaluation = await sqlasnyc("select * from `mvm_order_user_comment` where  to_id=? and roll='1'", [m_id]);
        for (let i in evaluation) {
            evaluation[i].img = await sqlasnyc('select member_image from `mvm_member_table` where member_id=?', [evaluation[i].from_id]);
        }
        var respond = {
            ret: 200,
            data: evaluation
        }
        res.json(respond);
    }
    run();
})


module.exports = router;
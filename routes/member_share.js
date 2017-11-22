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
    res.render('member_share', { title: 'PHMALL' });

});
router.post('/', function(req, res, next) {
    if (req.session.sign && req.session.m_id) {
        var uid = req.session.uid;
        async function run() {
            var order_share = await sqlaysnc('select * from `mvm_order_share` where uid=?', [uid]);
            console.log(order_share);
            if (order_share != 0 && order_share.length > 0) {
                // var order_goods =　await sqlasync('select * ')

            } else {
                var respod = {
                    ret: '205',
                    data: {}
                }
                res.json(respod);
            }
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
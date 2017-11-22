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
    res.render('member_share', { title: 'PHMALL', uid: req.query.uid });

});
router.post('/', function(req, res, next) {
    if (req.session.sign && req.session.m_id) {
        var uid = req.body.uid;
        async function run() {
            var order_share = await sqlasnyc('select * from `mvm_order_share` where og_uid=?', [uid]);
            console.log(order_share);
            if (order_share != 0 && order_share.length > 0) {
                // 已經分享過的


            } else {
                //第一次分享
                var order_goods = await sqlasnyc('select * from `mvm_order_goods` where order_id =?', [uid]);
                var img = await sqlasnyc('select goods_file1 from `' + order_goods[0].goods_table + '` where uid=?', [order_goods[0].g_uid]);
                var ordersn = await sqlasnyc('select ordersn from `mvm_order_info` where uid= ?', [uid]);



                order_goods[0].ordersn = ordersn[0].ordersn;
                order_goods[0].img = img[0].goods_file1;
                var respod = {
                    ret: '200',
                    data: {
                        status: 0,
                        goods: order_goods,
                        share: {}
                    }
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
});
router.post('/release', function(req, res, next) {
    console.log(req.body);
    res.json(req.body);
})
module.exports = router;
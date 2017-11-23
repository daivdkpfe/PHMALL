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
            if (order_share != 0 && order_share.length > 0) {
                // 已經分享過的

                var order_goods = await sqlasnyc('select * from `mvm_order_goods` where order_id =?', [uid]);
                var img = await sqlasnyc('select goods_file1 from `' + order_goods[0].goods_table + '` where uid=?', [order_goods[0].g_uid]);
                var ordersn = await sqlasnyc('select ordersn from `mvm_order_info` where uid= ?', [uid]);



                order_goods[0].ordersn = ordersn[0].ordersn;
                order_goods[0].img = img[0].goods_file1;

                var shareimg = unserialize(order_share[0].pics);
                order_share[0].shareimg = shareimg;
                var respod = {
                    ret: '200',
                    data: {
                        status: 0,
                        goods: order_goods,
                        share: order_share
                    }
                }
                res.json(respod);



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
    if (req.session.sign && req.session.m_id) {
        var uid = req.body.og_uid;
        var comment = req.body.comment;
        var pic;
        if (req.body.pics == '') {
            pic = {}
        } else {
            pic = req.body.pics.split('|');
        }
        var pictxt = serialize(pic);



        async function run() {
            var order_share = await sqlasnyc('select * from `mvm_order_share` where og_uid=?', [uid]);
            var order_goods = await sqlasnyc('select * from `mvm_order_goods` where order_id =?', [uid]);
            var img = await sqlasnyc('select goods_file1 from `' + order_goods[0].goods_table + '` where uid=?', [order_goods[0].g_uid]);
            var ordersn = await sqlasnyc('select ordersn from `mvm_order_info` where uid= ?', [uid]);
            var goods = await sqlasnyc('select goods_category from `' + order_goods[0].goods_table + '` where uid=?', [order_goods[0].g_uid]);
            order_goods[0].ordersn = ordersn[0].ordersn;
            order_goods[0].img = img[0].goods_file1;

            var sqldata = [];
            var sqlstr = "replace into `mvm_order_share` set goods_name=?,og_uid=?,g_uid=?,goods_table=?,module=?,goods_category=?,attr=?,buy_price=?,comment=?,pics=?,m_uid=?,supplier_id=?,register_date=?";
            sqldata.push(order_goods[0].goods_name);
            sqldata.push(order_goods[0].order_id);
            sqldata.push(order_goods[0].g_uid);
            sqldata.push(order_goods[0].goods_table);
            sqldata.push(order_goods[0].module);
            sqldata.push(goods[0].goods_category);
            sqldata.push(order_goods[0].goods_attr);
            sqldata.push(order_goods[0].buy_price);
            sqldata.push(comment);
            sqldata.push(pictxt);

            sqldata.push(req.session.m_uid);
            sqldata.push(order_goods[0].supplier_id);
            sqldata.push(get_now_time());
            // sqldata.push(order_goods[0].goods_name);

            if (order_share != 0 && order_share.length > 0) {
                // 已經分享過的
                sqlstr += ',uid=?,love=?';
                sqldata.push(order_share[0].uid);
                sqldata.push(order_share[0].love); //需要處理
            } else {
                //第一次分享
                sqlstr += ',love=0';
            }
            await sqlasnyc(sqlstr, sqldata)
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
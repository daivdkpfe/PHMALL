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
    res.render('myshare', { title: 'PHMALL' });
});

router.post('/', function(req, res, next) {
    var m_uid = req.session.m_uid;
    if (req.session.sign && req.session.m_id) {
        async function run() {
            var order_share = await sqlasnyc("select uid,goods_name,og_uid,g_uid,goods_table,attr,buy_price,comment,pics,love,m_uid,register_date from `mvm_order_share` where m_uid=?", [m_uid]);



            for (let i in order_share) {
                order_share[i].pics = unserialize(order_share[i].pics);
                // 序列化图片
                if (order_share[i].pics.length <= 0) {
                    var goods = await sqlasnyc("select goods_file1 from `" + order_share[i].goods_table + "` where uid =? limit 1", [order_share[i].g_uid]);
                    if (goods != 0) {
                        order_share[i].pics = [];
                        order_share[i].pics.push('union/' + goods[0].goods_file1);
                        console.log(goods[0].goods_file1);
                    }
                }
                // 如果没有图片，给他商品图
            }




            var respod = {
                ret: '200',
                data: order_share
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
});
router.post('/del', function(req, res, next) {
    if (req.session.sign && req.session.m_id) {
        var m_uid = req.session.m_uid;
        var uid = req.body.uid;
        async function run() {
            await sqlasnyc('delete from `mvm_order_share` where uid=? and m_uid=?', [uid, m_uid]);
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
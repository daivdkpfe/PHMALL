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
    res.render('share', {
        title: 'PHMALL'
    });
});
router.post('/', function (req, res, next) {
    var type = req.body.type;
    var sqlstr = '';
    if (type == 'new') {
        sqlstr = ' order by register_date desc ';
    } else if (type == 'hot') {
        sqlstr = ' ORDER BY LOVE ';
    }

    async function run() {
        var order_share = await sqlasnyc("select * from `mvm_order_share`" + sqlstr + " limit " + start + ",20");
        res.json(order_share);
    }
    run();
})
module.exports = router;
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

    res.render('evaluation_list', {
        title: 'PHMALL'
    });
});
router.post('/buyer', function (req, res, next) {
    async function run() {
        var evaluation = await sqlasnyc("select * from `mvm_order_goods_comment` where from_id=?", ['admin']);
        var respond = {
            ret: 200,
            data: evaluation
        }
        res.json(respond);
    }
    run();
})
router.post('/seller', function (req, res, next) {
    async function run() {
        var evaluation = await sqlasnyc("select * from `mvm_order_goods_comment` where to_id=?", ['admin']);
        var respond = {
            ret: 200,
            data: evaluation
        }
        res.json(respond);
    }
    run();
})


module.exports = router;
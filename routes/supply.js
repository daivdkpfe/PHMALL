var express = require('express');
var router = express.Router();
var io = require('socket.io');
var fs = require("fs");
/* GET home page. */



router.get('/', function (req, res, next) {

    res.render('supply', {
        title: 'PHMALL'
    });


});
router.post('/', function (req, res, next) {
    var type = req.body.type;
    var start = parseInt(req.body.start);

    if (!start) {
        start = 0;
    }

    async function run() {

        var want_supply = await sqlasnyc("SELECT uid,goods_name,intro,price,province,city,county,register_date,pic FROM `mvm_want_supply` WHERE approval_date>10 AND goods_cat=? ORDER BY approval_date DESC LIMIT " + start + ",15", [type]);
        var respod={
            ret:'200',
            data:want_supply
        };
        res.json(respod);
        
    }
    run();
});
router.post('/buy', function (req, res, next) {
    var type = req.body.type;
    var start = parseInt(req.body.start);

    if (!start) {
        start = 0;
    }

    async function run() {

        var want_buy = await sqlasnyc("SELECT uid,goods_name,intro,price,province,city,county,register_date,pic FROM `mvm_want_buy` WHERE approval_date>10 AND goods_cat=? ORDER BY approval_date DESC LIMIT " + start + ",15", [type]);
        var respod={
            ret:'200',
            data:want_buy
        };
        res.json(respod);
        
    }
    run();
});
router.post('/get_ad', function (req, res, next) {
    memcached.getMulti(['default_wap_supply'], function (err, data) {
        console.log(data);
        if (err) {
            console.log(err);
        }
        var respod={
            ret:'200',
            data:data
        };
        res.json(respod);
        
    });
});
module.exports = router;
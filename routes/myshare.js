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
    async function run() {
        var a = await sqlasnyc("select * from `mvm_order_share` where m_uid=?", [m_uid]);
        console.log(a);
    }
    run();
})
module.exports = router;
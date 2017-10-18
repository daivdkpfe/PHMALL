var express = require('express');
var router = express.Router();
var io = require('socket.io');
var fs = require("fs");
/* GET home page. */

console.log("xxx");

router.get('/', function(req, res, next) {

    /*async function run() {
        var a = await sqlasnyc("select * from `mvm_config` limit 1");
        console.log(a);
    }
    run();*/

    res.render('./union/auction_detail', { title: 'PHMALL',uid:req.query.uid});

});
router.post('/assure',function (req,res,next) {
    if(req.session.sign && req.session.m_uid)
    {
        var  g_uid= req.body.uid;
        var m_uid=req.session.m_uid;
        async function run() {
            var assure = await sqlasnyc("select * from `mvm_goods_auction_assure` where g_uid=? and m_uid=? limit 1",[g_uid,m_Uid]);
            res.json(assure);
        }
        run();
    }
    else
    {
        res.json(0);
    }

});
module.exports = router;

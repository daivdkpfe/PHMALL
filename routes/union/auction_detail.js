var express = require('express');
var router = express.Router();
var io = require('socket.io');
var fs = require("fs");
/* GET home page. */



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
            var assure = await sqlasnyc("select * from `mvm_goods_auction_assure` where g_uid=? and m_uid=? limit 1",[g_uid,m_uid]);
            
            res.json(assure);
        }
        run();
    }
    else
    {
        res.json(0);
    }

});
router.post('/join',function (req,res,next) {
    var g_uid=req.body.uid;

    async function run() {
        var join=await sqlasnyc('select * from `mvm_goods_auction_join` where g_uid=? order by register_date desc limit 3',[g_uid]);
        res.json(join);
    }
    run();
})
module.exports = router;

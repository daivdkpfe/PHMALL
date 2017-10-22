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

    if (req.session.sign && req.session.m_id) {
        res.render('./social_contact', { title: 'PHMALL'});
    }
    else
    {
        // res.render('union/product', {title: 'PHMALL',uid:req.query.uid,setp:req.query.setp});
        res.redirect('./login');//重定向
    }


});
router.post('/supply',function(req,res,next){
    if (req.session.sign && req.session.m_id) {
        var m_uid=req.session.m_uid;
        var m_id=req.session.m_id;
       async function run() {
           var supply=await sqlasnyc('select * from `mvm_want_supply` where m_uid=?',[m_uid]);
           res.json(supply);
        }
        run();
    }
    else
    {
        res.json(0);
    }
});
router.post('/buy',function(req,res,next){
    if (req.session.sign && req.session.m_id) {
        var m_uid=req.session.m_uid;
        var m_id=req.session.m_id;
       async function run() {
           var buy=await sqlasnyc('select * from `mvm_want_buy` where m_uid=?',[m_uid]);
           res.json(buy);
        }
        run();
    }
    else
    {
        res.json(0);
    }
})
router.post("/supply/end",function(req,res,next){
    console.log(req.body.uid);
    async function run() {
    var m_uid=req.session.m_uid;
    var uid=parseInt(req.body.uid);
    await sqlasnyc('update `mvm_want_supply` set approval_date=10 where uid=? and m_uid=?',[uid,m_uid]);
    console.log(uid+"xx"+m_uid);
    res.json(1);
    }
    run();
});
router.post("/supply/del",function(req,res,next){
    console.log(req.body.uid);
    async function run() {
    var m_uid=req.session.m_uid;
    var uid=parseInt(req.body.uid);
    await sqlasnyc('DELETE from mvm_want_supply where uid=? and m_uid=?',[uid,m_uid]);
    console.log(uid+"xx"+m_uid);
    res.json(1);
    }
    run();
});



router.post("/buy/end",function(req,res,next){
    console.log(req.body.uid);
    async function run() {
    var m_uid=req.session.m_uid;
    var uid=parseInt(req.body.uid);
    await sqlasnyc('update `mvm_want_buy` set approval_date=10 where uid=? and m_uid=?',[uid,m_uid]);
    console.log(uid+"xx"+m_uid);
    res.json(1);
    }
    run();
});
router.post("/buy/del",function(req,res,next){
    console.log(req.body.uid);
    async function run() {
    var m_uid=req.session.m_uid;
    var uid=parseInt(req.body.uid);
    await sqlasnyc('DELETE from mvm_want_buy where uid=? and m_uid=?',[uid,m_uid]);
    console.log(uid+"xx"+m_uid);
    res.json(1);
    }
    run();
});
module.exports = router;

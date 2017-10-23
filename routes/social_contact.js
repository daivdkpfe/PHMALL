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


router.post('/msg_from_me',function(req,res,next){
    console.log("xx");
    var m_id=req.session.m_id;
    var start=parseInt(req.body.start);
     async function run() {

       var msg=await sqlasnyc( "SELECT * from `mvm_want_buy_msg` where m_id=? union all SELECT * from `mvm_want_supply_msg` where m_id=? order by register_date desc limit "+start+",10",[m_id,m_id]);
       if(msg!=0)
       {
           for (let s in msg)
           {
               var member_image=await sqlasnyc("select member_image from `mvm_member_table` where member_id=?",[msg[s].m_id]);
                if(member_image!=0)
                {
                    msg[s].member_image=member_image[0].member_image;
                }
               if(msg[s].type==1)
               {
                    var supply=await sqlasnyc('select * from `mvm_want_supply` where uid=?',[msg[s].buy_id]);
                    if(supply!=0)
                    {
                         msg[s].info=supply[0];
                    }
                   
               }
               else if(msg[s].type==-1)
               {
                var buy=await sqlasnyc('select * from `mvm_want_buy` where uid=?',[msg[s].buy_id]);
                if(buy!=0)
                {
                     msg[s].info=buy[0];
                }
               
               }
           }
       }
      
        res.json(msg);
    }
    run();

   
});
router.post('/msg_to_me',function(req,res,next){
   
    var m_id=req.session.m_id;
    var start=parseInt(req.body.start);
    var m_uid=req.session.m_uid;
     async function run() {

       var msg=await sqlasnyc( "SELECT * from `mvm_want_buy_msg` where buy_m_uid=? union all SELECT * from `mvm_want_supply_msg` where supply_m_uid=? order by register_date desc limit "+start+",10",[m_uid,m_uid]);
        console.log('1');
       if(msg!=0)
       {
           for (let s in msg)
           {
               var member_image=await sqlasnyc("select member_image from `mvm_member_table` where member_id=?",[msg[s].m_id]);
                if(member_image!=0)
                {
                    msg[s].member_image=member_image[0].member_image;
                }
               if(msg[s].type==1)
               {
                    var supply=await sqlasnyc('select * from `mvm_want_supply` where uid=?',[msg[s].buy_id]);
                    if(supply!=0)
                    {
                         msg[s].info=supply[0];
                    }
                   
               }
               else if(msg[s].type==-1)
               {
                var buy=await sqlasnyc('select * from `mvm_want_buy` where uid=?',[msg[s].buy_id]);
                if(buy!=0)
                {
                     msg[s].info=buy[0];
                }
               
               }
           }
       }
      
        res.json(msg);
    }
    run();

   
});
router.post('/del_msg/sup',function(req,res,next)
{
    var uid=req.body.uid;
    async function run() {
       await sqlasnyc('delete from `mvm_want_supply_msg` where uid=?',[uid]);
        res.json(1);
        }
        run();
});
router.post('/del_msg/buy',function(req,res,next)
{
    var uid=req.body.uid;
    async function run() {
       await sqlasnyc('delete from `mvm_want_buy_msg` where uid=?',[uid]);
        res.json(1);
        }
        run();
});
router.post('/use_msg/buy',function(req,res,next)
{
    var uid=req.body.uid;
    async function run() {
       await sqlasnyc('update `mvm_want_buy_msg` set approval_date=? where uid=?',[get_now_time(),uid]);
       var msg=await sqlasnyc('select buy_id from `mvm_want_buy_msg` where uid=?',[uid]);
       var buy=await sqlasnyc('update `mvm_want_buy` set approval_date=10 where uid=?',[msg[0].buy_id]);
        res.json(1);
        }
        run();
});
router.post('/use_msg/sup',function(req,res,next)
{
    var uid=req.body.uid;
    async function run() {
       await sqlasnyc('update `mvm_want_supply_msg` set approval_date=? where uid=?',[get_now_time(),uid]);
       var msg=await sqlasnyc('select supply_id from `mvm_want_supply_msg` where uid=?',[uid]);
       var buy=await sqlasnyc('update `mvm_want_supply` set approval_date=10 where uid=?',[msg[0].supply_id]);
        res.json(1);
        }
        run();
});
module.exports = router;

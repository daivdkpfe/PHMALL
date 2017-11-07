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
    if(req.session.sign && req.session.m_id)
    {
        res.render('address', { title: 'PHMALL' });
    }
    else
    {
        res.redirect('../login');//重定向
    }
});

router.post('/',function (req,res,next) {
    if(req.session.sign && req.session.m_id){
        var m_uid=req.session.m_uid;
        async function run() {
            var a = await sqlasnyc("select * from `mvm_address` where m_uid=? limit 3 ",[m_uid]);
            var respod={
                ret:'200',
                data:a
            };
            res.json(respod);
            
        }
        run();
    }
    else
    {
        var respod={
            ret:'201',
            data:'no login'
        };
        res.json(respod);
        
    }
});
router.post('/delete',function (req,res,next) {
    if(req.session.sign && req.session.m_id){
        var uid=req.body.uid;
        var m_uid=req.session.m_uid;
        async function run() {
            await sqlasnyc("delete from `mvm_address` where uid=? and m_uid=?",[uid,m_uid]);
            var respod={
                ret:'200',
                data:'1'
            };
            res.json(respod);
            
        }
        run();
    }
    else
    {
        var respod={
            ret:'201',
            data:'no login'
        };
        res.json(respod);
        
    }
});
router.post('/edit',function (req,res,next) {
    if(req.session.sign && req.session.m_id){
        var uid=req.body.uid;
        var m_uid=req.session.m_uid;
        async function run() {
            await sqlasnyc("update `mvm_address` set is_buy=0 where m_uid=?",[m_uid]);
            await sqlasnyc("update `mvm_address` set is_buy=1 where m_uid=? and uid=? ",[m_uid,uid]);
            var respod={
                ret:'200',
                data:'1'
            };
            res.json(respod);
            
        }
        run();
    }
    else
    {
        var respod={
            ret:'201',
            data:0
        };
        res.json(respod);
        
    }
})
module.exports = router;

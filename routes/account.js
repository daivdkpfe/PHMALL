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
        res.render('./my_account', { title: 'PHMALL'});
    }
    else
    {
        // res.render('union/product', {title: 'PHMALL',uid:req.query.uid,setp:req.query.setp});
        res.redirect('./login');//重定向
    }
});


router.post('/',function (req,res,next) {
    if (req.session.sign && req.session.m_id) {
        var m_uid=req.session.m_uid;
        var m_id=req.session.m_id;
        async function run() {
            var a = await sqlasnyc("select uid,member_id,member_money,member_point  from `mvm_member_table` where uid=? and member_id=? limit 1",[m_uid,m_id]);
            res.json(a);
        }
        run();
    }
    else
    {
        res.json(0);
    }
})
module.exports = router;

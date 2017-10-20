var express = require('express');
var router = express.Router();
var io = require('socket.io');
var fs = require("fs");
/* GET home page. */


console.log('get');
router.get('/', function(req, res, next) {

    /*async function run() {
        var a = await sqlasnyc("select * from `mvm_config` limit 1");
        console.log(a);
    }
    run();*/

    if (req.session.sign && req.session.m_id) {
        res.render('./funddetails', { title: 'PHMALL'});
    }
    else
    {
        // res.render('union/product', {title: 'PHMALL',uid:req.query.uid,setp:req.query.setp});
        res.redirect('./login');//重定向
    }

});

router.post('/',function (req,res,next) {

   /* type=0 全部
    type=1 充值
    type=-1 支出*/

    var m_id=req.session.m_id;
    var sqlstr='';
    if(req.body.type==1)
    {
        var sqlstr=' and money_add >0 ';
    }
    else if(req.session.type==-1)
    {
        var sqlstr=' and money_add <0 ';
    }

    var start=req.body.start;

    async function run() {
        var funddetails=await sqlasnyc("select * from `mvm_money_table` where money_id=? "+sqlstr+" order by register_date desc limit "+start+",20 ",[m_id]);
        res.json(funddetails);
    }

    run();
})
module.exports = router;

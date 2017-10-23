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
    if (req.session.sign && req.session.m_id) {
      res.render('msg_detail', { title: 'PHMALL',uid:req.query.uid,type:req.query.type });    
    }
    else
    {
        // res.render('union/product', {title: 'PHMALL',uid:req.query.uid,setp:req.query.setp});
        res.redirect('./login');//重定向
    }

});
router.post("/",function(req,res,next)
{
  var uid=req.body.uid;

  if(req.body.type==1)
  {
    var sqlstr='select * from `mvm_want_supply_msg` where uid=?'
  }
  else if(req.body.type==-1)
  {
    var sqlstr='select * from `mvm_want_buy_msg` where uid=?'
  }
  else
  {
    res.json(0);
    return;
  }
  async function run() {
        var msg = await sqlasnyc(sqlstr,[uid]);
        res.json(msg);
    }
    run();
})

module.exports = router;

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
        res.render('./FundDetails', { title: 'PHMALL'});
    }
    else
    {
        // res.render('union/product', {title: 'PHMALL',uid:req.query.uid,setp:req.query.setp});
        res.redirect('./login');//重定向
    }

});

module.exports = router;

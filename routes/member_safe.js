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
        res.render('member_safe', {title: 'PHMALL', m_uid: req.session.m_uid, m_id: req.session.m_id});
    }
    else
    {
        res.render('login', {title: 'PHMALL'});
        // res.render('member_safe', {title: 'PHMALL', m_uid: req.session.m_uid, m_id: req.session.m_id});
    }
});

module.exports = router;

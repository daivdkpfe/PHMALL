var express = require('express');
var router = express.Router();
var io = require('socket.io');
var fs = require("fs");
/* GET home page. */


router.get('/',function (req,res,next) {
    if (req.session.sign && req.session.m_id) {
        res.render('./my_fav', { title: 'PHMALL',type:req.query.type});
    }
    else
    {
        // res.render('union/product', {title: 'PHMALL',uid:req.query.uid,setp:req.query.setp});
        res.redirect('../login');//重定向
    }
});


module.exports = router;

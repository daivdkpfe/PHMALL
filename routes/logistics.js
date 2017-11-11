var express = require('express');
var router = express.Router();
var io = require('socket.io');
var fs = require("fs");

router.get('/', function(req, res, next) {
    if(req.session.sign && req.session.m_id){
       res.render('logistics', { title: 'PHMALL' }); 
    }
    else{
        res.redirect('./login');//重定向
    }
});

module.exports = router;

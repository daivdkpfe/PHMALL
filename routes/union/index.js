/**
 * Created by Administrator on 2017/9/16.
 */
var express = require('express');
var router = express.Router();
var io = require('socket.io');
var fs = require("fs");
/* GET home page. */




router.get('/', function(req, res, next) {
    if(Math.floor(req.query.uid)>0)
    {
            res.render('union/index', {title: 'PHMALL',uid:req.query.uid});

    }
    else
    {
        res.redirect('../index');//重定向
    }

});

module.exports = router;


var express = require('express');
var router = express.Router();
var io = require('socket.io');
var fs = require("fs");
/* GET home page. */



router.get('/', function(req, res, next) {
    res.render('point_list', { title: 'PHMALL' });
});

module.exports = router;

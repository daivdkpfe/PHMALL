var express = require('express');
var router = express.Router();
var io = require('socket.io');
var fs = require("fs");

router.get('/', function(req, res, next) {
    res.render('logistics', { title: 'PHMALL' });
});

module.exports = router;

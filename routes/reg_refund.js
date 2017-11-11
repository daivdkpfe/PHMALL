var express = require('express');
var router = express.Router();
var io = require('socket.io');
var fs = require("fs");
/* GET home page. */



router.get('/', function(req, res, next) {
   
    res.render('regrefund', { title: 'Express' });
    
});



module.exports = router;

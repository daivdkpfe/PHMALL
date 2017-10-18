var express = require('express');
var router = express.Router();
var io = require('socket.io');
var fs = require("fs");
/* GET home page. */



router.get('/', function(req, res, next) {

    res.render('area', { title: 'Express' });


});
router.get('/index', function(req, res, next) {
  res.render('admin/index', { title: 'Express' });
});
router.get('/setting', function(req, res, next) {
  res.render('admin/setting', { title: 'Express' });
});
module.exports = router;

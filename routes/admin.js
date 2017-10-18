var express = require('express');
var router = express.Router();
var io = require('socket.io');
var fs = require("fs");
/* GET home page. */



router.get('/', function(req, res, next) {

    async function run() {
        var a = await sqlasnyc("select * from `mvm_config` limit 1");
        console.log(a);
    }
    run();

});
router.get('/index', function(req, res, next) {
  res.render('admin/index', { title: 'Express' });
});
router.get('/setting', function(req, res, next) {
  res.render('admin/setting', { title: 'Express' });
});
module.exports = router;

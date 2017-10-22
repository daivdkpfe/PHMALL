var express = require('express');
var router = express.Router();
var io = require('socket.io');
var fs = require("fs");
/* GET home page. */



router.get('/', function(req, res, next) {

    /* async function run() {
        var a = await sqlasnyc("select * from `mvm_config` limit 1");
        console.log(a);
    }
    run(); */
    var uid=0;
    if(req.query.uid>0)
    {
      uid=req.query.uid;
    }
    res.render('supply_edit', { title: 'PHMALL',uid:uid}); 
});

module.exports = router;

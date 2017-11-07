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
    res.render('news', { title: 'PHMALL' });
});
router.post('/',function (req,res,next) {
    async function run() {
        var a = await sqlasnyc("select * from `mvm_badmin_table` where supplier_id=0 order by od desc",[]);
        var respod={
            ret:'200',
            data:a
        };
        res.json(respod);
        
    }
    run();
});
router.post('/list',function (req,res,next) {
    var ps_name=req.body.ps_name;

    async function run() {
        var badmin = await sqlasnyc("select * from `mvm_bmain` where ps_name=? and supplier_id=0 order by od desc",[ps_name]);
        badmin.forEach(function (item,index) {
            badmin[index].register_date=return_date(item.register_date);
        })
        var respod={
            ret:'200',
            data:badmin
        };
        res.json(respod);
        
    }
    run();
})
module.exports = router;

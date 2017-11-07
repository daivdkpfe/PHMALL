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
    res.render('brand', { title: 'PHMALL',cat:req.query.cat });
});
router.post('/',function (req,res,next) {
    var cat=req.body.cat;
    async function run() {
        var a = await sqlasnyc("SELECT id,brandname,logo,weburl,train FROM `mvm_brand_table` WHERE isCheck='1' AND brand_cat=? ORDER BY `id` LIMIT "+parseInt(req.body.start)+",24",[cat]);
        
        var respod={
            ret:'200',
            data:a
        };
        res.json(respod);
        
    }
    run();

})
module.exports = router;

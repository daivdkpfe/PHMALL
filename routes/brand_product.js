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
    run();*/
    res.render('brand_product', { title: 'PHMALL',cat:req.query.cat });
});
router.post('/',function (req,res,next) {

    var cat=parseInt(req.body.cat);
    var start=parseInt(req.body.start);


     async function run() {
        var brand_product = await sqlasnyc("SELECT uid,goods_name,goods_sale_price,goods_file1,goods_status,goods_stock,supplier_id,goods_hit FROM `mvm_goods_table` WHERE goods_brand=? ORDER BY register_date DESC LIMIT "+start+",15",[cat]);
         res.json(brand_product);
        }
        run();
});
router.post('/brand',function (req,res,next) {
    var cat =req.body.cat;
    console.log(cat);
     async function run() {
        var a = await sqlasnyc("SELECT id,brandname,logo,weburl,train FROM `mvm_brand_table` WHERE isCheck='1' AND id=?",[cat]);
        console.log(a);
        res.json(a);
    }
    run();
})
module.exports = router;

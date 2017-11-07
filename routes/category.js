var express = require('express');
var router = express.Router();
var io = require('socket.io');
var fs = require("fs");
/* GET home page. */




router.post('/', function(req, res, next) {
    var arr=[];
    sqlQueryMore("select category_name,category_name_ch,uid from `mvm_category` where supplier_id=0 and category_id=0",arr,function (err,category,xx) {
        if(err) logger.info("Caught exception:"+err);
        var respod={
            ret:'200',
            data:category
        };
        res.json(respod);
        
    })
});
router.get('/',function (req,res,next) {
    if(typeof(req.query.cat)=='undefined' || req.query.cat<0)
    {
        req.query.cat=0;
    }
    console.log(req.query.cat);
    res.render('category', { title: 'PHMALL',cat:req.query.cat});
});

router.post('/get_goods',function (req,res,next) {
    console.log(req.body);
    async function run() {

            var start=parseInt(req.body.start);

            if(req.body.cat==0)
            {
                var sql=[];
                var sqlstr="SELECT uid,goods_name,goods_sale_price,goods_file1,goods_status,goods_stock,supplier_id,goods_hit FROM `mvm_goods_table` ORDER BY register_date DESC LIMIT "+start+", 20";
            }
            else
            {
                var sql=[];
                var sqlstr=" SELECT uid,goods_name,goods_sale_price,goods_file1,goods_status,goods_stock,supplier_id,goods_hit FROM `mvm_goods_table` WHERE goods_cat=?  ORDER BY register_date DESC LIMIT "+start+", 20";
                sql.push(req.body.cat);
            }
            var categroy=await sqlasnyc(sqlstr,sql);
            var respod={
                ret:'200',
                data:categroy
            };
            res.json(respod);
            
    }
    run();
});
module.exports = router;

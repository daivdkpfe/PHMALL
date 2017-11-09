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
    res.render('./auction', { title: 'PHMALL'});
});

router.post('/',function (req,res,next) {
    var start=parseInt(req.body.start);
    async function run() {
         var auction = await sqlasnyc("SELECT ga.uid,ga.goods_name,ga.goods_file1,ga.goods_status,ga.supplier_id,ga.goods_hit,ga.start_date,ga.end_date, ga.end_price,ga.start_price,ga.bid_add,ga.is_complete FROM `mvm_goods_auction` ga LEFT JOIN `mvm_member_shop` ms ON ga.supplier_id=ms.m_uid WHERE ga.approval=1 AND ms.isSupplier=3 and show_status=1 AND ga.start_date<=? AND ga.end_date>=? ORDER BY ga.start_date ASC LIMIT "+start+",10",[get_now_time(),get_now_time()]);
         var respod={
            ret:'200',
            data:auction
        };
        res.json(respod);
     }
     run();
})
module.exports = router;

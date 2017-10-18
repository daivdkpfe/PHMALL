var express = require('express');
var router = express.Router();
var io = require('socket.io');
var fs = require("fs");
/* GET home page. */



router.get('/', function(req, res, next) {

    // async function run() {
    //     var a = await sqlasnyc("select * from `mvm_config` limit 1");
    //     console.log(a);
    // }
    // run();
    res.render('group_list', { title: 'PHMALL' });
});

router.post('/',function (req,res,next) {


    async function run() {
        if(req.body.cate==0)
        {
            var sqlstr='SELECT gg.uid,gg.goods_name,gg.goods_sale_price,gg.goods_file1,gg.goods_status,gg.goods_stock,gg.supplier_id, gg.goods_hit,gg.start_date,gg.end_date,ggd.goods_market_price FROM `mvm_goods_group` gg LEFT JOIN `mvm_member_shop` ms ON gg.supplier_id=ms.m_uid LEFT JOIN `mvm_goods_group_detail` ggd ON ggd.g_uid=gg.uid WHERE gg.approval=1 AND ms.isSupplier=3 AND gg.start_date<='+get_now_time()+' AND gg.end_date>='+get_now_time()+' AND gg.show_status=1 ORDER BY gg.start_date ASC LIMIT 0,20';
            var sql=[];
        }
        else
        {
            var sqlstr='SELECT gg.uid,gg.goods_name,gg.goods_sale_price,gg.goods_file1,gg.goods_status,gg.goods_stock,gg.supplier_id, gg.goods_hit,gg.start_date,gg.end_date,ggd.goods_market_price FROM `mvm_goods_group` gg LEFT JOIN `mvm_member_shop` ms ON gg.supplier_id=ms.m_uid LEFT JOIN `mvm_goods_group_detail` ggd ON ggd.g_uid=gg.uid WHERE gg.approval=1 AND ms.isSupplier=3 AND gg.start_date<='+get_now_time()+' AND gg.end_date>='+get_now_time()+' AND gg.show_status=1 AND gg.goods_cat=? ORDER BY gg.start_date ASC LIMIT 0,20';
            var sql=[];
            sql.push(req.body.cate);
        }

        var a = await sqlasnyc(sqlstr,sql);
        res.json(a);
    }
    run();

});
module.exports = router;

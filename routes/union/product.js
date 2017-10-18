/**
 * Created by Administrator on 2017/9/16.
 */
var express = require('express');
var router = express.Router();
var io = require('socket.io');
var fs = require("fs");
/* GET home page. */




router.get('/', function(req, res, next) {
    if(Math.floor(req.query.uid)>0 && Math.floor(req.query.setp)>0)
    {

            res.render('union/product', {title: 'PHMALL',uid:req.query.uid,setp:req.query.setp});


    }
    else
    {
        res.redirect('../index');//重定向
    }

});
router.post('/', function(req, res, next) {


    if(Math.floor(req.body.uid)>0 && Math.floor(req.body.setp)>0)
    {

            // 正确的反馈
            var table=goods_table[req.body.setp];
            var detail=goods_detail[req.body.setp];

            console.log(detail);
            if(typeof(table)=="undefined" || typeof(detail)=="undefined"){
                res.json("error");
                return;
            }
                // 判斷是不是undefind






            var uid=req.body.uid;
            var sql=[];

            sql.push(uid);


            sqlQueryMore("select t.*,d.* from `"+table+"` t left join `"+detail+"` d on t.uid=d.g_uid where t.uid = ?  LIMIT 1",sql,function (err,vals,xx) {
                if(err) logger.info("Caught exception:"+err);
                var sql1=[];
                if(vals.length==0)
                {
                    res.json("err");
                    return;
                }
                sql1.push(vals["0"].supplier_id);
                sqlQueryMore("select shop_name,up_logo from `mvm_member_shop` where m_uid = ?",sql1,function (errs,valss,xx) {
                    if(!errs)
                    {
                        vals[0]['shop_list']=valss[0];
                    }

                    res.json(vals);
                })

            });


    }
    else
    {
        res.json("err");
    }




});

router.post("/get_gallery",function (req,res,next) {
    var sql=[];
    sql.push(req.body.uid);
    if(typeof(goods_gallery[req.body.setp])=="undefined"){
        res.json("error");
        return;
    }
    sqlQueryMore("select * from `"+goods_gallery[req.body.setp]+"` where goods_id = ?",sql,function (err,vals,xx) {
        if(err) logger.info("Caught exception:"+err);

        res.json(vals);
    });
});//获取轮播


router.post('/get_cnxh',function (req,res,next) {
    var table=goods_table[req.body.setp];
    if(typeof(table)=="undefined"){
        res.json("error");
        return;
    }
    sql=[];
    sql.push(req.body.cat_uid);
   sqlQueryMore("SELECT * FROM `"+table+"` AS t1 JOIN (SELECT ROUND(RAND() * (SELECT MAX(uid) FROM `"+table+"`)) AS uids) AS t2 WHERE t1.uid >= t2.uids and t1."+req.body.cat+"=? ORDER BY t1.uid ASC LIMIT 4",sql,function (err,vals,xx) {
       console.log(vals);
            if(err) logger.info("Caught exception:"+err);
            res.json(vals);
   })
});

router.post("/get_comment",function (req,res,next) {
    var table=goods_table[req.body.setp];
    if(typeof(table)=="undefined"){
        res.json("error");
        return;
    }
    var sql=[];
    sql.push(req.body.uid);
    sql.push(table);


    sqlQueryMore("select * from `mvm_order_goods_comment` where g_uid=? and goods_table=?  and level=1 and module='product' order by reg_date DESC limit 1",sql,function (err,vals,xx) {
        if(err) logger.info("Caught exception:"+err);


        if(vals.length>0)
        {
            var sql1=[];
            sql1.push(vals[0]['from_id']);
            sqlQueryMore("select member_id,member_image from `mvm_member_table` where member_id=?",sql1,function (errs,valss,xxs) {
                if(errs) logger.info("Caught exception:"+errs);
                vals[0]['user_info']=valss;
                res.json(vals);
            });
        }
        else
        {
            res.json(vals);
        }

    });
});

module.exports = router;

/**
 * Created by Administrator on 2017/9/15.
 */
var express = require('express');
var router = express.Router();
var io = require('socket.io');
var fs = require("fs");
/* GET home page. */



router.post('/', function(req, res, next) {
    var result={};
    if(req.session.sign && req.session.m_id)
    {
        var uid=req.body.uid;
        var m_id=req.session.m_id;
        var sql=[];
        sql.push(uid);
        sql.push(m_id);
        sqlQueryMore("SELECT username,uid,ordersn,status,goods_rest_amount,mark,supplier_id,goods_amount,discount FROM `mvm_order_info` WHERE uid = ? AND username=? LIMIT 1",sql,function (err,val,xx) {
            if(val.length<=0)
            {
                result['status']='Fail';
                result['err']="检索不到指定订单，请联系管理员";
                res.json(result);
            }
            else
            {
                if(val[0]['status']!=3 || val[0]['status']!=4)
                {
                    sqlQueryMore("UPDATE `mvm_order_info` SET status='5' WHERE uid=? and username=?",sql,function (err,vals,xx) {
                        if(err) logger.info("Caught exception:"+err);
                        result['status']='Success';
                        result['err']="确认收货成功";
                        res.json(result);
                            // 确认收货成功了，开始插入评价

                        // 分账
                        val[0].mark |=1;
                        // 分账

                        var sql=[];
                        sql.push(val[0].supplier_id);
                        sqlQueryMore("SELECT m_uid,m_id,supplier_cat,shop_name FROM `mvm_member_shop` WHERE m_uid=? LIMIT 1",sql,function (errss,shop,xx) {
                            if(shop.length>0)
                            {
                                //商家还在
                                if(val[0].mark & 2){return}
                                val[0].mark |=2;
                                console.log(val[0].mark);
                                if(val[0].mark==6){return}
                                var expire=get_now_time()+7*24*3600;

                                var row=[];
                                row.push(val[0].username);
                                row.push(shop[0].m_id);
                                row.push(expire);
                                row.push(val[0].ordersn);
                                row.push(shop[0].shop_name);
                                row.push(val[0].supplier_id);
                                row.push(0);
                                sqlQueryMore("insert into `mvm_comment_allow` set from_id=?,to_id=?,expire=?,ordersn=?,shop_name=?,supplier_id=?,roll=?",row,function (exx,ins,xx) {
                                    if(exx) logger.info("Caught exception:"+exx);
                                });
                                var row=[];
                                row.push(shop[0].m_id);
                                row.push(val[0].username);
                                row.push(expire);
                                row.push(val[0].ordersn);
                                row.push(shop.shop_name);
                                row.push(val[0].supplier_id);
                                row.push(1);
                                sqlQueryMore("insert into `mvm_comment_allow` set from_id=?,to_id=?,expire=?,ordersn=?,shop_name=?,supplier_id=?,roll=?",row,function (errxx,ins,xx) {
                                    if(errxx) logger.info("Caught exception:"+errxx);
                                });
                                //添加评价成功了，下一步是给优惠卷了


                                if(val[0].mark & 4) {console.log('ds'); return}
                                val[0].mark |=4;
                                console.log(val[0].mark);
                                if(val[0].mark==6) {console.log("xxoo"); return}
                                var coupon_line=val[0].goods_amount-val[0].discount;
                                var sql=[];
                                sql.push(val[0].supplier_id);
                                sql.push(get_now_time());
                                sql.push(get_now_time());
                                sql.push(coupon_line);
                                sqlQueryMore("SELECT uid,supplier_id,name,start_date,end_date,discount,price_lbound FROM `mvm_coupon_cat` WHERE supplier_id=? AND start_date<=? AND end_date>=? AND handout_type='2' AND sale_price<=? ORDER BY od DESC LIMIT 1",sql,function (exxoo,coupon_cat,xx) {
                                    if(exxoo) logger.info("Caught exception:"+exxoo);
                                    if(coupon_cat.length>0)
                                    {

                                        var coupon=[];
                                        coupon.push(req.session.m_uid);
                                        coupon.push(val[0].supplier_id);
                                        coupon.push(coupon_cat[0].uid);
                                        coupon.push(coupon_cat[0].name);
                                        coupon.push(coupon_cat[0].start_date);
                                        coupon.push(coupon_cat[0].end_date);
                                        coupon.push(coupon_cat[0].discount);
                                        coupon.push(coupon_cat[0].price_lbound);
                                        coupon.push(get_now_time());
                                        
                                        sqlQueryMore('insert into `mvm_coupon` values (null,?,?,?,?,?,?,?,?,?)',coupon,function (inserr,ins,xx) {
                                    if(inserr) logger.info("Caught exception:"+inserr);
                                            sqlQueryMore('UPDATE `mvm_coupon_cat` SET member_num=member_num+1 WHERE uid='+coupon_cat[0].uid,sql,function () {
                                                
                                            });
                                        })
                                    }
                                });

                            }

                        });




















                    });
                }
                else{
                    result['status']='Fail';
                    result['err']="无法修改订单状态";
                    res.json(result);
                }
            }

        });
    }
    else
    {
        result['status']='Fail';
        result['err']="No Login";
        res.json(result);
    }
});

module.exports = router;

/**
 * Created by Administrator on 2017/9/14.
 */
var express = require('express');
var router = express.Router();
var io = require('socket.io');
var fs = require("fs");
/* GET home page. */



router.post('/', function(req, res, next) {

    if(req.session.sign && req.session.m_id)
    {
        var sql=[];
        var sqlstr="";
        sql.push(req.session.m_id);

        if(req.body.status!=0)
        {
            sql.push(req.body.status);
            sqlstr=" and o.status = ?";
        }


        sqlQueryMore("SELECT o.ordersn,o.uid,o.status,o.goods_amount,g.m_uid,g.shop_name FROM `mvm_order_info` o FORCE INDEX (`username`) left join `mvm_member_shop` g on o.supplier_id=g.m_uid WHERE username=? "+sqlstr+" ORDER BY addtime DESC LIMIT "+req.body.start+",10",sql,function (err,vals,xx){
            var i=0;//循環计数
            if(err) logger.info("Caught exception:"+err);
            if(vals.length>0)
            {
                vals.forEach(function (item,index) {
                    vals[index]['all_number']=0;
                    vals[index]['status_num']=vals[index]['status'];
                    vals[index]['status']=statusArr[item['status']];
                    var sql1=[];
                    sql1.push(item['uid']);
                    sqlQueryMore("SELECT uid,g_uid,goods_name,goods_attr,module,supplier_id,buy_price,rest_price,buy_number,buy_point,goods_table,status FROM `mvm_order_goods` where order_id=?",sql1,function (err,val,xx) {
                        if(err) logger.info("Caught exception:"+err);

                        vals[index]['goods_list']=val;
                        console.log(val);
                        val.forEach(function (items,indexs) {

                            vals[index]['all_number']=vals[index]['all_number']+items['buy_number'];
                            sql2=[];
                            sql2.push(items['g_uid']);
                            sqlQueryMore("select * from "+items['goods_table']+" where uid=?",sql2,function (err,va,xx) {
                                var ordersn=[];
                                ordersn.push(item['ordersn']);
                                console.log(item['ordersn']);
                                sqlQueryMore("select uid from `mvm_comment_allow` where ordersn=? and roll='0'",ordersn,function (acerr,allow_comment,xx) {
                                    if(acerr) logger.info("Caught exception:"+acerr);
                                    if(allow_comment.length>0)
                                    {
                                        vals[index]['allow_uid']=allow_comment[0].uid;
                                    }
                                    i++;
                                    if(va.length>0)
                                    {
                                        vals[index]['goods_list'][indexs]['goods_file']=va[0]['goods_file1'];
                                    }
                                    if(i==vals.length)
                                    {
                                        res.json(vals);
                                    }


                                });

                            });



                        });


                    });



                });
            }
            else
            {
                res.json('end');
            }




        });
    }
    else
    {
        var token_data={};
        token_data['status']='No Login';
        res.json(token_data);
    }
});
router.post('/scomment',function (req,res,next) {
    if(req.session.sign && req.session.m_id)
    {
        var sql=[];
        var sqlstr="";
        sql.push(req.session.m_id);

        if(req.body.status!=0 && req.body.status!=10)
        {
            sql.push(req.body.status);
            sqlstr=" and o.status = ?";
        }
        var comment=[];
        comment.push(req.session.m_id);
        var return_result=[];
        var ss=0;
        sqlQueryMore("SELECT uid,roll,ordersn,shop_name,to_id,supplier_id FROM `mvm_comment_allow` WHERE `from_id`=? AND roll='0' ORDER BY uid DESC LIMIT "+req.body.start+",10",comment,function (err,comments,xx) {

            if(err) logger.info("Caught exception:"+err);
            if(comments.length>0)
            {
                comments.forEach(function (itemsss,indexsss) {
                    console.log('ordersn:'+itemsss.ordersn);
                    var sql=[];
                    sql.push(itemsss.ordersn);

                    sqlQueryMore("SELECT o.uid,o.status,o.goods_amount,g.m_uid,g.shop_name FROM `mvm_order_info` o FORCE INDEX (`username`) left join `mvm_member_shop` g on o.supplier_id=g.m_uid WHERE ordersn=? "+sqlstr+" ORDER BY addtime DESC LIMIT 1",sql,function (err,vals,xx){



                        var i=0;//循環计数
                        if(err) logger.info("Caught exception:"+err);
                        console.log('vals:'+vals.ordersn);
                        if(vals.length>0)
                        {
                            vals.forEach(function (item,index) {
                                vals[index]['all_number']=0;
                                vals[index]['status_num']=vals[index]['status'];
                                vals[index]['status']=statusArr[10];
                                var sql1=[];
                                sql1.push(item['uid']);
                                sqlQueryMore("SELECT uid,g_uid,goods_name,goods_attr,module,supplier_id,buy_price,rest_price,buy_number,buy_point,goods_table,status FROM `mvm_order_goods` where order_id=?",sql1,function (err,val,xx) {
                                    if(err) logger.info("Caught exception:"+err);

                                    vals[index]['goods_list']=val;
                                    console.log(val);
                                    val.forEach(function (items,indexs) {

                                        vals[index]['all_number']=vals[index]['all_number']+items['buy_number'];
                                        sql2=[];
                                        sql2.push(items['g_uid']);
                                        sqlQueryMore("select * from "+items['goods_table']+" where uid=?",sql2,function (err,va,xx) {

                                            i++;
                                            if(va.length>0)
                                            {
                                                vals[index]['goods_list'][indexs]['goods_file']=va[0]['goods_file1'];
                                            }
                                            if(i==vals.length)
                                            {
                                                vals[0]['allow_uid']=itemsss['uid'];
                                                return_result.push(vals[0]);
                                                ss++;
                                                console.log(ss);
                                                if(ss==comments.length)
                                                {
                                                    res.json(return_result);
                                                }
                                            }
                                        });
                                    });
                                });



                            });
                        }
                        else
                        {

                        }
                    });
                })
            }
            else
            {
                res.json('end');
            }








        });
    }
    else
    {
        var token_data={};
        token_data['status']='No Login';
        res.json(token_data);
    }
});

router.get('/', function(req, res, next) {


    if (req.session.sign && req.session.m_id) {
        var status=0;
        if(req.query.status>0)
        {
            status=req.query.status;
        }
        res.render('member_order', { title: 'Express',status:status});

    }
    else
    {
        // res.render('union/product', {title: 'PHMALL',uid:req.query.uid,setp:req.query.setp});
        res.redirect('../login');//重定向
    }

});
module.exports = router;

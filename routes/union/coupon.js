/**
 * Created by Administrator on 2017/9/16.
 */
var express = require('express');
var router = express.Router();
var io = require('socket.io');
var fs = require("fs");
/* GET home page. */




router.get('/', function(req, res, next) {


        res.render('union/coupon', {title: 'PHMALL',supid:req.query.supid});

});


router.post('/',function (req,res,next) {
    async function run() {
        var sql=[];
        sql.push(req.body.supid);
        var q =await sqlasnyc("SELECT uid,name,coupon_img,handout_type,price_lbound,end_date,discount,sale_price FROM `mvm_coupon_cat` WHERE supplier_id=? ORDER BY od DESC",sql);

        for (let i in q){
                q[i]['sale_price'] = parseInt( q[i]['sale_price']);
                q[i]['end_date'] =new Date(parseInt( q[i]['end_date']) * 1000).toLocaleString().substring(0,10);
        }
        var respod={
            ret:'200',
            data:q
        };
        res.json(respod);
    }
    run();
});


router.post('/receive',function (req,res,next) {
    async function run() {
        if (req.session.sign && req.session.m_id) {
            var uid=req.body.uid;
            var sql=[];
            sql.push(uid);
            sql.push(req.body.supid);
            var coupon=await sqlasnyc("SELECT uid,name,start_date,end_date,discount,price_lbound,handout_type,sale_price FROM `mvm_coupon_cat` WHERE uid=? AND supplier_id=? LIMIT 1",sql);
            console.log(coupon);
            if(coupon==0)
            {
                var respod={
                    ret:'203',
                    data:"ERR:The specified discount coupon cannot be searched"
                };
                res.json(respod);
            }
            else
            {
                if(coupon[0].handout_type==0 || coupon[0].handout_type==1){

                    var sql=[];
                    sql.push(uid);
                    sql.push(req.session.m_uid);
                    var rtl=await sqlasnyc("SELECT uid FROM `mvm_coupon` WHERE cc_uid=? AND m_uid=? LIMIT 1",sql);
                    if(rtl!=0){
                        var respod={
                            ret:'203',
                            data:"該優惠卷已經領取"
                        };
                        res.json(respod);
                    }
                    else
                    {
                        do    //用积分阅换
                        {
                            if(coupon[0]['handout_type']!=1) break;
                            if(coupon[0]['sale_price']<=0) break;
                            // if($mvm_member['member_point']<$coupon['sale_price']) exit('ERR:Your points are not enough, Please top up first');

                            add_score(req.session.m_uid,-coupon[0]['sale_price'],'Conversion for discount coupon',"Conversion for discount coupon"+coupon[0]['name'],req.session.m_id,getClientIp(req).replace("::ffff:",""));

                            add_score(req.body.supid,coupon[0]['sale_price'],'Conversion for discount coupon',req.session.m_id+"Conversion for discount coupon"+coupon[0]['name'],req.session.m_id,getClientIp(req).replace("::ffff:",""));
                        }while (0);


                        var sql=[];
                        sql.push(req.session.m_uid);
                        sql.push(uid);
                        sql.push(coupon[0].uid);
                        sql.push(coupon[0].name);
                        sql.push(coupon[0].start_date);
                        sql.push(coupon[0].end_date);
                        sql.push(coupon[0].discount);
                        sql.push(coupon[0].price_lbound);
                        sql.push(get_now_time());

                        await sqlasnyc("insert into `mvm_coupon` set m_uid=?,supplier_id=?,cc_uid=?,name=?,start_date=?,end_date=?,discount=?,price_lbound=?,register_date=?",sql);
                        
                        var respod={
                            ret:'200',
                            data:"1"
                        };
                        res.json(respod);

                    }
                }
                else
                {
                    var respod={
                        ret:'203',
                        data:'ERR:The specified discount coupon cannot be obtained directly'
                    };
                    res.json(respod);
                }
            }
        }
        else
        {
            var respod={
                ret:'201',
                data:"no login"
            };
            res.json(respod);
        }
    }
    run();

});

module.exports = router;

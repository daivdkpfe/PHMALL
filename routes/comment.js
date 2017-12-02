//  
//                                  _oo8oo_
//                                 o8888888o
//                                 88" . "88
//                                 (| -_- |)
//                                 0\  =  /0
//                               ___/'==='\___
//                             .' \\|     |// '.
//                            / \\|||  :  |||// \
//                           / _||||| -:- |||||_ \
//                          |   | \\\  -  /// |   |
//                          | \_|  ''\---/''  |_/ |
//                          \  .-\__  '-'  __/-.  /
//                        ___'. .'  /--.--\  '. .'___
//                     ."" '<  '.___\_<|>_/___.'  >' "".
//                    | | :  `- \`.:`\ _ /`:.`/ -`  : | |
//                    \  \ `-.   \_ __\ /__ _/   .-` /  /
//                =====`-.____`.___ \_____/ ___.`____.-`=====
//                                  `=---=`
// 
//   			天灵灵，地灵灵，奉请祖师来显灵。
// 				一请莱尊二进制，二请巴贝奇创雏形。
// 				三请艾达写代码，四请诺依曼率群英。 
// 				五请阿兰俏图灵，六请里奇汤普逊。
// 				七请网络三老祖，八请盖茨广进金。
// 				九请李纳斯多开源，十请迪恩再创新。
// 				恭请bat三巨头，率领网上众水军
//  
//       ~~~~~~~Powered by https://github.com/ottomao/bugfreejs~~~~~~~
// 
//                          佛祖保佑         永无bug
//                          
/**
 * Created by Administrator on 2017/9/24.
 */
var express = require('express');
var router = express.Router();
var io = require('socket.io');
var fs = require("fs");
/* GET home page. */



router.get('/', function(req, res, next) {
    

        if (req.session.sign && req.session.m_id) {

            res.render('comment', {title: 'PHMALL',allow_uid:req.query.allow_uid});

        }
        else
        {

            res.redirect('../login');//重定向
        }

});

router.post('/',function (req,res,next) {

    var comment_allow_uid=[];
    comment_allow_uid.push(req.body.uid);
    sqlQueryMore("select roll,uid,from_id,to_id,shop_name,ordersn from `mvm_comment_allow` where roll='0' and uid=?",comment_allow_uid,function (err,comment_allow,xx) {
        if(err) logger.info("Caught exception:"+err);
        
        if(comment_allow.length>0)
        {
            sqlQueryMore('select uid from `mvm_order_info` where ordersn="'+comment_allow[0].ordersn+'"',comment_allow_uid,function (errs,orderinfo,xx) {
                if(errs) logger.info("Caught exception:"+errs);
                if(orderinfo.length>0)
                {
                    sqlQueryMore('select * from `mvm_order_goods` where order_id='+orderinfo[0].uid,comment_allow_uid,function (errss,ordergoods,xx) {

                            if(errss) logger.info("Caught exception:"+errss);
                            if(ordergoods.length>0)
                            {
                                var s=0;
                                ordergoods.forEach(function (item,index) {
                                    sqlQueryMore("select goods_name,goods_file1 from `"+item.goods_table+"`where uid="+item.g_uid,comment_allow_uid,function (errsss,goodsinfo,xx) {
                                        if(errsss) logger.info("Caught exception:"+errsss);
                                        if(goodsinfo.length>0)
                                        {
                                            ordergoods[index]['goods_name']=goodsinfo[0].goods_name;
                                            ordergoods[index]['goods_file1']=goodsinfo[0].goods_file1;
                                            comment_allow[0]['goods_list']=ordergoods;
                                            s++;
                                            if(s==ordergoods.length)
                                            {
                                                var respod={
                                                    ret:'200',
                                                    data:comment_allow
                                                };
                                                res.json(respod);
                                                
                                            }
                                        }
                                    })
                                });
                            }
                            else
                            {
                                comment_allow[0]['goods_list']="";
                                var respod={
                                    ret:'200',
                                    data:comment_allow
                                };
                                res.json(respod);
                                
                            }



                    });

                }
                else
                {
                    var respod={
                        ret:'203',
                        data:"找不到指定訂單，請聯繫管理員"
                    };
                    res.json(respod);
                    
                }
            });


        }
        else
        {
            var respod={
                ret:'203',
                data:"找不到指定訂單，請聯繫管理員"
            };
            res.json(respod);
            
        }
    });
});

router.post('/comment',function (req,res,next) {
    var data=JSON.parse(req.body.xx);
    var One=new Promise(function (resolve,reject) {

        console.log(data);
        data.goods_list.forEach(function (item,index) {

            var order_goods_uid=[];
            order_goods_uid.push(item.order_goods_uid);



            sqlQueryMore('select g_uid,module,goods_table from `mvm_order_goods` where uid=?',order_goods_uid,function (err,order_goods,xx) {
                if(err) logger.info("Caught exception:"+err);
                if(order_goods.length>0)
                {
                    var sql=[];
                    sql.push(data.from_id);
                    sql.push(data.to_id);
                    sql.push(item.comment_txt);
                    sql.push(item.level);
                    sql.push(order_goods[0].g_uid);
                    sql.push(order_goods[0].module);
                    sql.push(order_goods[0].goods_table);
                    sql.push(getClientIp(req).replace("::ffff:",""));
                    console.log(getClientIp(req).replace("::ffff:",""));
                    sql.push(get_now_time());
                    sqlQueryMore("insert into `mvm_order_goods_comment` (from_id,to_id,comment,level,g_uid,module,goods_table,ip,reg_date) value (?,?,?,?,?,?,?,?,?)",sql,function (errs,inscomment1,xx) {
                        if(errs) logger.info("Caught exception:"+errs);

                        if(index== data.goods_list.length-1)
                        {
                            console.log(1);
                            resolve('success');
                        }
                    })
                }
                else
                {
                    console.log(2);

                    if(index== data.goods_list.length-1)
                    {

                        resolve('error');
                    }
                }
            });

        });
    });
    var Two=new Promise(function (resolve,reject) {
        console.log(3);
        var shop_ins=[];
        shop_ins.push(data.from_id);
        shop_ins.push(data.to_id);
        shop_ins.push(data.roll);
        shop_ins.push(0);
        shop_ins.push(data.comment);
        shop_ins.push(get_now_time());

        console.log(5);


        sqlQueryMore('insert into `mvm_order_user_comment` (from_id,to_id,roll,level,comment,reg_date) value(?,?,?,?,?,?)',shop_ins,function (err,vals,xx) {
            console.log(4);

            if(err){
                logger.info("Caught exception:"+err);
                resolve("err");
            }
            else
            {
                var allow_uid=[];
                allow_uid.push(data.allow_uid);
                sqlQueryMore("DELETE FROM `mvm_comment_allow` WHERE uid=?",allow_uid,function (errs,ins,xx) {
                    console.log(5);

                    if(errs)
                    {    console.log(6);

                        logger.info("Caught exception:"+errs);
                        resolve("err");
                    }
                    else {
                        resolve('success');
                    }
                });
            }

        })
    });
    Promise.all([One,Two]).then(function (result) {
        if(result[0]=='success' && result[1]=='success')
        {
            var respod={
                ret:'200',
                data:'success'
            };
            res.json(respod);
            
        }
        else
        {
            var respod={
                ret:'200',
                data:'error'
            };
            res.json(respod);
            
        }
    });
});

module.exports = router;

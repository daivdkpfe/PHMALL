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
var express = require('express');
var router = express.Router();
var io = require('socket.io');
var fs = require("fs");
/* GET home page. */



router.post('/set_favorite', function(req, res, next) {
    
    if(req.session.sign && req.session.m_id) {
        var sql = [];
        sql.push(req.session.m_uid);

        sql.push(req.body.f);
        sql.push(req.body.t);

        var sqlstr = "";
        
        if (req.body.t > 0) {
            console.log("oo");

            if(typeof (req.body.module)!='undefined')
            {    console.log("zz");

                sql.push(req.body.module);
                sqlstr = " and module=? ";
            }
            else
            {
                console.log("ss");

                sql.push(favoriteModule[req.body.m]);
                sqlstr = " and module=? ";
            }

        }

        sqlQueryMore("select f_uid from `mvm_favorite` where m_uid=? and f_uid=? and t=? "+sqlstr,sql,function (err,check_favorite,xx) {
            if(err){ logger.info("Caught exception:"+err);}
            else
            {
                if(check_favorite.length>0)
                {
                    var respod={
                        ret:'200',
                        data:0
                    };
                    res.json(respod);
                    //已經收藏過了
                }
                else
                {
                    if (req.body.t > 0) {
                        if (typeof (req.body.module)!='undefined') {
                            sql.push(modules[req.body.module]);
                            console.log(req.body.module);
                            sqlstr = ",module=?,goods_table=?";
                        }
                        else
                        {
                            sql.push(goods_table[req.body.setp]);
                            sqlstr = ",module=?,goods_table=?";
                        }

                    }

                    sqlQueryMore("insert into `mvm_favorite` set m_uid=?,f_uid=?,t=?"+sqlstr,sql,function (err,ins_favorite,xx) {
                        if(err) {
                            logger.info("Caught exception:" + err);
                        }else
                        {
                            var respod={
                                ret:'200',
                                data:1
                            };
                            res.json(respod);
                            //收藏成攻
                        }
                    })
                }
            }

        })
    }
    else
    {
        var respod={
            ret:'201',
            data:0
        };
        res.json(respod);
        
    }

});
router.post('/del_favorite', function(req, res, next) {
    if(req.session.sign && req.session.m_id) {
        var sql = [];
        sql.push(req.session.m_uid);

        sql.push(req.body.f);
        sql.push(req.body.t);

        var sqlstr = "";
        if (req.body.t > 0) {
            sql.push(favoriteModule[req.body.m]);
            sqlstr = " and module=? ";
        }
    }
    sqlQueryMore("select f_uid from `mvm_favorite` where m_uid=? and f_uid=? and t=? "+sqlstr,sql,function (err,check_favorite,xx) {
        if(err){ logger.info("Caught exception:"+err);}
        else
        {
            if(check_favorite.length<0)
            {
                var respod={
                    ret:'200',
                    data:0
                };
                res.json(respod);
                //已經沒了
            }
            else
            {
                if (req.body.t > 0) {
                    sql.push(goods_table[req.body.setp]);
                    sqlstr = "and module=? and goods_table=?";
                }
                sqlQueryMore("delete from `mvm_favorite` where m_uid=? and f_uid=? and t=?"+sqlstr,sql,function (err,ins_favorite,xx) {
                    if(err) {
                        logger.info("Caught exception:" + err);
                    }else
                    {
                        var respod={
                            ret:'200',
                            data:1
                        };
                        res.json(respod);
                        //刪除成功
                    }
                })
            }
        }

    })
});
router.post('/check_favorite', function(req, res, next) {
    if(req.session.sign && req.session.m_id)
    {
        var sql=[];
        sql.push(req.session.m_uid);

        sql.push(req.body.f);
        sql.push(req.body.t);
        var sqlstr="";
        if(req.body.t>0)
        {
            sql.push(favoriteModule[req.body.m]);
            sqlstr=" and module=? ";
        }

        sqlQueryMore("select f_uid from `mvm_favorite` where m_uid=? and f_uid=? and t=? "+sqlstr,sql,function (err,check_favorite,xx) {
            if(err){ logger.info("Caught exception:"+err);}
            else
            {
                if(check_favorite.length>0)
                {
                    var respod={
                        ret:'200',
                        data:1
                    };
                    res.json(respod);
                   
                }
                else
                {
                    var respod={
                        ret:'200',
                        data:0
                    };
                    res.json(respod);
                   
                }
            }

        })
    }
    else
    {
        var respod={
            ret:'201',
            data:result
        };
        res.json(0);
    }

});
router.post('/get_favorite',function (req,res,next) {

    // t=类型，1商品。0店铺
    // num=获取数量
    // s=开始数量
    if(parseInt(req.body.s)>0)
    {
       var s=parseInt(req.body.s);
    }
    else
    {
        var s=0;
    }
    if(req.body.ism==1)
    {
        var sqlstr='and module=?';
    }
    else
    {
        var sqlstr="";
    }




    if(req.body.m==null)
    {

        var m='product';
    }
    else
    {
        var m=req.body.m;
    }

    async function run() {
        var sql=[];
        sql.push(req.session.m_uid);
        sql.push(req.body.t);
        sql.push(m);
        var favorite=await sqlasnyc("select * from `mvm_favorite` where m_uid=? and t=? "+sqlstr+" limit "+s+", "+parseInt(req.body.num),sql);
        if(req.body.t==1)
        {
            for (let i in favorite)
            {
                var sql=[];
                sql.push(favorite[i].f_uid);
                var goods=await sqlasnyc("select goods_name,goods_file1,goods_sale_price from `"+favorite[i]['goods_table']+"` where uid =? limit 1",sql);
                favorite[i].goods_type=0;
                goods_table.forEach(function (item,index) {
                    if(favorite[i].goods_table==item)
                    {
                        favorite[i].goods_type=index;
                    }
                })
                favorite[i].goods_table="";
                favorite[i].goods_name=goods[0].goods_name;
                favorite[i].goods_sale_price=goods[0].goods_sale_price;
                favorite[i].goods_file1=goods[0].goods_file1;


            }
        }
        else
        {
            for (let i in favorite)
            {
                var sql=[];
                sql.push(favorite[i].f_uid);
                var shop=await sqlasnyc("select m_uid,shop_level,up_logo,shop_name,xb_money from `mvm_member_shop` where m_uid =? and shop_step>0 limit 1",sql);
                if(shop.length>0)
                {
                    favorite[i].goods_table="";
                    favorite[i].shop_name=shop[0].shop_name;
                    favorite[i].shop_level=shop[0].shop_level;
                    favorite[i].shop_logo=shop[0].up_logo;
                    favorite[i].xb=shop[0].xb_money;
                }

            }
        }
        var respod={
            ret:'200',
            data:favorite
        };
        res.json(respod);
        
    }
    run();

});




module.exports = router;

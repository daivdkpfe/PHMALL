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



router.post('/', function(req, res, next) {

    async function run() {

        var cart_list = await sqlasnyc("SELECT uid,cart_price,supplier_id,rest_price,cart_point,g_uid,cart_num,goods_table,module,attr,g_type refer_g_uid FROM `mvm_cart_table` WHERE m_id='"+req.session.m_id+"' order by supplier_id");
        for(let i in cart_list){//遍历每条数据

            var sql=[];
            sql.push(cart_list[i].supplier_id);
            console.log(cart_list[i].supplier_id);
            var supplier = await sqlasnyc("select * from `mvm_member_shop` where m_uid=? limit 1",sql);
            cart_list[i].shop_name=supplier[0].shop_name;
            cart_list[i].shop_uid=supplier[0].m_uid;

            var sql=[];
            sql.push(cart_list[i].g_uid);
            var goods= await sqlasnyc("select goods_name,goods_file1 from `"+cart_list[i].goods_table+"` where uid=? limit 1",sql);
            cart_list[i].goods_table="";
            cart_list[i].goods_name=goods[0].goods_name;
            cart_list[i].goods_file1=goods[0].goods_file1;


            var attr=cart_list[i].attr.split("|");
            var attr_txt="";
            attr.forEach(function (item,index) {
                attr_txt=attr_txt+" "+item;
            });
            cart_list[i].attr=attr_txt;
        }
        var s="";
        var shop_uid=-1;
        for (let i in cart_list)
        {

            if(cart_list[i].shop_uid !=shop_uid)
            {
                console.log("uid=："+shop_uid+",eles="+cart_list[i].shop_uid);
                console.log("1");
                if(shop_uid!=-1)
                {
                    s=s+"|";
                    s=s+i+",";
                    shop_uid=cart_list[i].shop_uid;
                }
                else
                {
                    console.log(0);
                    s=s+i+",";
                    shop_uid=cart_list[i].shop_uid;

                }
            }
            else
            {
                s=s+i+",";
                shop_uid=cart_list[i].shop_uid;

            }

        }
        s.replace(",|","|");
        var ss=s.split("|");
        var arr=[];
        ss.forEach(function (item,index) {
           var sss=item.split(",");
           var arrs=[];
           sss.forEach(function (items,indexs) {
               if(items!="")
               {

                   arrs.push(cart_list[items]);
               }
           });
           arr.push(arrs);
        });

        var respod={
            ret:'200',
            data:arr
        };
        res.json(respod);
        
    }
    if (req.session.sign && req.session.m_id) {
        run();
    }
    else
    {
        var respod={
            ret:'201',
            data:"no login"
        };
        res.json(respod);
        
    }
});
router.post('/detele',function (req,res,next) {
    console.log("aa");
    async function runs() {

        var sql=[];
        console.log("xx");
        sql.push(req.session.m_id);
        console.log("oo");

        sql.push(req.body.uid);
        console.log("pp");

        var detele=sqlasnyc('delete from `mvm_cart_table` where m_id=? and uid=?',sql);
        var respod={
            ret:'200',
            data:1
        };
        res.json(respod);
        
    }




    if (req.session.sign && req.session.m_id) {
        console.log("xxxoo");
        runs();
    }
    else
    {
        
        var respod={
            ret:'201',
            data:"no login"
        };
        res.json(respod);
        
    }
});
router.get("/",function (req,res,next) {
    if (req.session.sign && req.session.m_id) {
        res.render('cart', { title: 'PHMALL' });
    }
    else
    {
        res.redirect('./login');//重定向
    }
});
router.post('/add',function (req,res,next) {
    var goods_num = parseInt(req.body.goods_num);


    var goods_price = parseFloat(req.body.goods_price);


    var attr = req.body.attr;


    var g_uid = parseInt(req.body.g_uid);


    var setp = parseInt(req.body.setp);
    var gt=goods_table[setp];

    var gd=goods_detail[setp];
    var g_types=g_type[setp];
    var modules=favoriteModule[setp];


    async function run() {


            var sql=[];
            sql.push(g_uid);
            var g_d=await sqlasnyc("select * from `"+gd+"` where g_uid=? limit 1",[g_uid]);
            var g_t=await sqlasnyc("select * from `"+gt+"` where uid=? limit 1",[g_uid]);


            var zz=g_d[0].attr_store;
            zz=zz.match(attr);
            zz=zz[0];

            var store=zz.split("|");
            var storeLength=store.length;
            if(store[storeLength-1]<goods_num)
            {
                var respod={
                    ret:'200',
                    data:-2
                };
                res.json(respod);
                
            }
            else
            {
               
                var cart_price=parseFloat(g_t[0].goods_sale_price)+parseFloat(store[storeLength-2]);



                switch (g_t[0].type)
                {
                    case 2:
                        var arr_wholesale_price=unserialize(g_d[0].wholesale_price);

                        if(!arr_wholesale_price){
                            break;
                        }

                        arr_wholesale_price.forEach(function (item,index) {
                            item[0]=parseInt(item[0]);
                            item[1]=parseInt(item[1]);
                            item[2]=parseFloat(item[2]);
                            if(item[1]==-1) {
                                if(goods_num>=item[0])
                                {
                                        cart_price=item[2];

                                }

                            }
                            else
                            {
                                if(item[0]<=goods_num && item[1]>=goods_num)
                                {
                                    cart_price=item[2];

                                }
                            }
                        })
                        console.log("cart_price : ="+cart_price);
                        break;
                    case 3:
                       var  member=await sqlasnyc("select member_class from `mvm_member_table` where uid =?",[req.session.m_uid]);
                       var member_class=[];
                       member_class.push(g_t[0].supplier_id);
                       member_class.push(member[0].member_class);
                       var grade=await sqlasnyc("select * from `mvm_grade_discount` where supplier_id =? and group_id=?",member_class);
                       console.log('cart_price:'+cart_price);
                        if(grade!=0)
                        {
                            cart_price=cart_price*parseInt(grade[0].discount);
                        }
                        break;
                }
                console.log(cart_price);




                var cart_point=0;


                var sql=[];
                sql.push(req.session.m_id);
                sql.push(g_uid);
                sql.push(gt);
                sql.push(g_types);
                sql.push(req.body.attr_txt+store[storeLength-2]);
                var cart=await sqlasnyc("select * from `mvm_cart_table` where m_id=? and g_uid=? and goods_table=? and g_type=? and attr=?",sql);
                if(cart!=0)
                {
                    var respod={
                        ret:'200',
                        data:1
                    };
                    res.json(respod);
                    //加入成功，其实购物车已经有这个了
                }
                else
                {
                    var sql=[];
                    sql.push(req.session.m_id);
                    sql.push(g_uid);
                    sql.push(cart_price);
                    sql.push(cart_point);
                    sql.push(goods_num);
                    sql.push(req.body.attr_txt+store[storeLength-2]);
                    sql.push(g_types);
                    sql.push(gt);
                    sql.push(modules);
                    sql.push(get_now_time());
                    sql.push(g_t[0].supplier_id);
                    var s=await sqlasnyc('insert into `mvm_cart_table` set m_id=?,g_uid=?,cart_price=?,cart_point=?,cart_num=?,attr=?,g_type=?,goods_table=?,module=?,register_date=?,supplier_id=?',sql);
                    var respod={
                        ret:'200',
                        data:1
                    };
                    res.json(respod);
                    //加入成功
                }

            }




    }
    if (req.session.sign && req.session.m_id) {
        if (goods_num <= 0) {
            var respod={
                ret:'200',
                data:-1
            };
            res.json(respod);
            //商品数量不对
        }
        else
        {
            run();
        }

    }
    else
    {
        var respod={
            ret:'201',
            data:-3
        };
        res.json(respod);
        
    }




});
module.exports = router;

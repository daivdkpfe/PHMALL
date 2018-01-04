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



router.get('/', function (req, res, next) {

    /* async function run() {
        var a = await sqlasnyc("select * from `mvm_config` limit 1");
        console.log(a);
    }
    run(); */
    var type = "new";

    if (typeof (req.query.type) != 'undefined') {
        type = req.query.type;
    }
    res.render('share', {
        title: 'PHMALL',
        type: type
    });
});
router.post('/', function (req, res, next) {
    let m_uid=-1;
    if(req.session.m_uid){
        m_uid=req.session.m_uid;
    }
    var type = req.body.type;
    var start = parseInt(req.body.start);
    var sqlstr = '';
    if (type == 'new') {
        sqlstr = ' order by register_date desc ';
    } else if (type == 'hot') {
        sqlstr = ' ORDER BY LOVE desc';
    }

    async function run() {
        var order_share = await sqlasnyc("select * from `mvm_order_share`" + sqlstr + " limit " + start + ",20");
        for (let i in order_share) {
            order_share[i].pics = unserialize(order_share[i].pics);
            // 序列化图片
            if (order_share[i].pics.length <= 0) {
                var goods = await sqlasnyc("select goods_file1 from `" + order_share[i].goods_table + "` where uid =? limit 1", [order_share[i].g_uid]);
                if (goods != 0) {
                    order_share[i].pics = [];
                    order_share[i].pics.push('union/' + goods[0].goods_file1);
                    console.log(goods[0].goods_file1);
                }
            }
            // 如果没有图片，给他商品图

            if (order_share[i].m_uid > 0) {
                var member_table = await sqlasnyc("select member_id,member_image from `mvm_member_table` where uid=? limit 1", [order_share[i].m_uid]);
                if(m_uid>0){
                    var is_friend = await sqlasnyc('select uid from `mvm_friend` where member_uid=? and belong_uid=?',[order_share[i].m_uid,m_uid]);
                    if(is_friend.length>0){
                        order_share[i].is_friend='1';
                    }
                    else{
                        order_share[i].is_friend='0';
                    }
                }
                else{
                    order_share[i].is_friend='0';
                }
                if (member_table != 0) {
                    console.log("id:" + member_table[0].member_id);
                    order_share[i].member_id = member_table[0].member_id;
                    order_share[i].member_image = member_table[0].member_image;
                } else {
                    order_share[i].member_id = 'null';
                }

            }
            // 获取用户头像和用户名
            goods_table.forEach(function(item,index) {
                if(item==order_share[i].goods_table)
                {
                    order_share[i].url="./union/product?setp="+index+"&uid=";
                }
            }, this);
        }
        var respod={
            ret:'200',
            data:order_share
        };
        res.json(respod);
        
    }
    run();
});
router.post('/detail', function (req, res, next) {
    let m_uid=-1;
    if(req.session.m_uid){
        m_uid=req.session.m_uid;
    }
    let uid=req.body.uid;
    async function run() {
        var count = await sqlasnyc('select count(*) as count from `mvm_order_share`');
        var order_share = await sqlasnyc("select * from `mvm_order_share` where uid=?",[uid]);
        for (let i in order_share) {
            order_share[i].pics = unserialize(order_share[i].pics);
            // 序列化图片
            if (order_share[i].pics.length <= 0) {
                var goods = await sqlasnyc("select goods_file1 from `" + order_share[i].goods_table + "` where uid =? limit 1", [order_share[i].g_uid]);
                if (goods != 0) {
                    order_share[i].pics = [];
                    order_share[i].pics.push('union/' + goods[0].goods_file1);
                    console.log(goods[0].goods_file1);
                }
            }
            // 如果没有图片，给他商品图

            if (order_share[i].m_uid > 0) {
                var member_table = await sqlasnyc("select member_id,member_image from `mvm_member_table` where uid=? limit 1", [order_share[i].m_uid]);
                if(m_uid>0){
                    var is_friend = await sqlasnyc('select uid from `mvm_friend` where member_uid=? and belong_uid=?',[order_share[i].m_uid,m_uid]);
                    if(is_friend.length>0){
                        order_share[i].is_friend='1';
                    }
                    else{
                        order_share[i].is_friend='0';
                    }
                }
                else{
                    order_share[i].is_friend='0';
                }
                if (member_table != 0) {
                    console.log("id:" + member_table[0].member_id);
                    order_share[i].member_id = member_table[0].member_id;
                    order_share[i].member_image = member_table[0].member_image;
                } else {
                    order_share[i].member_id = 'null';
                }

            }
            // 获取用户头像和用户名
            goods_table.forEach(function(item,index) {
                if(item==order_share[i].goods_table)
                {
                    order_share[i].url="./union/product?setp="+index+"&uid=";
                }
            }, this);
        }
        var respod={
            ret:'200',
            data:order_share,
            coutn:count[0].count
        };
        res.json(respod);  
    }
    run();
});
router.post('/love',function(req,res,next){
    var uid=req.body.uid;
    if(parseInt(uid)>0)
    {
        async function run() {
            await sqlasnyc("update `mvm_order_share` set love=love+1 where uid =?",[uid]);
            var respod={
                ret:'200',
                data:"1"
            };
            res.json(respod);
        }
        run();
    }
    else{
        res.json(0);
    }
   
});
router.post('/friend',function(req,res,next){
    var uid=parseInt( req.body.uid);
    var m_uid=req.session.m_uid;
    if(uid==m_uid)
    {
        var respod={
            ret:'200',
            data:0
        };
        res.json(respod);
        
        return;
        
    }
    async function run() {
        if(uid>0)
        {
            var member=await sqlasnyc("select member_id from `mvm_member_table` where uid=?",[uid]);
            if(member!=0)
            {
                var friend = await sqlasnyc("select * from `mvm_friend` where member_uid=? and belong_uid=? limit 1",[uid,m_uid]);
                if(friend==0)
                {
                    await sqlasnyc('insert into `mvm_friend` set member_id=?,member_uid=?,belong_uid=?,register_date=?',[member[0].member_id,uid,m_uid,get_now_time()]);
                    var respod={
                        ret:'200',
                        data:1
                    };
                    res.json(respod);
                    
                }
                else{
                    var respod={
                        ret:'200',
                        data:0
                    };
                    res.json(respod);
                    
                }
            }
            else{
                var respod={
                    ret:'200',
                    data:0
                };
                res.json(respod);
            }
            
        }
        
        
    }
    if(req.session.sign)
    {
        run();
    }
    else{
        res.json({
            ret:'201',
            data:0
        })
    }
});
module.exports = router;
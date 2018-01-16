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



router.get('/', function(req, res, next) {

    /*async function run() {
        var a = await sqlasnyc("select * from `mvm_config` limit 1");
        console.log(a);
    }
    run();*/
    if(req.session.sign && req.session.m_id)
    {
        res.render('address_add', { title: 'PHMALL',uid:req.query.uid});
    }
    else
    {
        res.redirect('../login');//重定向
    }
});

router.post('/',function (req,res,next) {
    var uid=req.body.uid;
    var m_uid=req.session.m_uid;
    async function run() {
        if(req.session.sign && req.session.m_id)
        {
            var address=await sqlasnyc('select * from `mvm_address` where uid=? and m_uid=?',[uid,m_uid]);
            
                var respod={
                    ret:'200',
                    data:address
                };
                res.json(respod);
                
            
        }
        else
        {
            var respod={
                ret:'201',
                data:{}
            };
            res.json(respod);
            
        }
    }
    run();
});
router.post('/edit',function (req,res,next) {




    var uid=req.body.uid;
    var consignee=req.body.consignee;
    var address=req.body.address;
    var zipcode=req.body.zipcode;
    var mobile=req.body.mobile;
    var province=req.body.province;
    var city=req.body.city;
    var county=req.body.county;
    var m_uid=req.session.m_uid;

    async function run() {

        var count=await sqlasnyc('select uid from `mvm_address` where m_uid=?',[m_uid]);
        console.log(count.length);
        if(count.length<4 && uid>0)
        {
            
        }
        else{
            var respod={
                ret:'206',
                data:'-1'
            };
            res.json(respod);
            return;
        }
        
        var sqlStr='';
        var sql=[];
        sql.push(uid);
        sql.push(consignee);
        sql.push(address);
        sql.push(zipcode);
        sql.push(mobile);
        sql.push(province);
        sql.push(city);
        sql.push(county);
        sql.push(m_uid);
        if(uid>0){
            var is_buy=await sqlasnyc('select is_buy from `mvm_address` where uid=? and is_buy=1',[uid]);
            if(is_buy.length>0){
                sqlStr=",is_buy=?";
                sql.push(1);
            }
        }
        await sqlasnyc('replace into `mvm_address` set uid=?,consignee=?,address=?,zipcode=?,mobile=?,province=?,city=?,county=?,m_uid=?'+sqlStr,sql);
        var respod={
            ret:'200',
            data:'1'
        };
        res.json(respod);
        
    }
    run();
})

module.exports = router;

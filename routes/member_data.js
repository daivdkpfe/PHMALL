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

   /* async function run() {
        var a = await sqlasnyc("select * from `mvm_config` limit 1");
        console.log(a);
    }
    run();*/
    if (req.session.sign && req.session.m_id) {
        res.render('member_data', {title: 'PHMALL', m_uid: req.session.m_uid, m_id: req.session.m_id});
    }
    else
    {
        res.redirect('../login');//重定向
    }
});
router.post('/',function (req,res,next) {

     async function run() {
         if (req.session.sign && req.session.m_id) {
             var sql = [];
             sql.push(req.session.m_uid);
             sql.push(req.session.m_id);
             var member_data = await sqlasnyc("select uid,member_id,member_class,member_id,member_name,member_sex,member_birthday,member_tel1,member_email,member_zip,province,city,county,member_address,member_image from `mvm_member_table` where uid=? and member_id=? limit 1", sql);
             console.log(member_data[0].member_birthday);
             member_data[0].member_birthday = return_date(member_data[0].member_birthday);
             var respod={
                ret:'200',
                data:member_data
            };
            res.json(respod);
            
         }
         else
         {
            var respod={
                ret:'201',
                data:'no login'
            };
            res.json(respod);
            
         }
   }
   run();
});

router.post('/edit',function (req,res,next) {
    async function run() {
        var sql=[];

        sql.push(req.body.val);
        sql.push(req.session.m_uid);
        sql.push(req.session.m_id);
        var key=[];
        key['a']='member_address';
        key['s']='member_sex';
        key['b']='member_birthday';
        key['p']='province';
        key['c']='city';
        key['cc']='county';
        key['z']='member_zip';
        await sqlasnyc("update `mvm_member_table` set "+key[req.body.key]+"=? where uid=? and member_id=?",sql);
        var respod={
            ret:'200',
            data:1
        };
        res.json(respod);
        
    }
    run();
});

module.exports = router;

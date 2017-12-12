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
    var post=req.body;
    var session=req.session;
   async function run() {
      var oauth=await sqlasnyc('select * from `mvm_member_oauth` where type=? and oauth_uid=?',[post.type,post.oauth_uid]);
      if(oauth==0){
        var respond={
          ret:200,
          data:0
        }
        res.json(respond);
      }
      else{
        var member=await sqlasnyc('select member_id from `mvm_member_table` where uid=?',[oauth[0].m_uid]);
        if(member!=0){
          session.sign=true;
          session.m_uid=mmeber[0].uid;
          session.m_id=member[0].member_id;
            var respond={
              ret:200,
              data:1
            }
            res.json(respond);
        }
        else{
          var respond={
            ret:200,
            data:0
          }
          res.json(respond);
        }
      }
   }
   run();
   var setmember=function(member_uid,member_id){
      req.session.sign=true;
      req.session.m_uid=member_uid;
      req.session.m_id=member_id;
    }
});//授权


router.post('/login',function (req,res,next) {
});

router.get('/',function(req,res,next){
    res.render('./oauth_login',{title:"PHMALL"})
})

module.exports = router;


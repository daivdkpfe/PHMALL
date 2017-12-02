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

  if(req.session.sign)
  {
    var vals=[];
    vals[0]=[];
    vals[0]['m_uid']="None";
    vals[0]['m_id']="None";
    vals[0]['register_time']="None";
    vals[0]['token']="None";
    vals[0]['status']='Logined';


    var respod={
      ret:'200',
      data:vals
  };
  res.json(respod);
    
  }


  var status={};
  var token=req.body.token;
  var m_uid=req.body.m_uid;
  var m_id=req.body.m_id;

  //查数据库看看是哪个已绑定的用户

  sqlQueryMore("SELECT * FROM  `oauth_login` WHERE  `m_uid` =? AND  `m_id` =  ? AND  `token`= ? AND  `type` =1",[m_uid,m_id,token],function (err,vals,xx) {


    if(err){
      logger.info("SELECT * FROM  `oauth_login` WHERE  `m_uid` =? AND  `m_id` =  ? AND  `token`= ? AND  `type` =1"+"    "+[m_uid,m_id,token]);
    }//查詢出錯。記錄日誌
    else
    {

      if(vals.length>0)
      {
        vals[0]['uid']=undefined;
        vals[0]['type']=undefined;
        vals[0]['status']='Success';
      }
      else
      {
        var vals=[];
        vals[0]=[];
        vals[0]['m_uid']="None";
        vals[0]['m_id']="None";
        vals[0]['register_time']="None";
        vals[0]['token']="None";
        vals[0]['status']='Fail';
      }


      var respod={
        ret:'200',
        data:vals[0]
    };
    res.json(respod);
     
    }
  });//看看是哪个用户
});//授权


router.post('/login',function (req,res,next) {

  if(req.session.sign)
  {
    var vals=[];
    vals[0]=[];
    vals[0]['m_uid']="None";
    vals[0]['m_id']="None";
    vals[0]['register_time']="None";
    vals[0]['token']="None";
    vals[0]['status']='Logined';


    var respod={
      ret:'200',
      data:vals
  };
  res.json(respod);
    
  }


  var sqldata=[];


  var username=req.body.username;
  var password=req.body.password;
  var md5data=(md5(password));
  var base64=new Buffer(password).toString('base64');


  sqldata.push(username);
  sqldata.push(md5data);
  sqldata.push(base64);


  var QueryOne=new Promise(function (resolve,reject) {
    sqlQueryMore("select * from `mvm_member_table` where member_id=? and member_pass=? and base_pass=?",sqldata,function (err,vals,xxx) {
        if(err) {
          logger.info("select * from `mvm_member_table` where member_id=? and member_pass=? and base_pass=?"+"    "+sqldata);
          logger.info("Caught exception:"+err);
        }
        resolve(vals);
    });
  });

  QueryOne.then(function (results) {
    if(results.length!=0)
    {

      var token=generateMixed(32);//生成token


      var token_data={};
      token_data['m_id']=results[0]['member_id'];//用户ID
      token_data['m_uid']=results[0]['uid'];//用户UID
      token_data['register_time']=results[0]['register_date'];//获取当前时间戳
      token_data['token']=token;
      token_data['status']="Success";



      var insdata=[];
      insdata.push(token_data['m_uid']);
      insdata.push(token_data['m_id']);
      insdata.push(token_data['token']);
      insdata.push(token_data['register_time']);


        sqlQueryMore("insert into `english`.`oauth_login` (`m_uid`, `m_id`, `token`, `type`, `register_time`) VALUES ( ?, ?, ?, '1', ?);",insdata,function (err,vals,xx) {
          if(err)//插入失败，一般是因为token重复了
          {
            logger.info("insert into `english`.`oauth_login` (`m_uid`, `m_id`, `token`, `type`, `register_time`) VALUES ( ?, ?, ?, '1', ?);"+"    "+insdata);
             // logger.info("Caught exception:"+err);
            token_data['m_id']='None';//用户ID
            token_data['m_uid']='None';//用户UID
            token_data['register_time']='None';//获取当前时间戳
            token_data['token']='None';
            token_data['status']="Fail";
            //失败后把token归0
          }
          else
          {
            token_data['telphone']=results[0]['member_tel1'];
            token_data['email']=results[0]['member_email'];
          }


          var respod={
            ret:'200',
            data:token_data
        };
        res.json(respod);
        
        });//插入数据库
    }
    else
    {
      var token_data=[];
      token_data['m_id']='None';//用户ID
      token_data['m_uid']='None';//用户UID
      token_data['register_time']='None';//获取当前时间戳
      token_data['token']='None';
      token_data['status']="Fail";


      var respod={
        ret:'200',
        data:token_data
    };
    res.json(respod);
      
    }
  });

});//登录


module.exports = router;

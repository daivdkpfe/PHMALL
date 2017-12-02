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

  /*  async function run() {
        var a = await sqlasnyc("select * from `mvm_config` limit 1");
        console.log(a);
    }
    run();*/

    if (req.session.sign && req.session.m_id) {
        res.render('change_phone', { title: 'PHMALL' });
    }
    else
    {
        res.redirect('../login');//重定向
    }

});
router.post('/',function (req,res,next) {
    if(req.body.setp==1)
    {

        async function run() {
            if (req.session.sign && req.session.m_id) {
                var member=await sqlasnyc('select member_email from `mvm_member_table` where uid=? and member_id=?',[req.session.m_uid,req.session.m_id]);
                if(member!=0)
                {
                    var jieguo=false;
                    var rnd=generateMixed(8);
                    SendEmail(member[0].member_email,'PHMALL:My Website,My Decision .Let\'s Create Your Own Online Shop !.Verification code for email modification',
                        '<div style="background:rgb(251,250,222);\n' +
                        '                    width:100%;\n' +
                        '                    height:600px;">\n' +
                        '                <div style="width:400px;height:400px;margin:0 auto;background:white;border:100px solid rgb(251,250,222);">\n' +
                        '                    <p style="text-align: left;\n' +
                        '                    width:300px;\n' +
                        '                    line-height: 30px;\n' +
                        '\n' +
                        '                    margin:10px;\n' +
                        '                    margin-left:30px;\n' +
                        '                    float: left;">Your Verication code for changing Basic information is  '+rnd+' . Please enter code and click SAVE</p>\n' +
                        '                &nbsp;\n' +
                        '\n' +
                        '                <p style="text-align: left;\n' +
                        '                    width:300px;\n' +
                        '                    line-height: 30px;\n' +
                        '\n' +
                        '                    margin:10px;\n' +
                        '                    margin-left:30px;\n' +
                        '                    float: left;">Thank you</p>\n' +
                        '\n' +
                        '                <p><br />\n' +
                        '                <br />\n' +
                        '                <br />\n' +
                        '                <br />\n' +
                        '\n' +
                        '                &nbsp;</p>\n' +
                        '\n' +
                        '                <p>&nbsp;</p>\n' +
                        '\n' +
                        '                <p style="text-align: right;\n' +
                        '                    width:300px;\n' +
                        '                    line-height: 30px;\n' +
                        '\n' +
                        '                    margin:10px;\n' +
                        '                    margin-left:30px;\n' +
                        '                    float: left;">From:PHMALL</p>\n' +
                        '                </div>\n' +
                        '                </div>\n' +
                        '                    ',function (result) {

                                if(result.indexOf("请求成功")>0)
                                {

                                    jieguo=true;
                                    var sql=[];

                                    sql.push(req.session.m_id);
                                    sql.push(rnd);
                                    sql.push(member[0].member_email);
                                    sql.push(get_now_time());


                                    sqlQueryMore('replace `mvm_lostpass` set user_id=?,lost_type=2,lost_str=?,info=?,lost_time=?',sql,function (err,val,xx) {
                                        if(err)  logger.info("Caught exception:"+err);
                                        var respod={
                                            ret:'200',
                                            data:1
                                        };
                                        res.json(respod);
                                        
                                    })
                                }
                                else
                                {
                                    var respod={
                                        ret:'200',
                                        data:0
                                    };
                                    res.json(respod);
                                   
                                }
                        });



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
            else
            {
                var respod={
                    ret:'201',
                    data:0
                };
                res.json(respod);
                
            }

        }
            run();

    }
    else if(req.body.setp==2)
    {
          async function run() {
              if (req.session.sign && req.session.m_id){
                  var lostpass=await sqlasnyc('select * from `mvm_lostpass` where user_id=? and lost_type=2 and lost_str=?',[req.session.m_id,req.body.code]);
                  if(lostpass!=0)
                  {
                      await sqlasnyc("DELETE FROM `mvm_lostpass` WHERE user_id=? AND lost_type='2'",[req.session.m_id]);
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
              else
              {
                var respod={
                    ret:'201',
                    data:0
                };
                res.json(respod);
                
              }

          }
            run();
    }
    else if(req.body.setp==3)
    {
       
          async function run() {

              var send_code=await sqlasnyc("select uid from `mvm_send_code` where end_time>? and type=1 and phone_number=? and code=?",[get_now_time(),'63'+req.body.phone,req.body.code]);
              if(send_code!=0)
              {
                  //進行修改
                  await sqlasnyc('update `mvm_member_table` set member_tel1=? where uid=? and member_id=?',[req.body.phone,req.session.m_uid,req.session.m_id]);
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
        run();
    }
});
router.post('/send',function (req,res,next) {
    var phone=req.body.phone;
    async function run() {
        if (req.session.sign && req.session.m_id) {

            SendCode(phone,1,function (result) {
                var respod={
                    ret:'200',
                    data:result
                };
                res.json(respod);
                
            })

        }
    }
    run();

});
module.exports = router;

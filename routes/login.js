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
 * Created by Administrator on 2017/9/12.
 */
var express = require('express');
var router = express.Router();
var io = require('socket.io');
var fs = require("fs");

/* GET home page. */


router.post('/', function(req, res, next) {
    
    if(req.session.sign)
    {
        var token_data = {};
        token_data['m_id'] = "None";//用户ID
        token_data['m_uid'] = "None";//用户UID
        token_data['register_time'] = "None"//注册时间
        token_data['status'] = "Logined";
        var respod={
            ret:'200',
            data:token_data
        };
        res.json(respod);
        
    }
    else
    {

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
        if(results.length!=0) {

            var token_data = {};
            token_data['m_id'] = results[0]['member_id'];//用户ID
            token_data['m_uid'] = results[0]['uid'];//用户UID
            token_data['register_time'] = results[0]['register_date']//注册时间
            token_data['status'] = "Success";
            req.session.sign = true;
            req.session.m_id = results[0]['member_id'];
            req.session.m_uid=results[0]['uid'];
            console.log(req.session.m_id);
        }
        else
        {
            var token_data = {};
            token_data['m_id'] = "None";//用户ID
            token_data['m_uid'] = "None";//用户UID
            token_data['register_time'] = "None";//注册时间
            token_data['status'] = "Fail";
        }
        var respod={
            ret:'200',
            data:token_data
        };
        res.json(respod);
        
        });
});

router.post('/login_out',function (req,res,next) {
    if(req.session.sign)
    {
        req.session.sign=false;
        req.session.m_id=null;
        req.session.m_uid=null;
        var ret={};
        ret.status='success';
        ret.err='';
        var respod={
            ret:'200',
            data:ret
        };
        res.json(respod);
        
    }
    else
    {
        var ret={};
        ret.status='error';
        ret.err='No login';
        var respod={
            ret:'200',
            data:ret
        };
        res.json(respod);
        
    }
});


router.get('/', function(req, res, next) {
    res.render('login', { title:'PHMALL' });
});

router.post('/bind', function(req, res, next) {
    
    if(req.session.sign)
    {
        var token_data = {};
        token_data['m_id'] = "None";//用户ID
        token_data['m_uid'] = "None";//用户UID
        token_data['register_time'] = "None"//注册时间
        token_data['status'] = "Logined";
        var respod={
            ret:'200',
            data:token_data
        };
        res.json(respod);
        
    }
    else
    {

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
            sqlQueryMore("INSERT INTO `mvm_member_oauth` (`m_uid`, `oauth_uid`, `token`, `type`) VALUES ( ?, ?, ?,?)",[vals[0].uid,req.body.oauth_uid,req.body.token,req.body.type] , function (err, valss, xx) {
                if(err){
                    logger.info("INSERT INTO `mvm_member_table` (`member_class`, `member_id`, `member_pass`, `base_pass`,  `member_tel1`, `register_date`) VALUES ('1', ?, ?, ?, ?, ?)" + "    " + insdata);
                }
                resolve(vals);
            });
           
        });
    });

    QueryOne.then(function (results) {
        if(results.length!=0) {

            var token_data = {};
            token_data['m_id'] = results[0]['member_id'];//用户ID
            token_data['m_uid'] = results[0]['uid'];//用户UID
            token_data['register_time'] = results[0]['register_date']//注册时间
            token_data['status'] = "Success";
            req.session.sign = true;
            req.session.m_id = results[0]['member_id'];
            req.session.m_uid=results[0]['uid'];
            console.log(req.session.m_id);
        }
        else
        {
            var token_data = {};
            token_data['m_id'] = "None";//用户ID
            token_data['m_uid'] = "None";//用户UID
            token_data['register_time'] = "None";//注册时间
            token_data['status'] = "Fail";
        }
        var respod={
            ret:'200',
            data:token_data
        };
        res.json(respod);
        
        });
});
module.exports = router;

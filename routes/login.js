/**
 * Created by Administrator on 2017/9/12.
 */
var express = require('express');
var router = express.Router();
var io = require('socket.io');
var fs = require("fs");

/* GET home page. */


router.post('/', function(req, res, next) {
    console.log(req.session.sign);
    if(req.session.sign)
    {
        var token_data = {};
        token_data['m_id'] = "None";//用户ID
        token_data['m_uid'] = "None";//用户UID
        token_data['register_time'] = "None"//注册时间
        token_data['status'] = "Logined";
        res.json(token_data);
    }
    else
    {

    }

    var sqldata=[];


    var username=req.body.username;
    var password=req.body.password;
    console.log(username);
    console.log(password);
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
        res.json(token_data);
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
        res.json(ret);
    }
    else
    {
        var ret={};
        ret.status='error';
        ret.err='No login';
        res.json(ret);
    }
});


router.get('/', function(req, res, next) {
    res.render('login', { title: lanuage_ch });
});

module.exports = router;

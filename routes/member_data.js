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
             res.json(member_data);
         }
         else
         {
             res.json('no login');
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
        res.json(1);
    }
    run();
});

module.exports = router;

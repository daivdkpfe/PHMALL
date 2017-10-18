var express = require('express');
var router = express.Router();
var io = require('socket.io');
var fs = require("fs");
/* GET home page. */



router.get('/', function(req, res, next) {

    // async function run() {
    //     var a = await sqlasnyc("select * from `mvm_config` limit 1");
    //     console.log(a);
    // }
    // run();
    if (req.session.sign && req.session.m_id) {
        res.render('change', { title: 'PHMALL' });
    }
    else
    {
        res.redirect('../login');//重定向
    }


});
router.post('/',function (req,res,next) {


    var m_uid=req.session.m_uid;
    var m_id=req.session.m_id;
    var md5_pass1=md5(req.body.pass1);
    var base_pass1=new Buffer(req.body.pass1).toString('base64');
    var md5_pass2=md5(req.body.pass2);
    var base_pass2=new Buffer(req.body.pass2).toString('base64');
    async function run() {
        if (req.session.sign && req.session.m_id) {
            var sql=[];
            sql.push(m_uid);
            sql.push(m_id);
            var member=await sqlasnyc('select member_pass,base_pass from `mvm_member_table` where uid =? and member_id=?',sql);
            if(member!=0)
            {
                if(member[0].member_pass==md5_pass1 && member[0].base_pass==base_pass1)
                {
                    //原密碼正確
                    var sql=[];
                    sql.push(md5_pass2);
                    console.log(md5_pass2);
                    sql.push(base_pass2);
                    sql.push(m_uid);
                    sql.push(m_id);
                    sql.push(md5_pass1);
                    sql.push(base_pass1);
                    console.log(sql);
                    var update_pass=await sqlasnyc("update `mvm_member_table` set member_pass=? , base_pass=? where uid=? and member_id=? and member_pass=? and base_pass=?",sql);
                    console.log(update_pass);
                    res.json(1);
                }
                else
                {
                    res.json(0);
                }
            }
            else
            {
                res.json(0);
            }
        }
        else
        {
            res.json('no login');
        }
    }
    run();

})
module.exports = router;

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
    res.render('buy_detail', { title: 'PHMALL',uid:req.query.uid});

});

router.post('/',function (req,res,next) {
    var uid=req.body.uid;
    async function run() {
        var detail=await sqlasnyc('select * from `mvm_want_buy` where uid=? and approval_date>0',[uid]);
        if(detail!=0)
        {
            var member=await sqlasnyc('select member_id,member_image from `mvm_member_table` where uid=?',[detail[0].m_uid]);
            detail[0].member_id=member[0].member_id;
            detail[0].member_image=member[0].member_image;
        }

        
        var respod={
            ret:'200',
            data:detail
        };
        res.json(respod);
        
     }
     run();
});
router.post('/submit',function (req,res,next) {
    if(req.session.sign && req.session.m_id)
    {


        var name=req.body.name;
        var tel=req.body.tel;
        var address=req.body.address;
        var msg=req.body.msg;
        var m_id=req.session.m_id;
        var buy_id=req.body.buy_uid;
        var buy_m_uid=req.body.buy_m_uid;
        var sql=[];
        sql.push(m_id);
        sql.push(buy_id);
        sql.push(buy_m_uid);
        sql.push(name);
        sql.push(tel);
        sql.push(address);
        sql.push(msg);
        sql.push(get_now_time());
        async function run() {
            var a = await sqlasnyc("insert into `mvm_want_buy_msg` set m_id=?,buy_id=?,buy_m_uid=?,name=?,tel=?,address=?,msg=?,register_date=?",sql);
            var respod={
                ret:'200',
                data:1
            };
            res.json(respod);
            
        }
        run();
    }
    else
    {
        var respod={
            ret:'201',
            data:0
        };
        res.json(respod);
        
    }
})
module.exports = router;

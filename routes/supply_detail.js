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
    res.render('supply_detail', { title: 'PHMALL',uid:req.query.uid});

});

router.post('/',function (req,res,next) {
    var uid=req.body.uid;
    async function run() {
        var detail=await sqlasnyc('select * from `mvm_want_supply` where uid=?',[uid]);
        if(detail!=0)
        {
            var member=await sqlasnyc('select member_id,member_image from `mvm_member_table` where uid=?',[detail[0].m_uid]);
            detail[0].member_id=member[0].member_id;
            detail[0].member_image=member[0].member_image;
        }

        console.log(detail);
        res.json(detail);
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
        var supply_id=req.body.supply_uid;
        var supply_m_uid=req.body.supply_m_uid;
        var sql=[];
        sql.push(m_id);
        sql.push(supply_id);
        sql.push(supply_m_uid);
        sql.push(name);
        sql.push(tel);
        sql.push(address);
        sql.push(msg);
        sql.push(get_now_time());
        async function run() {
            var a = await sqlasnyc("insert into `mvm_want_supply_msg` set m_id=?,supply_id=?,supply_m_uid=?,name=?,tel=?,address=?,msg=?,register_date=?",sql);
            res.json(1);
        }
        run();
    }
    else
    {
        res.json(0);
    }
})
module.exports = router;

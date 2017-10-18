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
    if(req.session.sign && req.session.m_id)
    {
        res.render('address_add', { title: 'PHMALL',uid:req.query.uid});
    }
    else
    {
        res.redirect('../login');//重定向
    }
});

router.post('/',function (req,res,next) {
    var uid=req.body.uid;
    var m_uid=req.session.m_uid;
    async function run() {
        if(req.session.sign && req.session.m_id)
        {
            var address=await sqlasnyc('select * from `mvm_address` where uid=? and m_uid=?',[uid,m_uid]);
            if(address=='0')
            {
                res.json(0);
            }
            else
            {
                res.json(address);
            }
        }
        else
        {
            res.json(0);
        }
    }
    run();
});
router.post('/edit',function (req,res,next) {




    var uid=req.body.uid;
    var consignee=req.body.consignee;
    var address=req.body.address;
    var zipcode=req.body.zipcode;
    var mobile=req.body.mobile;
    var province=req.body.province;
    var city=req.body.city;
    var county=req.body.county;
    var m_uid=req.session.m_uid;

    async function run() {

        var count=await sqlasnyc('select uid from `mvm_address` where m_uid=?',[m_uid]);
        console.log(count.length);
        if(count.length>2)
        {
            res.json(-1);
            return;
        }


        var sql=[];
        sql.push(uid);
        sql.push(consignee);
        sql.push(address);
        sql.push(zipcode);
        sql.push(mobile);
        sql.push(province);
        sql.push(city);
        sql.push(county);
        sql.push(m_uid);
        await sqlasnyc('replace into `mvm_address` set uid=?,consignee=?,address=?,zipcode=?,mobile=?,province=?,city=?,county=?,m_uid=?',sql);
        res.json(1);
    }
    run();
})

module.exports = router;



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
    run(); */
    res.render('sms', { title: 'PHMALL' });
});
router.post('/',function(req,res,next){
     async function run() {
        if (req.session.sign && req.session.m_id) {
            var m_id=req.session.m_id;
            var m_uid=req.session.m_uid;
        var sql="SELECT uid,from_id,to_id,title,reg_date,content FROM `mvm_sms` WHERE is_broadcast='0' AND to_id=? AND to_del='0' ORDER BY uid DESC";
        var sms=await sqlasnyc(sql,[m_id]);
        var respod={
            ret:'200',
            data:sms
        }
        res.json(respod);
        }
        else
        {
            var respod = {
                ret: '201',
                data:{}
            };
            res.json(respod);
        }
    }
    
    
    run();
})
module.exports = router;

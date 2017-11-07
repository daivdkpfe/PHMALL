var express = require('express');
var router = express.Router();
var io = require('socket.io');
var fs = require("fs");
/* GET home page. */



router.get('/', function(req, res, next) {
    var uid=req.query.uid;
    async function run() {
         await sqlasnyc("update `mvm_bmain` set board_hit= board_hit+1 where uid=?",[uid]);
    }
    run();
    res.render('news_detail', { title: 'PHMALL',uid:req.query.uid});
});

router.post('/',function (req,res,next) {
    var uid=req.body.uid;
    async function run() {
        var bamin=await sqlasnyc('select * from `mvm_bmain` where uid=? limit 1',[uid]);
        if(bamin==0)
        {
            var respod={
                ret:'200',
                data:0
            };
            res.json(respod);
            
        }
        else
        {
            bamin[0].register_date=return_date(bamin[0].register_date);
            var after=await sqlasnyc('select uid,board_subject from `mvm_bmain` where uid>? limit 1',[uid]);
            bamin[2]=after;
            var before=await sqlasnyc('select uid,board_subject from `mvm_bmain` where uid<?  order by uid desc limit 1',[uid]);
            bamin[1]=before;
            var respod={
                ret:'200',
                data:bamin
            };
            res.json(respod);
        }
    }
    run();

})
module.exports = router;

/**
 * Created by Administrator on 2017/9/22.
 */
var express = require('express');
var router = express.Router();
var io = require('socket.io');
var fs = require("fs");
/* GET home page. */



router.get('/', function (req, res, next) {
    if (req.session.sign && req.session.m_id) {
        res.render('member_index', {
            title: 'PHMALL',
            login: req.session.sign,
            m_id: req.session.m_id
        });
    } else {
        // res.render('union/product', {title: 'PHMALL',uid:req.query.uid,setp:req.query.setp});
        res.render('member_index', {
            title: 'PHMALL',
            login: false,
            m_id: null
        });
    }
});

router.post('/get_member_info', function (req, res, next) {
    var sql = [];
    if (req.session.sign && req.session.m_id) {
        sql.push(req.session.m_uid);
        sqlQueryMore('select * from `mvm_member_table` where uid=?', sql, function (err, vals, xx) {
            if (err) logger.info("Caught exception:" + err);
            res.json(vals);
        });
        
    } 
    else {
        var rets=[];
        rets.push({status:0})
        res.json(rets);
    }

});


module.exports = router;
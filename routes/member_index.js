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
            var respod={
                ret:'200',
                data:vals
            };
            res.json(respod);
        });
        
    } 
    else {
        var rets=[];
        rets.push({status:0});
        var respod={
            ret:'201',
            data:rets
        };
        res.json(respod);
        
    }

});


module.exports = router;
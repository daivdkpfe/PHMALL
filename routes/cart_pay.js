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
var express = require('express');
var router = express.Router();
var io = require('socket.io');
var fs = require("fs");
var array_keys=require('locutus/php/array/array_keys');
var http = require('http');
var querystring = require('querystring');
router.post('/',function(req,res,next){
    /* if (req.session.sign && req.session.m_id) {
        var str_cart_uids=req.body.cart_uids;
        var buy_arr={};
            buy_arr.req={};
            buy_arr.req.sign=req.session.sign;
            buy_arr.req.m_id=req.session.m_id;
            buy_arr.req.m_uid=req.session.m_uid;
            buy_arr.str_uids=str_cart_uids;
            console.log('xxxxx');
        cart_to_order(buy_arr.req,buy_arr.str_uids);
    } */

    if (req.session.sign && req.session.m_id) {
       
        const http = require('http');  
  
    var data = req.body;
    data.api=1;
    data.m_check_uid=req.session.m_uid;
    data.m_check_id=req.session.m_id;
    var postData = require('querystring').stringify(data);    
    console.log( postData );    
    
        function form()  
        {  
            var options = {    
                method: "POST",    
                host: "localhost",    
                port: 80,    
                path: "/english/cart.php?action=pay",    
                headers: {    
                    "Content-Type": 'application/x-www-form-urlencoded',    
                    "Content-Length": postData.length    
                }    
            };    
            
            var body = '';   
            var request = http.request( options, function(ress) {    
                // show results    
                console.log('STATUS: ' + ress.statusCode);      
                ress.setEncoding('utf8');    
                ress.on('data', function(chunk) {    
                    body += chunk;  
                    console.log('BODY: ' + chunk);
                });    
            
                ress.on('end', function(err) {    
                    console.log( 'complete.');

                    res.json({ret:'200',data:body}); 
                });    
            });    
                request.on("error", function(e) {    
                    console.log('upload Error: ' + e.message);    
                })    
            
            request.write( postData );  
            request.end();
        }  
    
    form();  
    }

});
module.exports = router;
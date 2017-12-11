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
/* GET home page. */

router.post('/', function (req, res, next) {
    var m_id = req.body.user;
    var m_email = req.body.email;
    async function run() {

        var member = await sqlasnyc('select uid,member_id,member_email from `mvm_member_table` where member_id=? and member_email=?', [m_id, m_email]);
        if (member == 0) {
            res.render('./errors', {
                title: 'PHMALL',
                type: '您的账户可能未绑定邮箱'
            });
            return;
        } else {
            var rnd = get_num(6);
            var mail_content = m_id + ": Retrieve password<br />";
            mail_content += "User ID :  " + m_id + "<br />";
            mail_content += "Password modification link >>>：<a href=\"http://127.0.0.1:88/findpass?action=set&login_id=" + urlencode(m_id) + "&str=" + rnd + "\" target=\"_blank\">Click here to reset shopping mall user password</a><br />";//邮件文本


            var lost=await sqlasnyc('select * from `mvm_lostpass` where user_id=? and lost_type=1',[m_id]);
            if(lost==0){
                await sqlasnyc('replace into `mvm_lostpass` set user_id=?,lost_type=1,lost_str=?,lost_time=?', [member[0].member_id, rnd, get_now_time()]);
            }
           else{
                await sqlasnyc('replace into `mvm_lostpass` set user_id=?,lost_type=1,lost_str=?,lost_time=?,lost_id=?', [member[0].member_id, rnd, get_now_time(),lost[0].lost_id]);            
           }
            SendEmail(member[0].member_email, "PHMALL Retrieve password", '<div style="background:rgb(251,250,222);width:100%;height:600px;"><div style="width:400px;height:400px;margin:0 auto;background:white;border:100px solid rgb(251,250,222);"><p style="text-align: left;width:300px;line-height: 30px;margin:10px;margin-left:30px;float: left;">' + mail_content + '</p>&nbsp;<p style="text-align: left;width:300px;line-height: 30px;margin:10px;margin-left:30px;float: left;">Thank you</p><p><br /><br /><br /><br />&nbsp;</p><p>&nbsp;</p><p style="text-align: right;width:300px;line-height: 30px;margin:10px;margin-left:30px;float: left;">From:PHMALL</p></div></div>', function (result) {
                res.render('./success', {
                    title: 'PHMALL',
                    type: '发送成功'
                })
            });
        }
    }
    run();

});
router.post('/set', function (req, res, nenxt) {
    var login_id = req.body.login_id;
    var str = req.body.str;
    var pass = req.body.pass;
    async function run() {
        var lost = await sqlasnyc('select * from `mvm_lostpass` where user_id=? and lost_str=? and lost_time<? and lost_type=1', [login_id,str,get_now_time()]);
        if(lost==0){
            //找不到这个用户，返回报错页面
            res.render('./Second_errors',{title:"PHMALL",type:"您的链接错误，请联系管理员"});
        }
        else{
            //找到这个用户了,修改密码
            await sqlasnyc('update `mvm_member_table` set member_pass=?,base_pass=? where member_id=?',[md5(pass),new Buffer(pass).toString('base64'),login_id]);
            await sqlasnyc('delete from `mvm_lostpass` where lost_id=?',[lost[0].lost_id]);
            res.render('./Second_success',{title:'PHMALL',type:"修改成功,请重新登录"});
        }

    }
    run();
})
router.get('/', function (req, res, next) {
    if (req.query.action == "set") {
        var login_id=req.query.login_id;
        var str= req.query.str;

        async function run() {
            var lost=await sqlasnyc('select * from `mvm_lostpass` where lost_type=1 and lost_str=? and lost_id=? and lost_time<?',[str,login_id,get_now_time+600]);
            {
                if(lost==0){
                    res.render('./errors', {
                        title: 'PHMALL',
                        type: '找不到記錄，請重新申請'
                    });
                }
                else{
                    res.render('./setpass', {
                        title: 'PHMALL',
                        login_id: req.query.login_id,
                        str: req.query.str
                    });
                }
            }
        }
        run();
    } else {
        res.render('./findpass', {
            title: 'PHMALL'
        });
    }
});
module.exports = router;
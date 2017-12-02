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

/* GET users listing. */
router.get('/:m_uid/:m_id/:fun/:lan', function(req, res, next) {
    if(req.params.m_uid%1==0)
    {

    }
    else
    {
        var arr={};
        arr[0]="數據不對";


        var respod={
            ret:'200',
            data:arr
        };
        res.json(respod);
    }
    //数据格式对的话继续往下
    //获取用户的信息
    if(req.params.fun=="get_user_info")//获取用户信息
    {
        var m_uid=req.params.m_uid-0;
        var m_id=req.params.m_id;
        var sqlArr=[];
        sqlArr.push(m_uid);
        sqlArr.push(m_id);
        var QueryOne=new Promise(function (resolve,reject) {
           sqlQueryMore("select member_id,member_tel1,member_email,member_point,member_image from `mvm_member_table` where uid= ? and member_id=?",sqlArr,function (err,vals,fields) {
               resolve(vals);
           })
        });
        var sqlArr=[];
        sqlArr.push(m_id);

        var QueryTwo=new Promise(function (resolve,reject) {
            sqlQueryMore("SELECT COUNT(*) AS cnt_fk FROM `mvm_order_info` FORCE INDEX (`username_2`) WHERE username=? AND status=1",sqlArr,function (err,vals,fields) {
                resolve(vals);
            })
        });

        var QueryThree=new Promise(function (resolve,reject) {
            sqlQueryMore("SELECT COUNT(*) AS cnt_fh FROM `mvm_order_info` FORCE INDEX (`username_2`) WHERE username=? AND status=3",sqlArr,function (err,vals,fields) {
                resolve(vals);
            })
        });

        var QueryFour=new Promise(function (resolve,reject) {
            sqlQueryMore("SELECT COUNT(*) AS cnt_sh FROM `mvm_order_info` FORCE INDEX (`username_2`) WHERE username=? AND status=4",sqlArr,function (err,vals,fields) {
                resolve(vals);
            })
        });

        var QueryFive=new Promise(function (resolve,reject) {
            sqlQueryMore("SELECT COUNT(*) AS cnt_pj FROM `mvm_comment_allow` WHERE from_id=? AND roll='0'",sqlArr,function (err,vals,fields) {
                resolve(vals);
            })
        });




        Promise.all([QueryOne,QueryTwo,QueryThree,QueryFour,QueryFive])
            .then(function (results) {
                if(results[0].length<=0)
                {
                    results="數據錯誤";
                }


                var respod={
                    ret:'200',
                    data:results
                };
                res.json(respod);
        })
    }
    else
    {
        // res.status("501").end();
    }
});




module.exports = router;

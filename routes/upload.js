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
var formidable = require('formidable');
/* GET home page. */





router.post('/logo_upload', function(req, res, next) {
    if (req.session.sign && req.session.m_id) {



        // AVATAR_UPLOAD_FOLDER =config.web_src;
        AVATAR_UPLOAD_FOLDER = config.web_src;
        var form = new formidable.IncomingForm(); //创建上传表单
        form.encoding = 'utf-8'; //设置编辑
        form.uploadDir = AVATAR_UPLOAD_FOLDER; //设置上传目录
        form.keepExtensions = true; //保留后缀
        form.maxFieldsSize = 2 * 1024 * 1024; //文件大小

        form.parse(req, function(err, fields, files) {

            if (err) {
                res.locals.error = err;

                return;
            }

            var extName = ''; //后缀名
            switch (files.thumbnail.type) {
                case 'image/pjpeg':
                    extName = 'jpg';
                    break;
                case 'image/jpeg':
                    extName = 'jpg';
                    break;
                case 'image/png':
                    extName = 'png';
                    break;
                case 'image/x-png':
                    extName = 'png';
                    break;
            }
            console.log('ext:' + extName);
            if (extName.length == 0 || extName == "" || extName == null) {
                res.redirect('../error?type=upload');
                return;
            }

            var avatarName = Math.random() + '.' + extName;
            var newPath = form.uploadDir + avatarName;
            fs.renameSync(files.thumbnail.path, newPath); //重命名
            console.log(avatarName);
            var m_uid = req.session.m_uid;
            sqlQueryMore('update `mvm_member_table` set member_image=?', ['member/' + avatarName, m_uid], function(err, val, xx) {
                res.redirect('../success?type=upload');
            });
        });




    } else {
        // res.render('union/product', {title: 'PHMALL',uid:req.query.uid,setp:req.query.setp});
        res.redirect('../login'); //重定向
    }
});

router.post('/refund_upload', function(req, res, next) {
    console.log('get:' + req.query);
    console.log('post:' + req.body);

    if (req.session.sign && req.session.m_id) {



        // AVATAR_UPLOAD_FOLDER =config.web_src;
        AVATAR_UPLOAD_FOLDER = config.web_src;
        var form = new formidable.IncomingForm(); //创建上传表单
        form.encoding = 'utf-8'; //设置编辑
        form.uploadDir = AVATAR_UPLOAD_FOLDER; //设置上传目录
        form.keepExtensions = true; //保留后缀
        form.maxFieldsSize = 2 * 1024 * 1024; //文件大小

        form.parse(req, function(err, fields, files) {

            if (err) {
                res.locals.error = err;

                return;
            }

            var extName = ''; //后缀名

            console.log(files.file);
            switch (files.file.type) {
                case 'image/pjpeg':
                    extName = 'jpg';
                    break;
                case 'image/jpeg':
                    extName = 'jpg';
                    break;
                case 'image/png':
                    extName = 'png';
                    break;
                case 'image/x-png':
                    extName = 'png';
                    break;
            }
            console.log('ext:' + extName);
            if (extName.length == 0 || extName == "" || extName == null) {
                res.redirect('../error?type=upload');
                return;
            }

            var avatarName = Math.random() + '.' + extName;
            var newPath = form.uploadDir + avatarName;
            fs.renameSync(files.file.path, newPath); //重命名
            var m_uid = req.session.m_uid;
            res.json(avatarName);
            // sqlQueryMore('update `mvm_member_table` set member_image=?',['member/'+avatarName,m_uid],function (err,val,xx) {
            //     res.redirect('../success?type=upload');
            // });
        });




    } else {
        // res.render('union/product', {title: 'PHMALL',uid:req.query.uid,setp:req.query.setp});
        res.redirect('../login'); //重定向
    }
});
router.post('/share_img_upload', function(req, res, next) {


    if (req.session.sign && req.session.m_id) {



        // AVATAR_UPLOAD_FOLDER =config.web_src;
        AVATAR_UPLOAD_FOLDER = config.share_img_src;
        var form = new formidable.IncomingForm(); //创建上传表单
        form.encoding = 'utf-8'; //设置编辑
        form.uploadDir = AVATAR_UPLOAD_FOLDER; //设置上传目录
        form.keepExtensions = true; //保留后缀
        form.maxFieldsSize = 2 * 1024 * 1024; //文件大小

        form.parse(req, function(err, fields, files) {

            if (err) {
                res.locals.error = err;
                return;
            }

            var extName = ''; //后缀名

            console.log(files.file);
            switch (files.file.type) {
                case 'image/pjpeg':
                    extName = 'jpg';
                    break;
                case 'image/jpeg':
                    extName = 'jpg';
                    break;
                case 'image/png':
                    extName = 'png';
                    break;
                case 'image/x-png':
                    extName = 'png';
                    break;
            }
            if (extName.length == 0 || extName == "" || extName == null) {
                res.redirect('../error?type=upload');
                return;
            }

            var avatarName = Math.random() + '.' + extName;
            var newPath = form.uploadDir + avatarName;
            fs.renameSync(files.file.path, newPath); //重命名
            var m_uid = req.session.m_uid;
            res.json(avatarName);
            // sqlQueryMore('update `mvm_member_table` set member_image=?',['member/'+avatarName,m_uid],function (err,val,xx) {
            //     res.redirect('../success?type=upload');
            // });
        });
    } else {
        // res.render('union/product', {title: 'PHMALL',uid:req.query.uid,setp:req.query.setp});
        res.redirect('../login'); //重定向
    }
});
module.exports = router;
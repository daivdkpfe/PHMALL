var express = require('express');
var router = express.Router();
var io = require('socket.io');
var fs = require("fs");
var formidable = require('formidable');
/* GET home page. */





router.post('/logo_upload', function(req, res, next) {










    if (req.session.sign && req.session.m_id) {



        // AVATAR_UPLOAD_FOLDER =config.web_src;
        AVATAR_UPLOAD_FOLDER=config.web_src;
        var form = new formidable.IncomingForm();   //创建上传表单
        form.encoding = 'utf-8';		//设置编辑
        form.uploadDir = AVATAR_UPLOAD_FOLDER;	 //设置上传目录
        form.keepExtensions = true;	 //保留后缀
        form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

        form.parse(req, function(err, fields, files) {

            if (err) {
                res.locals.error = err;

                return;
            }

            var extName = '';  //后缀名
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
            console.log('ext:'+extName);
            if(extName.length == 0 || extName=="" || extName==null){
                res.redirect('../error?type=upload');
                return;
            }

            var avatarName = Math.random() + '.' + extName;
            var newPath = form.uploadDir + avatarName;
            fs.renameSync(files.thumbnail.path, newPath);  //重命名
            console.log(avatarName);
            var m_uid=req.session.m_uid;
            sqlQueryMore('update `mvm_member_table` set member_image=?',['member/'+avatarName,m_uid],function (err,val,xx) {
                res.redirect('../success?type=upload');
            });
        });




    }
    else
    {
        // res.render('union/product', {title: 'PHMALL',uid:req.query.uid,setp:req.query.setp});
        res.redirect('../login');//重定向
    }
});

module.exports = router;

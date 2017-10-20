var express = require('express');
var router = express.Router();
var io = require('socket.io');
var fs = require("fs");
var formidable = require('formidable');
/* GET home page. */





router.post('/logo_upload', function(req, res, next) {



    // AVATAR_UPLOAD_FOLDER =config.web_src;
    AVATAR_UPLOAD_FOLDER='./public/files/';
    var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';		//设置编辑
    form.uploadDir = AVATAR_UPLOAD_FOLDER;	 //设置上传目录
    form.keepExtensions = true;	 //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

    form.parse(req, function(err, fields, files) {


        console.log(files);
        res.json(files);

        console.log('------------------------------------------------------');
        if (err) {
            res.locals.error = err;
            console.log('exxor');
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

        if(extName.length == 0){
            res.locals.error = '只支持png和jpg格式图片';

            return;
        }

        var avatarName = Math.random() + '.' + extName;
        var newPath = form.uploadDir + avatarName;
        fs.renameSync(files.thumbnail.path, newPath);  //重命名
        console.log(newPath);

    });






    /*if (req.session.sign && req.session.m_id) {



        var src=config.web_src;


        var form = new multiparty.Form({uploadDir: './public/files/'});


        form.parse(req, function(err, fields, files) {
            var filesTmp = JSON.stringify(files, null, 2);

            if (err) {
                console.log('parse error: ' + err);
            } else {
                console.log('parse files: ' + filesTmp);
                var inputFile = files.inputFile[0];
                var uploadedPath = inputFile.path;
                var dstPath = './public/files/' + inputFile.originalFilename;
                //重命名为真实文件名
                fs.rename(uploadedPath, dstPath, function (err) {
                    if (err) {
                        console.log('rename error: ' + err);
                    } else {
                        console.log('rename ok');
                    }
                });
            }

            res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
            res.write('received upload:\n\n');
            res.end(util.inspect({fields: fields, files: filesTmp}));
        })



    }
    else
    {
        // res.render('union/product', {title: 'PHMALL',uid:req.query.uid,setp:req.query.setp});
        res.redirect('../login');//重定向
    }*/
});

module.exports = router;

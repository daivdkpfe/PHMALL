

app.use(express.bodyParser({uploadDir: './uploads'}));
var router = express.Router();
var io = require('socket.io');
var fs = require("fs");
/* GET home page. */

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


router.post('/logo_upload', function(req, res, next) {


    console.log(req.body, req.files);













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

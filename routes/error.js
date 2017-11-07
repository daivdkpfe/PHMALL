var express = require('express');
var router = express.Router();
/* GET home page. */


var sess={
    upload:'上传失败，不支持的类型',
    noknow:'未知错误'
};



router.get('/', function(req, res, next) {
    res.render('errors', { title:'PHMALL',type: sess[req.query.type]});
});

module.exports = router;

var express = require('express');
var router = express.Router();
/* GET home page. */


var sess={
    upload:'上传成功'
};



router.get('/', function(req, res, next) {
    res.render('success', { type: sess[req.query.type],title:'PHMALL'});
});

module.exports = router;

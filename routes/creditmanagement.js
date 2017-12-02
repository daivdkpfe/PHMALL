var express = require('express');
var router = express.Router();
var io = require('socket.io');
var fs = require("fs");
/* GET home page. */



router.get('/', function(req, res, next) {
    res.render('creditmanagement', { title: 'PHMALL' });
});

router.post('/',function(req,res,next){
  async function run() {
      var statistics = await sqlasnyc("select * from `mvm_member_statistics` where m_uid=1 and m_id='admin' limit 1");

      statistics[0].comment_data=unserialize(statistics[0].comment_data);
      var respond={
        ret:200,
        data:statistics
      }
      res.json(respond);
  }
  run();
})
/* router.get('/index', function(req, res, next) {
  res.render('admin/index', { title: 'Express' });
});
router.get('/setting', function(req, res, next) {
  res.render('admin/setting', { title: 'Express' });
}); */
module.exports = router;
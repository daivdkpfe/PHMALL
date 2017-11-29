var express = require('express');
var router = express.Router();
var io = require('socket.io');
var fs = require("fs");
/* GET home page. */



router.post('/status', function(req, res, next) {
    if (req.session.sign && req.session.m_id) {
        var respond = {
            ret: '200'
        }
        res.json(respond);
    } else {
        var respond = {
            ret: '201'
        }
        res.json(respond);
    }
})
module.exports = router;
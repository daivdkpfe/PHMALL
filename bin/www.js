/**
 * Module dependencies.
 */


var app = require('../app');
var debug = require('debug')('phmall:server');
var http = require('http');
var mysql = require('mysql');
var socketio = require('socket.io');
var crypto = require('crypto');
var Memcached = require('memcached');
var log4js = require('log4js');
var request = require('request');
var zlib = require('zlib');
global.lang_ch = require('../lanuage/lanuage_ch');
global.lang_en = require("../lanuage/lanuage_en");
global.buy_arr = {};


global.memcached = new Memcached('127.0.0.1:11211');
global.unserialize = require('locutus/php/var/unserialize');
global.serialize = require('locutus/php/var/serialize');
global.in_array = require('locutus/php/array/in_array');
global.intval = require('locutus/php/var/intval')
global.trim = require('locutus/php/strings/trim');
global.array_keys=require('locutus/php/array/array_keys');



global.goods_table = new Array();
goods_table[0] = "xx";
goods_table[1] = "mvm_goods_table";
goods_table[2] = "mvm_goods_onsale";
goods_table[3] = "mvm_goods_group";
goods_table[4] = 'mvm_goods_auction';
goods_table[5] = 'mvm_goods_change';

global.goods_detail = new Array();
goods_detail[0] = "xx";
goods_detail[1] = "mvm_goods_detail";
goods_detail[2] = "mvm_goods_onsale_detail";
goods_detail[3] = "mvm_goods_group_detail";
goods_detail[4] = "mvm_goods_auction_detail";
goods_detail[5] = "mvm_goods_change_detail";


global.goods_gallery = new Array();
goods_gallery[0] = "xx";
goods_gallery[1] = "mvm_gallery";
goods_gallery[2] = "mvm_onsale_gallery";
goods_gallery[3] = "mvm_group_gallery";
goods_gallery[4] = "mvm_auction_gallery";
goods_gallery[5] = "mvm_auction_change";
var haveLogin = new Array();


global.modules = new Array();
modules['product'] = 'mvm_goods_table';
modules['salegd_detail'] = 'mvm_goods_onsale';
modules['group_detail'] = 'mvm_goods_group';
modules['changegd_detail'] = 'mvm_goods_change';




global.g_type = new Array();
g_type[0] = "xx";
g_type[1] = 0;
g_type[2] = 4;
g_type[3] = 5;

global.statusArr = new Array();
statusArr[1] = "待付款";
statusArr[2] = "已取消";
statusArr[3] = "已付款";
statusArr[4] = "已发货";
statusArr[5] = "已收货";
statusArr[6] = "待退货";
statusArr[7] = '已退货';
statusArr[8] = "待备货";
statusArr[9] = "待付余款";
statusArr[10] = '待评价';





global.favoriteModule = new Array();
favoriteModule[1] = 'product';
favoriteModule[2] = 'salegd_detail';
favoriteModule[3] = 'group_detail';
favoriteModule[5] = 'changegd_detail';

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '88');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);
http.get("http://127.0.0.1:88/update_cache");
var io = socketio.listen(server);
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
// 监听

io.sockets.on('connection', function (socket) {
    //链接后开始监听
    socket.on("check_id", function (id) {
        var sqldata = [];
        sqldata.push(id);
        sqlQueryMore("select uid from `mvm_member_table` where member_id=?", sqldata, function (err, vals, xx) {
            if (err) {
                throw err
            }
            if (vals.length <= 0) {
                socket.emit("check_id", 0);
            } else {
                socket.emit("check_id", 1);
            }
        })
    }); //验证用户名
    socket.on("check_phone", function (phone) {
        console.log(phone);

        phone = '0' + parseInt(phone);
        var sqldata = [];
        sqldata.push(phone);
        sqlQueryMore("select uid from `mvm_member_table` where member_tel1=?", sqldata, function (err, vals, xx) {
            if (err) {
                throw err
            }
            if (vals.length <= 0) {
                // socket.emit("check_phone",0);
                var sqldata = [];
                sqldata.push('63' + phone);

                sqlQueryMore("SELECT * FROM  `mvm_send_code` WHERE  `phone_number` =? and type= 0", sqldata, function (err, vals, xx) {
                    if (vals.length > 0) { //已经发送过的
                        if (vals[0]['click_number'] < 10) { //还可以发送
                            var code = get_num(6);
                            console.log('jieguo :');
                            console.log(vals);
                            SendSms(vals[0]['uid'], '63' + phone, vals[0]['click_number'] + 1, code, 0, 'Your verification code for PHMALL Online is ' + code + '. This code will only be valid for 5 minutes. Thank you.', function (result) {
                                console.log(result);
                                socket.emit("check_phone", -9); //发送成功
                            });
                        } else {
                            socket.emit("check_phone", -1); //发送次数过多
                        }
                    } else { //没发送过的
                        var code = get_num(7);
                        SendSms(null, '63' + phone, 1, code, 0, 'Your verification code for PHMALL Online is ' + code + '. This code will only be valid for 5 minutes. Thank you.', function (result) {
                            console.log(result);
                            socket.emit("check_phone", -9); //发送成功
                        });
                    }
                });
            } else {
                socket.emit("check_phone", 2);
            }
        })
    }); //发送验证码
    socket.on("get_order_goods", function (uid, index) {
        var result = {};
        var sql = [];
        sql.push(uid);
        sqlQueryMore("SELECT uid,g_uid,goods_name,goods_attr,module,supplier_id,buy_price,rest_price,buy_number,buy_point,goods_table,status FROM `mvm_order_goods` where order_id=?", sql, function (err, vals, xx) {
            if (err) throw err;
            socket.emit('return_order_goods', vals, index);
        });
        result

    })
});

// 监听



// 这里不要改，生成的
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    debug('Listening on ' + bind);
}

//这里不要改，生成的







// 这里写全局方法
global.get_num = function (n) {
    var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    var res = "";
    for (var i = 0; i < n; i++) {
        var id = Math.ceil(Math.random() * 9);
        res += chars[id];
    }
    return res;
} //獲取随机数
global.generateMixed = function (n) {
    var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    var res = "";
    for (var i = 0; i < n; i++) {
        var id = Math.ceil(Math.random() * 61);
        res += chars[id];
    }
    return res;
} //长度为n的随机字符串


// 日志
log4js.configure({
    appenders: {
        file: { //正常的日誌
            type: 'file',
            filename: 'logs/phchat.log', //文件目录，当目录文件或文件夹不存在时，会自动创建
            maxLogSize: 1024 * 1024 * 2, //文件最大存储空间，当文件内容超过文件存储空间会自动生成一个文件test.log.1的序列自增长的文件
            backups: 99, //当文件内容超过文件存储空间时，备份文件的数量
            //compress : true,//是否以压缩的形式保存新文件,默认false。如果true，则新增的日志文件会保存在gz的压缩文件内，并且生成后将不被替换，false会被替换掉
            encoding: 'utf-8', //default "utf-8"，文件的编码
            category: 'log_file',
            numBackups: 5, // keep five backup files
            compress: true, // compress the backups
            encoding: 'utf-8',
        },
        dateFile: { //按時間,这个是按天数
            type: 'dateFile',
            filename: 'logs/days/days.log',
            pattern: 'yyyy-MM-dd',
            compress: true
        },
        out: {
            type: 'stdout'
        }
    },
    categories: {
        default: {
            appenders: ['file', 'dateFile', 'out'],
            level: 'trace'
        }
    }
});
global.logger = log4js.getLogger('log_file');
//日志
//數據庫
global.pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'english',
    charset: 'utf8_general_ci'
}); //全局方法，打开数据库连接池
global.sqlQuery = function (sql, callback) {

    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, null, null);
        } else {

            conn.query(sql, function (qerr, vals, fields) {

                //释放连接
                conn.release();
                //事件驱动回调
                callback(qerr, vals, fields);
            });
        }
    });
}; //全局方法，查询
global.sqlQuery1 = function (sql, arr, callback) {

    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, null, null);
        } else {

            conn.query(sql, conn.escape(arr), function (qerr, vals, fields) {

                //释放连接
                conn.release();
                //事件驱动回调
                callback(qerr, vals, fields);
            });
        }
    });
}; //全局方法，查询
global.sqlQueryMore = function (sql, arr, callback) {
    logger.info(sql + "    " + arr);
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, null, null);
        } else {

            // var afterEscaps =  arr.map((e)=>conn.escape(e));
            var afterEscaps = arr.map(function (item) {
                // return escape(item);
                return item;
            });

            // console.log(afterEscaps);

            conn.query(sql, afterEscaps, function (qerr, vals, fields) {

                //释放连接
                conn.release();
                //事件驱动回调

                callback(qerr, vals, fields);
            });
        }
    });
}; //全局方法，查询
global.SendSms = function (uid, phonenumber, click_number, code, type, message, callback) {
    console.log('send:' + phonenumber);
    var send = new Promise(function (resolve, reject) {
        var username = urlencode('phmall');
        var password = urlencode('85765461');
        var sender_id = urlencode("PHMALL");
        var status = 0;
        var fp = "https://www.isms.com.my/isms_send.php";
        fp = fp + "?un=" + username + "&pwd=" + password + "&dstno=" + phonenumber + "&msg=" + message + "&type=1&sendid=" + sender_id;
        var ins_data = [];
        ins_data.push(uid);
        ins_data.push(phonenumber);
        ins_data.push(get_now_time());
        ins_data.push(get_now_time() + 300);
        ins_data.push(click_number);
        ins_data.push(code);
        ins_data.push(type);




        request(fp, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                if (body == '2000 = SUCCESS') {
                    sqlQueryMore("replace INTO  `mvm_send_code` ( `uid` , `phone_number` , `start_time` , `end_time` , `click_number` , `code` , `type`) VALUES (? ,  ?,  ?,  ?,  ?,  ?,  ?);", ins_data, function (err, vals, xx) {
                        logger.info("replace INTO  `mvm_send_code` ( `uid` , `phone_number` , `start_time` , `end_time` , `click_number` , `code` , `type`) VALUES (? ,  ?,  ?,  ?,  ?,  ?, ?);" + "    " + ins_data);
                        if (err) {
                            logger.info("replace INTO  `mvm_send_code` ( `uid` , `phone_number` , `start_time` , `end_time` , `click_number` , `code` , `type`) VALUES (? ,  ?,  ?,  ?,  ?,  ?, ?);" + "    " + ins_data);
                            throw err;
                        } else {
                            resolve(1);
                        }
                    });

                } else {
                    resolve(phonenumber);
                }
            } else {
                resolve(body);
            }
        });
    });
    send.then(function (result) {
        callback(result);
    })

};

//數據庫
/*我自己加的代碼*/
global.md5 = function (text) {
    return crypto.createHash('md5').update(text).digest('hex');
}; //MD5加密

global.getShopClass = function (score) {
    var level = 0;
    score = score % 1;
    if (score >= 1 && score <= 10) level = 1;
    else if (score >= 11 && score <= 40) level = 2;
    else if (score >= 41 && score <= 90) level = 3;
    else if (score >= 91 && score <= 150) level = 4;
    else if (score >= 151 && score <= 250) level = 5;
    else if (score >= 251 && score <= 500) level = 6;
    else if (score >= 501 && score <= 1000) level = 7;
    else if (score >= 1001 && score <= 2000) level = 8;
    else if (score >= 2001 && score <= 5000) level = 9;
    else if (score >= 5001 && score <= 10000) level = 10;
    else if (score >= 10001 && score <= 20000) level = 11;
    else if (score >= 20001 && score <= 50000) level = 12;
    else if (score >= 50001 && score <= 100000) level = 13;
    else if (score >= 100001 && score <= 200000) level = 14;
    else if (score >= 200001 && score <= 500000) level = 15;
    else if (score >= 500001 && score <= 1000000) level = 16;
    else if (score >= 1000001 && score <= 2000000) level = 17;
    else if (score >= 2000001 && score <= 5000000) level = 18;
    else if (score >= 5000001 && score <= 10000000) level = 19;
    else if (score >= 10000001) level = 20;
    return "lv_" + level;
}; //全局方法获取等级

global.serialize = function (mixedValue) {
    //  discuss at: http://locutus.io/php/serialize/
    // original by: Arpad Ray (mailto:arpad@php.net)
    // improved by: Dino
    // improved by: Le Torbi (http://www.letorbi.de/)
    // improved by: Kevin van Zonneveld (http://kvz.io/)
    // bugfixed by: Andrej Pavlovic
    // bugfixed by: Garagoth
    // bugfixed by: Russell Walker (http://www.nbill.co.uk/)
    // bugfixed by: Jamie Beck (http://www.terabit.ca/)
    // bugfixed by: Kevin van Zonneveld (http://kvz.io/)
    // bugfixed by: Ben (http://benblume.co.uk/)
    // bugfixed by: Codestar (http://codestarlive.com/)
    //    input by: DtTvB (http://dt.in.th/2008-09-16.string-length-in-bytes.html)
    //    input by: Martin (http://www.erlenwiese.de/)
    //      note 1: We feel the main purpose of this function should be to ease
    //      note 1: the transport of data between php & js
    //      note 1: Aiming for PHP-compatibility, we have to translate objects to arrays
    //   example 1: serialize(['Kevin', 'van', 'Zonneveld'])
    //   returns 1: 'a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}'
    //   example 2: serialize({firstName: 'Kevin', midName: 'van'})
    //   returns 2: 'a:2:{s:9:"firstName";s:5:"Kevin";s:7:"midName";s:3:"van";}'
    var val, key, okey
    var ktype = ''
    var vals = ''
    var count = 0
    var _utf8Size = function (str) {
        var size = 0
        var i = 0
        var l = str.length
        var code = ''
        for (i = 0; i < l; i++) {
            code = str.charCodeAt(i)
            if (code < 0x0080) {
                size += 1
            } else if (code < 0x0800) {
                size += 2
            } else {
                size += 3
            }
        }
        return size
    }
    var _getType = function (inp) {
        var match
        var key
        var cons
        var types
        var type = typeof inp
        if (type === 'object' && !inp) {
            return 'null'
        }
        if (type === 'object') {
            if (!inp.constructor) {
                return 'object'
            }
            cons = inp.constructor.toString()
            match = cons.match(/(\w+)\(/)
            if (match) {
                cons = match[1].toLowerCase()
            }
            types = ['boolean', 'number', 'string', 'array']
            for (key in types) {
                if (cons === types[key]) {
                    type = types[key]
                    break
                }
            }
        }
        return type
    }
    var type = _getType(mixedValue)
    switch (type) {
        case 'function':
            val = ''
            break
        case 'boolean':
            val = 'b:' + (mixedValue ? '1' : '0')
            break
        case 'number':
            val = (Math.round(mixedValue) === mixedValue ? 'i' : 'd') + ':' + mixedValue
            break
        case 'string':
            val = 's:' + _utf8Size(mixedValue) + ':"' + mixedValue + '"'
            break
        case 'array':
        case 'object':
            val = 'a'
            /*
            if (type === 'object') {
              var objname = mixedValue.constructor.toString().match(/(\w+)\(\)/);
              if (objname === undefined) {
                return;
              }
              objname[1] = serialize(objname[1]);
              val = 'O' + objname[1].substring(1, objname[1].length - 1);
            }
            */
            for (key in mixedValue) {
                if (mixedValue.hasOwnProperty(key)) {
                    ktype = _getType(mixedValue[key])
                    if (ktype === 'function') {
                        continue
                    }
                    okey = (key.match(/^[0-9]+$/) ? parseInt(key, 10) : key)
                    vals += serialize(okey) + serialize(mixedValue[key])
                    count++
                }
            }
            val += ':' + count + ':{' + vals + '}'
            break
        case 'undefined':
        default:
            // Fall-through
            // if the JS object has a property which contains a null value,
            // the string cannot be unserialized by PHP
            val = 'N'
            break
    }
    if (type !== 'object' && type !== 'array') {
        val += ';'
    }
    return val
}
//序列化
global.get_now_time = function () {
    var validity = new Date().getTime();
    return Math.round(validity / 1000); //有效期
} //獲取現在的時間




global.transform = function (obj) {
    var arr = [];
    for (var item in obj) {
        arr.push(obj[item]);
    }
    return arr;
} //對象轉數組



global.urlencode = function (clearString) {
    var output = '';
    var x = 0;

    clearString = utf16to8(clearString.toString());
    var regex = /(^[a-zA-Z0-9-_.]*)/;

    while (x < clearString.length) {
        var match = regex.exec(clearString.substr(x));
        if (match != null && match.length > 1 && match[1] != '') {
            output += match[1];
            x += match[1].length;
        } else {
            if (clearString[x] == ' ')
                output += '+';
            else {
                var charCode = clearString.charCodeAt(x);
                var hexVal = charCode.toString(16);
                output += '%' + (hexVal.length < 2 ? '0' : '') + hexVal.toUpperCase();
            }
            x++;
        }
    }

    function utf16to8(str) {
        var out, i, len, c;

        out = "";
        len = str.length;
        for (i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i);
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            } else {
                out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            }
        }
        return out;
    }

    return output;
}
// 解密



global.unserialize = function (data) {
    var $global = (typeof window !== 'undefined' ? window : global)
    var utf8Overhead = function (str) {
        var s = str.length
        for (var i = str.length - 1; i >= 0; i--) {
            var code = str.charCodeAt(i)
            if (code > 0x7f && code <= 0x7ff) {
                s++
            } else if (code > 0x7ff && code <= 0xffff) {
                s += 2
            }
            // trail surrogate
            if (code >= 0xDC00 && code <= 0xDFFF) {
                i--
            }
        }
        return s - 1
    }
    var error = function (type,
        msg, filename, line) {
        throw new $global[type](msg, filename, line)
    }
    var readUntil = function (data, offset, stopchr) {
        var i = 2
        var buf = []
        var chr = data.slice(offset, offset + 1)
        while (chr !== stopchr) {
            if ((i + offset) > data.length) {
                error('Error', 'Invalid')
            }
            buf.push(chr)
            chr = data.slice(offset + (i - 1), offset + i)
            i += 1
        }
        return [buf.length, buf.join('')]
    }
    var readChrs = function (data, offset, length) {
        var i, chr, buf
        buf = []
        for (i = 0; i < length; i++) {
            chr = data.slice(offset + (i - 1), offset + i)
            buf.push(chr)
            length -= utf8Overhead(chr)
        }
        return [buf.length, buf.join('')]
    }

    function _unserialize(data, offset) {
        var dtype
        var dataoffset
        var keyandchrs
        var keys
        var contig
        var length
        var array
        var readdata
        var readData
        var ccount
        var stringlength
        var i
        var key
        var kprops
        var kchrs
        var vprops
        var vchrs
        var value
        var chrs = 0
        var typeconvert = function (x) {
            return x
        }
        if (!offset) {
            offset = 0
        }
        dtype = (data.slice(offset, offset + 1)).toLowerCase()
        dataoffset = offset + 2
        switch (dtype) {
            case 'i':
                typeconvert = function (x) {
                    return parseInt(x, 10)
                }
                readData = readUntil(data, dataoffset, ';')
                chrs = readData[0]
                readdata = readData[1]
                dataoffset += chrs + 1
                break
            case 'b':
                typeconvert = function (x) {
                    return parseInt(x, 10) !== 0
                }
                readData = readUntil(data, dataoffset, ';')
                chrs = readData[0]
                readdata = readData[1]
                dataoffset += chrs + 1
                break
            case 'd':
                typeconvert = function (x) {
                    return parseFloat(x)
                }
                readData = readUntil(data, dataoffset, ';')
                chrs = readData[0]
                readdata = readData[1]
                dataoffset += chrs + 1
                break
            case 'n':
                readdata = null
                break
            case 's':
                ccount = readUntil(data, dataoffset, ':')
                chrs = ccount[0]
                stringlength = ccount[1]
                dataoffset += chrs + 2
                readData = readChrs(data, dataoffset + 1, parseInt(stringlength, 10))
                chrs = readData[0]
                readdata = readData[1]
                dataoffset += chrs + 2
                if (chrs !== parseInt(stringlength, 10) && chrs !== readdata.length) {
                    error('SyntaxError', 'String length mismatch')
                }
                break
            case 'a':
                readdata = {}
                keyandchrs = readUntil(data, dataoffset, ':')
                chrs = keyandchrs[0]
                keys = keyandchrs[1]
                dataoffset += chrs + 2
                length = parseInt(keys, 10)
                contig = true
                for (i = 0; i < length; i++) {
                    kprops = _unserialize(data, dataoffset)
                    kchrs = kprops[1]
                    key = kprops[2]
                    dataoffset += kchrs
                    vprops = _unserialize(data, dataoffset)
                    vchrs = vprops[1]
                    value = vprops[2]
                    dataoffset += vchrs
                    if (key !== i) {
                        contig = false
                    }
                    readdata[key] = value
                }
                if (contig) {
                    array = new Array(length)
                    for (i = 0; i < length; i++) {
                        array[i] = readdata[i]
                    }
                    readdata = array
                }
                dataoffset += 1
                break
            default:
                error('SyntaxError', 'Unknown / Unhandled data type(s): ' + dtype)
                break
        }
        return [dtype, dataoffset - offset, typeconvert(readdata)]
    }
    return _unserialize((data + ''), 0)[2]
};
//反向序列化

global.ad_unzip = function (strs, callback) {
    const buffer = Buffer.from(strs, 'base64');

    zlib.unzip(buffer, (err, buffer) => {
        if (!err) {
            callback(unserialize(buffer.toString()));
        } else {
            console.log("erring");
            // handle error
        }
    })
};
//廣告的解密

global.getClientIp = function (req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
};
//獲取IP
global.sqlasnyc = function (sql, arr = []) {
    var p = new Promise(function (resolve) {
        sqlQueryMore(sql, arr, function (err, vals, xx) {
            if (err) logger.info("Caught exception:" + err);
            if (vals.length <= 0) {
                resolve([]);
            } else {
                resolve(vals);
            }

        });
    });

    return p
}
//sql 查詢



global.add_score = function (m_uid, point, type, reason, session_id, ip, point_sess = '', other_info = '') {
    async function run() {
        point = parseInt(point);
        if (point == 0) return; //沒有分值

        m_uid = parseInt(m_uid);
        if (m_uid <= 0) return;
        var sql = [];
        sql.push(m_uid);
        var member = await sqlasnyc("SELECT uid,member_id,member_class,member_point,member_point_acc FROM `mvm_member_table` WHERE uid=? LIMIT 1", sql);
        if (member == 0) return; //检索不到会员

        var member_point = member[0]['member_point'] + point;
        if (member_point < 0) member_point = 0;
        var sql = [];
        sql.push(member_point);


        if (!point_sess) point_sess = get_now_time();
        if (point > 0) member[0]['member_point_acc'] += point;
        sql.push(member[0]['member_point_acc']);

        //加分记录
        var sqlstr = "INSERT INTO `mvm_point_table` (type,point_id,point_add,point_reason,point_sess,point_left,modify_id,modify_ip,register_date,approval_date,other_info) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
        var sqls = [];
        sqls.push(type);
        sqls.push(member[0]['member_id']);
        sqls.push(point);
        sqls.push(reason);
        sqls.push(point_sess);
        sqls.push(member_point);
        sqls.push(session_id);
        sqls.push(ip);
        sqls.push(get_now_time());
        sqls.push(get_now_time());
        sqls.push(other_info);

        await sqlasnyc(sqlstr, sqls);

        await sqlasnyc("update `mvm_member_table` set member_point=?,member_point_acc=? where uid=" + member[0].uid, sql);

    }
    run();
}


global.add_money = function (m_uid, money, type, reason, session_id, ip, money_sess = '', $other_info = '') {
    async function run() {
        money = parseFloat(money);
        if (money == 0) return;
        m_uid = parseFloat(m_uid);
        if (m_uid <= 0) return;
        var sql = [];
        sql.push(m_uid);
        var member = await sqlasnyc("SELECT * FROM `mvm_member_table` WHERE uid=? LIMIT 1", sql);
        if (!member) return; //检索不到会员


        var sql = [];
        sql.push(member[0].member_id);
        var moneys = await sqlasnyc("select sum(money_add) as sum from `mvm_money_table` where money_id=?", sql);
        if (moneys[0]['sum'] != member[0]['member_money'] + member[0]['member_money_freeze']) {
            // 资金异常处理
            var sql = [];
            sql.push(m_uid);
            sql.push(member[0].member_id);
            sql.push(1);
            sql.push(get_now_time());
            sql.push(0);
            await sqlasnyc("insert into money_error set m_uid=?,m_id=?,type=?,register_date=?,approval_date=?,state=?", sql);
            return "资金错误";
        }
        var member_money = member[0]['member_money'] + money;
        if (member_money < 0) member_money = 0;
        var member_row = [];
        member_row.push(member_money);
        if (!money_sess) money_sess = get_now_time();
        var sqlstr = "INSERT INTO `mvm_money_table` (type,money_id,money_add,money_reason,money_sess,money_left,modify_id,modify_ip,register_date,approval_date,other_info) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
        var sqls = [];
        sqls.push(type);
        sqls.push(member[0]['member_id']);
        sqls.push(money);
        sqls.push(reason);
        sqls.push(money_sess);
        sqls.push(member_money);
        sqls.push(session_id);
        sqls.push(ip);
        sqls.push(get_now_time());
        sqls.push(get_now_time());
        sqls.push(other_info);

        await sqlasnyc(sqlstr, sqls);
        member_row.push(member[0].uid);
        await sqlasnyc("update mvm_member_table set member_money=? where uid=?", member_row);
    }
    run();
};




















































global.cart_spec_list = function (req, str_uids, with_shop_info = true) {
    
    return function () {

        return new Promise(async function (resolve) {

            var sign = req.sign;
            var m_check_id = req.m_id;
            var m_check_uid = req.m_uid;
            var ret;
            if (sign && m_check_id) {

                str_uids = str_uids.trim();
                if (!str_uids) {
                    return false;
                }
                var arr_uids = str_uids.split(',');
                arr_uids.forEach(function (val, key) {

                    val = parseInt(val);

                    if (val <= 0) {
                        arr_uids.splice(key, 1);
                    } else {
                        arr_uids[key] = val;
                    }
                });

                if (!arr_uids) return false;

                str_uids = arr_uids.join(',');

                var arr_cart = {};
                var arr_supplier_id = [];

                var q = await sqlasnyc('SELECT uid,cart_price,rest_price,cart_point,g_uid,cart_num,goods_table,module,attr,g_type,refer_g_uid,goods_table,module FROM `mvm_cart_table` WHERE uid IN (' + str_uids + ') AND m_id=?', [m_check_id]);


                for (let i in q) {
                    var val = q[i];
                    var index = i;
                    var g = await sqlasnyc("SELECT uid,goods_name,goods_file1,supplier_id,type,goods_status FROM `" + val.goods_table + "` WHERE uid=? LIMIT 1", [val.g_uid]);

                    if (!g) continue;

                    g[0].goods_kg = 0;
                    if (!(g[0].goods_status & 4)) {
                        var detail_table = goods_detail_table(g[0].type);
                        var detail = await sqlasnyc("SELECT goods_kg FROM `" + detail_table + "` WHERE g_uid=? LIMIT 1", [g[0].uid]);
                        g[0].goods_kg = intval(detail[0].goods_kg);

                    }

                    if (!in_array(g[0].supplier_id, arr_supplier_id)) {

                        arr_supplier_id.push(g[0].supplier_id);
                    }



                    arr_cart.cart_list = typeof (arr_cart.cart_list) == 'undefined' ? [] : arr_cart.cart_list;


                    arr_cart.cart_list[g[0].supplier_id] = typeof (arr_cart.cart_list[g[0].supplier_id]) == 'undefined' ? [] : arr_cart.cart_list[g[0].supplier_id]

                    arr_cart.cart_list[g[0].supplier_id].push({
                        uid: val.uid,
                        cart_price: val.cart_price,
                        rest_price: val.rest_price,
                        cart_point: val.cart_point,
                        total_price: val.cart_price * val.cart_num,
                        cart_num: val.cart_num,
                        attr: val.attr,
                        goods_name: g[0].goods_name,
                        goods_file1: g[0].goods_file1,
                        url: val.module + val.g_uid,
                        g_uid: val.g_uid,
                        g_type: val.g_type,
                        refer_g_uid: val.refer_g_uid,
                        supplier_id: g[0].supplier_id,
                        goods_table: val.goods_table,
                        module: val.module
                    });

                    arr_cart.cart_info = typeof (arr_cart.cart_info) == 'undefined' ? [] : arr_cart.cart_info;
                    arr_cart.cart_info[g[0].supplier_id] = typeof (arr_cart.cart_info[g[0].supplier_id]) == 'undefined' ? {} : arr_cart.cart_info[g[0].supplier_id];


                    if (!arr_cart.cart_info[g[0].supplier_id].total_price > 0) arr_cart.cart_info[g[0].supplier_id].total_price = 0;
                    arr_cart.cart_info[g[0].supplier_id].total_price += parseFloat(val.cart_price * val.cart_num);

                    if (!arr_cart.cart_info[g[0].supplier_id].total_num > 0) arr_cart.cart_info[g[0].supplier_id].total_num = 0;
                    arr_cart.cart_info[g[0].supplier_id].total_num += val.cart_num;


                    if (!arr_cart.cart_info[g[0].supplier_id].total_point > 0) arr_cart.cart_info[g[0].supplier_id].total_point = 0;
                    arr_cart.cart_info[g[0].supplier_id].total_point += parseInt(val.cart_point * val.cart_num);

                    if (!arr_cart.cart_info[g[0].supplier_id].total_kg > 0) arr_cart.cart_info[g[0].supplier_id].total_kg = 0;

                    arr_cart.cart_info[g[0].supplier_id].total_kg += parseInt(g[0].goods_kg * val.cart_num);



                    if (arr_cart.cart_info[g[0].supplier_id].is_preorder) {
                        arr_cart.cart_info[g[0].supplier_id].is_preorder = val.rest_price > 0 ? true : false
                    }
                }
                if (!with_shop_info) return arr_cart;
                if (!arr_supplier_id) return arr_cart;

                str_supplier_id = arr_supplier_id.join(',');


                var q = await sqlasnyc("SELECT m_uid,shop_name FROM `mvm_member_shop` WHERE m_uid IN (" + str_supplier_id + ")", );

                for (let i in q) {

                    var val = q[i];
                    var key = i;
                    val.url = val.url;
                    //获取店铺信息
                    console.log(q);
                    var cfg = await sqlasnyc('select cf_value from `mvm_config` where supplier_id=? and cf_name="mm_client_qq1" limit 1', [val.m_uid]);
                    console.log(cfg);
                    val['qq'] = cfg[0].cf_value;


                    var val_m_uid = val.m_uid;
                    arr_cart.shop_info = typeof (arr_cart.shop_info) == 'undefined' ? [] : arr_cart.shop_info;
                    arr_cart.shop_info[val_m_uid] = val;

                    arr_cart.coupon = typeof (arr_cart.coupon) == 'undefined' ? [] : arr_cart.coupon;
                    //获取优惠卷
                    arr_cart.coupon[val_m_uid] = {};

                    var q_tmp = await sqlasnyc("SELECT uid,name,discount FROM `mvm_coupon` FORCE INDEX (`supplier_id`) WHERE m_uid=? AND supplier_id=? AND start_date<=? AND price_lbound<=?", [m_check_uid, val.m_uid, get_now_time(), arr_cart.cart_info[val_m_uid].total_price]);


                    if (q_tmp != 0) {
                        arr_cart.coupon[val_m_uid] = q_tmp;
                    }


                }

                ret = arr_cart;


                resolve(ret);



            } else {

                console.log('aaaa');
                await sqlasnyc('select * from test');
                console.log('bbbb');

            }


        });
    }

}//购物车结算

/* global.cart_to_order = function(req,cart_uid){
    var arr_ordersn=[];
    var combine_tag='CT'+get_now_time()+parseInt(Math.random()*100);
    var salt=$salt=parseInt(Math.random()*10000);
    var arr_supplier_id=array_keys(cart_uid);
    var total_price=0;
    var total_point=0;
    var code=parseInt(Math.random()*1000000);
    var arr_order_info=[];
    arr_supplier_id.forEach(function(supid){
        
        var ss =cart_spec_list(req,cart_uid,false);
            async function main() {
                var cart_ret = await ss();
                res.json(cart_ret);
            }
            main();
            console.log(cart_uid);
    })
}
 */









global.goods_detail_table = function (type, by_table = false) {

    type = parseInt(type);
    if (by_table) {
        if (type == "mvm_goods_table") return "mvm_goods_detail";
        else if (type == "mvm_goods_onsale") return "mvm_goods_onsale_detail";
        else if (type == "mvm_goods_group") return "mvm_goods_group_detail";
        else if (type == "mvm_goods_change") return "mvm_goods_change_detail";
        else if (type == "mvm_goods_auction") return "mvm_goods_auction_detail";
        else if (type == "mvm_goods_show") return "mvm_goods_show_detail";
    } else {
        var tmp_arr = [0, 1, 2, 3, 9];
        console.log("type:" + type);
        if (in_array(type, tmp_arr)) return "mvm_goods_detail";
        else if (type == 4) return "mvm_goods_onsale_detail";
        else if (type == 5) return "mvm_goods_group_detail";
        else if (type == 6) return "mvm_goods_change_detail";
        else if (type == 7) return "mvm_goods_auction_detail";
        else if (type == 8) return "mvm_goods_show_detail";
        console.log('ok');
    }

    return "mvm_goods_detail";
}

global.return_date = function (date) {
    var s = new Date(parseInt(date) * 1000).toLocaleString().replace(/\d{1,2}:\d{1,2}:\d{1,2}$/, '').replace(' ', '');
    return s;
};


global.post = function (host, path, data, callback) {

    var http = require('http');
    var querystring = require('querystring');
    //发送 http Post 请求
    var postData = querystring.stringify(data);
    var options = {
        hostname: host,
        port: 80,
        path: path,
        method: 'POST',
        headers: {
            //'Content-Type':'application/x-www-form-urlencoded',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Content-Length': Buffer.byteLength(postData)
        }
    }
    var req = http.request(options, function (res) {

        /*console.log('Status:',res.statusCode);
        console.log('headers:',JSON.stringify(res.headers));*/
        res.setEncoding('utf-8');
        res.on('data', function (chun) {

            // console.log(chun);
            callback(chun);
        });
        res.on('end', function () {

        });
    });
    req.on('error', function (err) {
        console.error(err);
    });
    req.write(postData);
    req.end();

}

global.post3000 = function (host, path, data, callback) {

    var http = require('http');
    var querystring = require('querystring');
    //发送 http Post 请求
    var postData = querystring.stringify(data);
    var options = {
        hostname: host,
        port: 3000,
        path: path,
        method: 'POST',
        headers: {
            //'Content-Type':'application/x-www-form-urlencoded',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Content-Length': Buffer.byteLength(postData)
        }
    }
    var req = http.request(options, function (res) {

        /*console.log('Status:',res.statusCode);
        console.log('headers:',JSON.stringify(res.headers));*/
        res.setEncoding('utf-8');
        res.on('data', function (chun) {

            // console.log(chun);
            callback(chun);
        });
        res.on('end', function () {

        });
    });
    req.on('error', function (err) {
        console.error(err);
    });
    req.write(postData);
    req.end();
}


global.config = {};
config.email_apiUser = "phmalladmin";
config.email_apiKey = "FdN1BbbZ5tsma7lX";
config.email_from = "service@mail.phmall.com.ph";
config.email_fromName = "PHMALL";
config.email_subject = "PHMALL:My Website,My Decision .Let \'s Create Your Own Online Shop !.Verification code for email modification";
config.web_src = "../../phpStudy/WWW/english/xx/";
config.share_img_src = '../../phpStudy/WWW/english/union/shopimg/user_img/wap/'
config.img_url = "http://192.168.0.105/english/";
config.union_img_url = "http://192.168.0.105/english/union/";
config.update_url = "http://127.0.0.1:88/update_cache";



global.SendEmail = function (to, subject, contect, callback) {
    post('api.sendcloud.net', '/apiv2/mail/send', {
        apiUser: config.email_apiUser,
        apiKey: config.email_apiKey,
        from: config.email_from,
        to: to,
        subject: subject,
        fromName: config.email_fromName,
        html: contect
    }, function (result) {
        callback(result);
    });
}


global.SendCode = function (phone, type, callback) {

    console.log(phone);
    phone = '0' + parseInt(phone);
    var sqldata = [];
    sqldata.push(phone);

    sqlQueryMore("select uid from `mvm_member_table` where member_tel1=?", sqldata, function (err, vals, xx) {
        if (err) {
            throw err
        }
        console.log('select uid from `mvm_member_table` where member_tel1=' + vals);
        if (vals.length <= 0) {
            // socket.emit("check_phone",0);
            var sqldata = [];
            sqldata.push('63' + phone);

            sqlQueryMore("SELECT * FROM  `mvm_send_code` WHERE  `phone_number` =? and type= " + type, sqldata, function (err, vals, xx) {
                if (vals.length > 0) { //已经发送过的

                    if (vals[0]['click_number'] < 10) { //还可以发送
                        var code = get_num(6);

                        SendSms(vals[0]['uid'], '63' + phone, vals[0]['click_number'] + 1, code, type, 'Your verification code for PHMALL Online is ' + code + '. This code will only be valid for 5 minutes. Thank you.', function (result) {
                            callback(-9); //发送成功
                        });
                    } else {
                        callback(-1); //发送次数过多
                    }
                } else { //没发送过的
                    var code = get_num(7);

                    SendSms(null, '63' + phone, 1, code, type, 'Your verification code for PHMALL Online is ' + code + '. This code will only be valid for 5 minutes. Thank you.', function (result) {
                        callback(-9); //发送成功
                    });
                }
            });
        } else {
            callback(2); //已存在
        }
    })
    //发送验证码
}


global.sqlQueryStr = function (table, wantData, object) {
    var str = "select " + wantData + ' from `' + table + '`';
    var arr = [];
    if (object.length != {}) {
        str = str + ' where ';
        for (let i in object) {
            str = str + i + '=?,';
            arr.push(object[i]);
        };
        str = str.substring(0, str.length - 1);
    }
    return {
        str: str,
        arr: arr
    };
}

//SQL查询语句
/*
sqlQuery('member_table','*',{},function(result){
  console.log(JSON.stringify(result));
})
*/

global.sqlInsStr = function (table, object) {
    var str = 'insert into `' + table + '` set ';
    var array = [];
    for (let i in object) {
        str = str + i + '=?,';
        array.push(object[i]);
    }
    console.log(str);
    console.log(JSON.stringify(array));
    str = str.substring(0, str.length - 1);
    return {
        str: str,
        arr: array
    };
}
//SQL插入
/* sqlIns('member_table',{member_id:req.body.member_id},function(result){
  console.log(result);
}) */


global.sqlUpdateStr = function (table, object, where) {
    var str = 'update `' + table + '` set ';
    var array = [];
    for (let i in object) {
        str = str + i + '=?,';
        array.push(object[i]);
    }
    str = str.substring(0, str.length - 1) + ' ' + where;
    console.log(str);
    console.log(JSON.stringify(array));
    return {
        str: str,
        arr: array
    };
}
//SQL更新
/* sqlUpdate('member_table',{member_id:req.body.member_id}, where,function(result){
  console.log(result);
}) */




// 事务
global.Transaction = function (strArrObject, TransactionCallback) {
    var TransactionArr = [];
    var db = {};
    var resultArr = [];
    db.getConnection = function (callback) {
        pool.getConnection(function (err, connection) {
            if (err) {
                callback(null);
                return;
            }
            callback(connection);
        });
    }


    db.getConnection(function (connection) {
        connection.beginTransaction(function (err) {
            if (err) {
                console.log(err);
                return;
            }
            strArrObject.forEach((element, index) => {

                var task = function (callback) {

                    connection.query(element.str, element.arr, function (err, result) {
                        if (err) {
                            console.log(err);
                            callback(err, null);
                            return;
                        }
                        resultArr.push(result);
                        console.log('第' + parseInt(index) + 1 + '次插入成功!');
                        callback(null, result);
                    })
                }
                TransactionArr.push(task);
            });

            async.series(TransactionArr, function (err, result) {
                if (err) {
                    console.log(err);
                    //回滚  
                    connection.rollback(function () {
                        console.log('出现错误,回滚!');
                        //释放资源  
                        TransactionCallback([]);
                        connection.release();
                    });
                    return;
                }
                //提交  
                connection.commit(function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    console.log('成功,提交!');
                    TransactionCallback(result);
                    //释放资源  
                    connection.release();
                });
            })
        });
    })
}
//这里写全局方法


// SendSms(103,'15659529682',2,856123,1,'nihoa',function (result) {
// console.log(result);
// });
/**
 * Created by Administrator on 2017/9/18.
 */



// 屬性圖片
/*
str="Color|pink(images/attr/[1]/26.gif)|purple(images/attr/[1]/5.gif)|red(images/attr/[1]/7.gif)||size|S()|M()|X()";
str=str.split("||");
var s=[];
var attrss=[];
str.forEach(function (item,index) {
    var ss={};
    item.split("|").forEach(function(items,indexs)
    {

        console.log(items.match(/\([^\)]*\)/g));
        // ss[items.replace(/\([^\)]*\)/g,"")]=items.match(/\([^\)]*\)/g);


        // console.log(items.replace(/\([^\)]*\)/g,"")+":"+items.match(/\([^\)]*\)/g));
        ss[indexs]={};

        ss[indexs].name=items.replace(/\([^\)]*\)/g,"");
        var arr=items.match(/\([^\)]*\)/g);
        if(arr!=null)
        {
            ss[indexs].value=arr[arr.length-1].replace("(","").replace(")","");
        }
        else
        {
            ss[indexs].value=arr;
        }


    });
    attrss.push(ss);
});
*/

// 屬性圖片





// var str="Color:pink|size:S|0|10||Color:pink|size:M|0|20||Color:pink|size:X|0|10||Color:purple|size:S|0|5||Color:purple|size:M|0|10||Color:purple|size:X|0|20||Color:red|size:S|0|5||Color:red|size:M|0|15||Color:red|size:X|0|5";
// str=str.split("||");
// var attr_store=[];
// str.forEach(function (item,index) {
//
//     attr_store.push(item);
// });
// // console.log(attr_store);
//
//
// attr_store.forEach(function (item,index) {
//
//     if(item.indexOf('Color:pink|size:S|')>=0)
//     {
//         var arr=item.split("|");
//         console.log(arr[arr.length-2]);
//         console.log(arr[arr.length-1]);
//     }
// });
// 属性库存


















var unserialize = function (data) {
    //  discuss at: http://locutus.io/php/unserialize/
    // original by: Arpad Ray (mailto:arpad@php.net)
    // improved by: Pedro Tainha (http://www.pedrotainha.com)
    // improved by: Kevin van Zonneveld (http://kvz.io)
    // improved by: Kevin van Zonneveld (http://kvz.io)
    // improved by: Chris
    // improved by: James
    // improved by: Le Torbi
    // improved by: Eli Skeggs
    // bugfixed by: dptr1988
    // bugfixed by: Kevin van Zonneveld (http://kvz.io)
    // bugfixed by: Brett Zamir (http://brett-zamir.me)
    // bugfixed by: philippsimon (https://github.com/philippsimon/)
    //  revised by: d3x
    //    input by: Brett Zamir (http://brett-zamir.me)
    //    input by: Martin (http://www.erlenwiese.de/)
    //    input by: kilops
    //    input by: Jaroslaw Czarniak
    //    input by: lovasoa (https://github.com/lovasoa/)
    //      note 1: We feel the main purpose of this function should be
    //      note 1: to ease the transport of data between php & js
    //      note 1: Aiming for PHP-compatibility, we have to translate objects to arrays
    //   example 1: unserialize('a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}')
    //   returns 1: ['Kevin', 'van', 'Zonneveld']
    //   example 2: unserialize('a:2:{s:9:"firstName";s:5:"Kevin";s:7:"midName";s:3:"van";}')
    //   returns 2: {firstName: 'Kevin', midName: 'van'}
    //   example 3: unserialize('a:3:{s:2:"ü";s:2:"ü";s:3:"四";s:3:"四";s:4:"𠜎";s:4:"𠜎";}')
    //   returns 3: {'ü': 'ü', '四': '四', '𠜎': '𠜎'}
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
    function _unserialize (data, offset) {
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




/**
 * Created by Richard on 7/14/16.
 */
var http = require('http');
var zlib = require('zlib');
var str="eJxVj0FOwzAQRa9i+QCNHSctdnawpqoEEssoSkbByMlYHrsVQmy4EVfiJMQIV+pu9ObP/38Go80HmTvDZ8SJejvxzpqmFh0ZKQqN7x4yv6XrsGyUTLuRWsiWHeHCntETu3eYCNgLLrCypwsMEQI7JefwDIHYY3LR8huvCWjMZAN/C1kWPtgRivbn65tJ3eyEyERfNXYsPdJqca3oFb1d5morEfo8KFnlhmJfyUY1e6m1UO1B7d78XOIoee9s1k8Z1YYr+Z+S7a7fHgx/QOdghnIZbXTQj+gw8O7Yff4CprVq5Q==";


/*壓縮
const input =str;
zlib.deflate(input, (err, buffer) => {
    if (!err) {
    console.log(buffer.toString('base64'));
} else {
    // handle error
}
});*/


// 解壓
// function ad_unzip(strs,callback) {
//     const buffer = Buffer.from(strs, 'base64');
//     zlib.unzip(buffer, (err, buffer) => {
//         if (!err) {
//        callback(unserialize(buffer.toString()));
//     } else {
//         // handle error
//     }
// });
// }
//
// ad_unzip(str,function (xx) {
//     console.log(xx);
// });



// base 64解壓
/*var b = new Buffer(str, 'base64');
var s = b.toString();*/
// console.log(s);

//
// var end=(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000)/1000;
// var start=end-3600*24;
// console.log(start);
// console.log(end);



/*

var str="Color:black|size:M|0|10||Color:black|size:XL|0|50||Color:black|size:L|0|20||Color:pink|size:M|0|20||Color:pink|size:XL|0|30||Color:pink|size:L|0|30||Color:yellow|size:M|0|20||Color:yellow|size:XL|0|20||Color:yellow|size:L|0|20||Color:white|size:M|0|10||Color:white|size:XL|0|10||Color:white|size:L|0|10";
var s="Color:black|size:M";
var ss=str.match('Color:black\\|size:M\\|[0-9]{0,99}\\|[0-9]{0,99}');

*/


/*

var request = require('request');
var qs = require('querystring');

var getData=function (url, qsObj, res) {
        request({
            url: url,
            qs: qsObj,
            method: 'GET'
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // res.send(body);
            }
            else {

            }
        });
    }




    var postData= function (url,jsonObj,res) {
        request({
            url: url,
            method: 'POST',
            json: jsonObj
        }, function (error, response, body) {
            if (error) {
                console.log(error);

            } else {
               console.log(body);
            }
        });

    }

var post_data = {
    a: 123,
    time: new Date().getTime()};//这是需要提交的数据


var content={a:'xx'};

postData('http://192.168.0.105/english/xx.php',content,function (result) {
    console.log(result);
});

*/







var s='aaaa{answ}bbb{answ}';
var ss= s.replace(/{answ}/g,',{answ},');

var ss=ss.split(',');
if(ss[ss.length-1]=='')
{
    ss=ss.slice(0, [ss.length-1]);
}
ss.forEach(function (item,index) {
    console.log(item);
})
console.log(ss);
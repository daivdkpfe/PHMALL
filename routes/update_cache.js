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
/* GET home page. */
// memcached.touch('foo', 100, function (err) {
//   console.log("end")
// });//修改过期时间
// memcached.set('foo', 'bar', 10000, function (err) { /* stuff */
// });//设置
// memcached.get('helo', function (err, data) {
//   console.log(data);
// });//取


router.get('/', function(req, res, next) {
  // 更新配置
  var update_cfg=new Promise(function (resolve,err) {
    sqlQuery("select * from `mvm_config` where supplier_id=0",function (err,vals,xx) {
      if(err)
      {
        logger.info("Caught exception:"+err);
      }
      else
      {
        vals.forEach(function(item,val,arr)
        {
          //console.log("key:"+item['cf_name']+"    "+"value:"+item['cf_value']);
          memcached.set(item['cf_name'],item['cf_value'],3600*48,function (err) {
            //完成后执行
          });
        });
        res.write('<p>update config is end...</p><br>');
        resolve();
        // res.json(vals);
      }
    });
  })

  // 更新主站分類
  var categroy=[];
  var update_categroy_before=new Promise(function (resolve,err) {
    sqlQuery("SELECT supplier_id FROM  `mvm_category` WHERE  `supplier_id` !=0 and `category_id`=0 group by supplier_id",function (err,vals,xx) {
        // res.json(vals);
          vals.forEach(function (item,val,xx) {
            if(categroy.hasOwnProperty(item["supplier_id"]))
            {

            }
            else{
              //memcached.set("categroy_index_"+item['supplier_id'],"",3600*24*30,function (err) {});
                sqlQuery("SELECT * FROM  `mvm_category` WHERE  `supplier_id` ="+item['supplier_id']+" and `category_id`=0",function (err,vals,xx) {

                    memcached.set("categroy_index_"+item['supplier_id'],vals,3600*24*30,function (err) {});
                })
            }
          });

        res.write('<p>update categroy is end...</p><br>');


          resolve();
    });
  })

  //更新廣告
  var adsql=[];
  var ad_cache=new Promise(function (resolve,err) {
    sqlQueryMore("select * from mvm_ad_table where module='default_wap' and pos='flash'",adsql,function (err,vals,xx) {
      if(err) logger.info("Caught exception:"+err);
        var flash=[];
        var s=0;
        vals.forEach(function (item,index) {

          ad_unzip(item['info'],function (unzip) {
              flash.push(unzip);
              s++;
              if(s==vals.length){

                memcached.set("default_wap_flash",flash,3600*24*30,function (err) {});
              }
          });

        });

    });
    sqlQueryMore("select * from mvm_ad_table where module='default_wap' and pos='coupon'",adsql,function (err,vals,xx) {
      if(err) logger.info("Caught exception:"+err);
      var coupon=[];
      var s=0;
      vals.forEach(function (item,index) {

        ad_unzip(item['info'],function (unzip) {
          coupon.push(unzip);
          s++;
          if(s==vals.length){

            memcached.set("default_wap_coupon",coupon,3600*24*30,function (err) {});
          }
        });

      });

    });
    sqlQueryMore("select * from mvm_ad_table where module='default_wap' and pos='hot_info'",adsql,function (err,vals,xx) {
      if(err) logger.info("Caught exception:"+err);
      var hot_info=[];
      var s=0;
      vals.forEach(function (item,index) {

        ad_unzip(item['info'],function (unzip) {
          hot_info.push(unzip);
          s++;
          if(s==vals.length){

            memcached.set("default_wap_hot_info",hot_info,3600*24*30,function (err) {});
          }
        });

      });

    });
    sqlQueryMore("select * from mvm_ad_table where module='default_wap' and pos='flash_sale'",adsql,function (err,vals,xx) {
      if(err) logger.info("Caught exception:"+err);
      var flash_sale=[];
      var s=0;
      vals.forEach(function (item,index) {

        ad_unzip(item['info'],function (unzip) {
          flash_sale.push(unzip);
          s++;
          if(s==vals.length){

            memcached.set("default_wap_flash_sale",flash_sale,3600*24*30,function (err) {});
          }
        });

      });

    });
    sqlQueryMore("select * from mvm_ad_table where module='default_wap' and pos='ad_1'",adsql,function (err,vals,xx) {
      if(err) logger.info("Caught exception:"+err);
      var ad_1=[];
      var s=0;
      vals.forEach(function (item,index) {

        ad_unzip(item['info'],function (unzip) {
          ad_1.push(unzip);
          s++;
          if(s==vals.length){

            memcached.set("default_wap_ad_1",ad_1,3600*24*30,function (err) {});
          }
        });

      });

    });
    sqlQueryMore("select * from mvm_ad_table where module='default_wap' and pos='ad_2'",adsql,function (err,vals,xx) {
      if(err) logger.info("Caught exception:"+err);
      var ad_2=[];
      var s=0;
      vals.forEach(function (item,index) {

        ad_unzip(item['info'],function (unzip) {
          ad_2.push(unzip);
          s++;
          if(s==vals.length){

            memcached.set("default_wap_ad_2",ad_2,3600*24*30,function (err) {});
          }
        });

      });

    });
    sqlQueryMore("select * from mvm_ad_table where module='default_wap' and pos='ad_3'",adsql,function (err,vals,xx) {
      if(err) logger.info("Caught exception:"+err);
      var ad_3=[];
      var s=0;
      vals.forEach(function (item,index) {

        ad_unzip(item['info'],function (unzip) {
          ad_3.push(unzip);
          s++;
          if(s==vals.length){

            memcached.set("default_wap_ad_3",ad_3,3600*24*30,function (err) {});
          }
        });

      });

    });
    sqlQueryMore("select * from mvm_ad_table where module='default_wap' and pos='categroy_1'",adsql,function (err,vals,xx) {
      if(err) logger.info("Caught exception:"+err);
      var categroy_1=[];
      var s=0;
      vals.forEach(function (item,index) {

        ad_unzip(item['info'],function (unzip) {
          categroy_1.push(unzip);
          s++;
          if(s==vals.length){

            memcached.set("default_wap_categroy_1",categroy_1,3600*24*30,function (err) {});
          }
        });

      });

    });
    sqlQueryMore("select * from mvm_ad_table where module='default_wap' and pos='categroy_2'",adsql,function (err,vals,xx) {
      if(err) logger.info("Caught exception:"+err);
      var categroy_2=[];
      var s=0;
      vals.forEach(function (item,index) {

        ad_unzip(item['info'],function (unzip) {
          categroy_2.push(unzip);
          s++;
          if(s==vals.length){

            memcached.set("default_wap_categroy_2",categroy_2,3600*24*30,function (err) {});
          }
        });

      });

    });
    sqlQueryMore("select * from mvm_ad_table where module='default_wap' and pos='categroy_3'",adsql,function (err,vals,xx) {
      if(err) logger.info("Caught exception:"+err);
      var categroy_3=[];
      var s=0;
      vals.forEach(function (item,index) {

        ad_unzip(item['info'],function (unzip) {
          categroy_3.push(unzip);
          s++;
          if(s==vals.length){

            memcached.set("default_wap_categroy_3",categroy_3,3600*24*30,function (err) {});
          }
        });

      });

    });
    sqlQueryMore("select * from mvm_ad_table where module='default_wap' and pos='categroy_4'",adsql,function (err,vals,xx) {
      if(err) logger.info("Caught exception:"+err);
      var categroy_4=[];
      var s=0;
      vals.forEach(function (item,index) {

        ad_unzip(item['info'],function (unzip) {
          categroy_4.push(unzip);
          s++;
          if(s==vals.length){

            memcached.set("default_wap_categroy_4",categroy_4,3600*24*30,function (err) {});
          }
        });

      });

    });
    sqlQueryMore("select * from mvm_ad_table where module='default_wap' and pos='categroy_5'",adsql,function (err,vals,xx) {
      if(err) logger.info("Caught exception:"+err);
      var categroy_5=[];
      var s=0;
      vals.forEach(function (item,index) {

        ad_unzip(item['info'],function (unzip) {
          categroy_5.push(unzip);
          s++;
          if(s==vals.length){

            memcached.set("default_wap_categroy_5",categroy_5,3600*24*30,function (err) {});
          }
        });

      });

    });
    sqlQueryMore("select * from mvm_ad_table where module='default_wap' and pos='categroy_6'",adsql,function (err,vals,xx) {
      if(err) logger.info("Caught exception:"+err);
      var categroy_6=[];
      var s=0;
      vals.forEach(function (item,index) {

        ad_unzip(item['info'],function (unzip) {
          categroy_6.push(unzip);
          s++;
          if(s==vals.length){

            memcached.set("default_wap_categroy_6",categroy_6,3600*24*30,function (err) {});
          }
        });

      });

    });
    sqlQueryMore("select * from mvm_ad_table where module='default_wap' and pos='categroy_7'",adsql,function (err,vals,xx) {
      if(err) logger.info("Caught exception:"+err);
      var categroy_7=[];
      var s=0;
      vals.forEach(function (item,index) {

        ad_unzip(item['info'],function (unzip) {
          categroy_7.push(unzip);
          s++;
          if(s==vals.length){

            memcached.set("default_wap_categroy_7",categroy_7,3600*24*30,function (err) {});
          }
        });

      });

    });
    sqlQueryMore("select * from mvm_ad_table where module='default_wap' and pos='categroy_8'",adsql,function (err,vals,xx) {
      if(err) logger.info("Caught exception:"+err);
      var categroy_8=[];
      var s=0;
      vals.forEach(function (item,index) {

        ad_unzip(item['info'],function (unzip) {
          categroy_8.push(unzip);
          s++;
          if(s==vals.length){

            memcached.set("default_wap_categroy_8",categroy_8,3600*24*30,function (err) {});
          }
        });

      });

    });
    sqlQueryMore("select * from mvm_ad_table where module='default_wap' and pos='categroy_9'",adsql,function (err,vals,xx) {
      if(err) logger.info("Caught exception:"+err);
      var categroy_9=[];
      var s=0;
      vals.forEach(function (item,index) {

        ad_unzip(item['info'],function (unzip) {
          categroy_9.push(unzip);
          s++;
          if(s==vals.length){

            memcached.set("default_wap_categroy_9",categroy_9,3600*24*30,function (err) {});
          }
        });

      });

    });
    sqlQueryMore("select * from mvm_ad_table where module='default_wap' and pos='categroy_10'",adsql,function (err,vals,xx) {
      if(err) logger.info("Caught exception:"+err);
      var categroy_10=[];
      var s=0;
      vals.forEach(function (item,index) {

        ad_unzip(item['info'],function (unzip) {
          categroy_10.push(unzip);
          s++;
          if(s==vals.length){

            memcached.set("default_wap_categroy_10",categroy_10,3600*24*30,function (err) {});
          }
        });

      });

    });
    sqlQueryMore("select * from mvm_ad_table where module='default_wap' and pos='categroy_11'",adsql,function (err,vals,xx) {
      if(err) logger.info("Caught exception:"+err);
      var categroy_11=[];
      var s=0;
      vals.forEach(function (item,index) {

        ad_unzip(item['info'],function (unzip) {
          categroy_11.push(unzip);
          s++;
          if(s==vals.length){

            memcached.set("default_wap_categroy_11",categroy_11,3600*24*30,function (err) {});
          }
        });

      });

    });
    sqlQueryMore("select * from mvm_ad_table where module='default_wap' and pos='categroy_12'",adsql,function (err,vals,xx) {
      if(err) logger.info("Caught exception:"+err);
      var categroy_12=[];
      var s=0;
      vals.forEach(function (item,index) {

        ad_unzip(item['info'],function (unzip) {
          categroy_12.push(unzip);
          s++;
          if(s==vals.length){

            memcached.set("default_wap_categroy_12",categroy_12,3600*24*30,function (err) {});
          }
        });

      });

    });
    sqlQueryMore("select * from mvm_ad_table where module='default_wap' and pos='ad_4'",adsql,function (err,vals,xx) {
      if(err) logger.info("Caught exception:"+err);
      var ad_4=[];
      var s=0;
      vals.forEach(function (item,index) {

        ad_unzip(item['info'],function (unzip) {
          ad_4.push(unzip);
          s++;
          if(s==vals.length){

            memcached.set("default_wap_ad_4",ad_4,3600*24*30,function (err) {});
          }
        });

      });

    });
    sqlQueryMore("select * from mvm_ad_table where module='default_wap' and pos='ad_5'",adsql,function (err,vals,xx) {
      if(err) logger.info("Caught exception:"+err);
      var ad_5=[];
      var s=0;
      vals.forEach(function (item,index) {

        ad_unzip(item['info'],function (unzip) {
          ad_5.push(unzip);
          s++;
          if(s==vals.length){

            memcached.set("default_wap_ad_5",ad_5,3600*24*30,function (err) {});
          }
        });

      });

    });
    sqlQueryMore("select * from mvm_ad_table where module='default_wap' and pos='hot_shop'",adsql,function (err,vals,xx) {
      if(err) logger.info("Caught exception:"+err);
      var hot_shop=[];
      var s=0;
      vals.forEach(function (item,index) {

        ad_unzip(item['info'],function (unzip) {
          hot_shop.push(unzip);
          s++;
          if(s==vals.length){

            memcached.set("default_wap_hot_shop",hot_shop,3600*24*30,function (err) {});
          }
        });

      });

    });
      sqlQueryMore("select * from mvm_ad_table where module='default_wap' and pos='supply'",adsql,function (err,vals,xx) {
          if(err) logger.info("Caught exception:"+err);
        console.log("val:"+vals[0]);


          vals.forEach(function (item,index) {

              ad_unzip(item['info'],function (unzip) {
                  memcached.set("default_wap_supply",unzip,3600*24*30,function (err) {});
              });

          });


      });
      sqlQueryMore("select * from mvm_ad_table where module='default_wap' and pos='point_list'",adsql,function (err,vals,xx) {
        if(err) logger.info("Caught exception:"+err);
      console.log("val:"+vals[0]);


        vals.forEach(function (item,index) {

            ad_unzip(item['info'],function (unzip) {
                memcached.set("default_wap_point_list",unzip,3600*24*30,function (err) {});
            });

        });


    });
  });

  
  
  Promise.all([update_cfg,update_categroy_before]).then(function () {

    res.end('<p>This is end...</p>');
  });
});

module.exports = router;

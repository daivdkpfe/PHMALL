var express = require('express');
var router = express.Router();
var http=require ("http");

/* GET home page. */





router.get('/:s_uid/:m_uid/:fun/:lan', function(req, res, next) {
  var lang=lang_en;
  if(req.session.language=="ch")
  {
    lang=lang_ch;
  }
  var menu=[];
  var SqlArr=[];
  SqlArr.push(req.params.s_uid-0);

  if(req.params.s_uid%1==0 && req.params.m_uid%1==0)
  {
    
  }
  else
  {
    var arr={};
    arr[0]=lang.data_err;
    console.log(lang.data_err);
    res.json(arr).end();
  }

  if(req.params.fun=="get_categroy")//获取菜单列表和菜单里的商品
  {

    var QueryOne = new Promise(function(resolve,reject){
      //查询第一个结果

      memcached.get("categroy_index_"+req.params.s_uid,function (err,data) {
        if(err)
        {
          logger.info("Caught exception:"+err);
        }
        if(typeof (data)=='undefined')
        {
          http.get("./update_cache");
        }
        else{
          resolve(data);
        }


      })


    });

    QueryOne.then(function(results){
      var QueryTwo = new Promise(function(resolve,reject){
        //查询第二张表
        var num=0;

        results.forEach(function(item,index)
        {
          pool.getConnection(function(err, connection) {
            // Use the connection
            connection.query('SELECT * FROM  `mvm_goods_table` WHERE  `supplier_cat` =? and show_status=1 LIMIT 0 , 4', results[index]['uid'],function (error, result,fields) {

              // And done with the connection.
              connection.release();
              // Handle error after the release.
              if (error){

              }
              else
              {
                results[index]['goods_list']=result;

                num=num+1;
                if(num==results.length)
                {
                  resolve(results);
                }

              }

            });

          });
        });

      });
      return QueryTwo;
    }).then(function(result2){
      res.json(result2);
    });
  }
  else if(req.params.fun=="get_shop_info")//获取店铺信息
  {
    var QueryOne = new Promise(function(resolve,reject){
      pool.getConnection(function(err, connection) {
        // Use the connection
        connection.query('SELECT  mvm_member_shop.*, mvm_config.cf_value as tel FROM mvm_member_shop LEFT JOIN mvm_config ON  mvm_member_shop.m_uid= mvm_config.supplier_id WHERE  mvm_member_shop.m_uid=? and mvm_config.cf_name="mm_tel"',req.params.s_uid,function (error, results, fields) {
          // And done with the connection.
          connection.release();
          // Handle error after the release.
          if (error) logger.info("Caught exception:"+error);
          resolve(results);
          // Don't use the connection here, it has been returned to the pool.
        });
      });
    });
    QueryOne.then(function(results){

      var QueryTwo=new Promise(function (resolve,reject) {

        sqlQuery("select * from `mvm_cycle` where supplier_id="+req.params.s_uid+' limit 0,3',function (err,vals,fields) {
          results[0]['cycle']=vals;
          resolve(results);
        });
      });
      return QueryTwo;

    }).then(function(results){

      res.json(results);
    });
  }
  else if(req.params.fun=="get_shop_discount")//獲取折扣商品
  {
    sqlQuery1("SELECT t.uid,t.goods_name,t.goods_file1,t.supplier_id,t.goods_status,t.goods_sale_price,t.goods_hit,t.goods_stock,d.goods_market_price FROM `mvm_goods_table` t left join `mvm_goods_detail` d on t.uid=d.g_uid WHERE t.supplier_id=? AND type=3 AND show_status=1 ORDER BY register_date DESC LIMIT 0,8", SqlArr,function (err,vals,fields) {
      if(err) logger.info("Caught exception:"+err);
      res.json(vals);
    })

  }
  else if(req.params.fun=="get_shop_new")//獲取新品
  {
    sqlQuery1("SELECT t.uid,t.goods_name,t.goods_file1,t.supplier_id,t.goods_status,t.goods_sale_price,t.goods_hit,t.goods_stock,t.register_date,d.goods_market_price FROM `mvm_goods_table` t left join `mvm_goods_detail` d on d.g_uid=t.uid WHERE supplier_id=1 AND type IN (0,1) AND show_status=? ORDER BY register_date DESC LIMIT 0,8", SqlArr,function (err,vals,fields) {
      if(err) logger.info("Caught exception:"+err);

      var team=[];

      var afterEscaps = vals.map(function (item) {
        item['register_date']=new Date(parseInt(item['register_date']) *1000 ).toLocaleString().replace(/\d{1,2}:\d{1,2}:\d{1,2}$/,'').replace(' ','');
        return item;
      });
      res.json(afterEscaps);
    })

  }
  else
  {
    res.status("501").end();
  }

});
router.get("/",function (req,res,next) {
  var lang=lang_en;
  if(req.session.language=="ch")
  {
    lang=lang_ch;
  }
  
    res.render('index', { title: 'PHMALL',lang:lang,concig:config});

});


router.post("/",function (req,res,next) {

  memcached.getMulti(['default_wap_flash','default_wap_coupon','default_wap_hot_info','default_wap_ad_1','default_wap_ad_2','default_wap_ad_3','default_wap_categroy_1','default_wap_categroy_2','default_wap_categroy_3','default_wap_categroy_4','default_wap_categroy_5','default_wap_categroy_6','default_wap_categroy_7','default_wap_categroy_8','default_wap_categroy_9','default_wap_categroy_10','default_wap_categroy_11','default_wap_categroy_12','default_wap_ad_4','default_wap_ad_5','default_wap_hot_shop'], function (err, data) {
      var categroys=[];
      categroys.push(data.default_wap_categroy_1[0]);
      categroys.push(data.default_wap_categroy_2[0]);
      categroys.push(data.default_wap_categroy_3[0]);
      categroys.push(data.default_wap_categroy_4[0]);
      categroys.push(data.default_wap_categroy_5[0]);
      categroys.push(data.default_wap_categroy_6[0]);
      categroys.push(data.default_wap_categroy_7[0]);
      categroys.push(data.default_wap_categroy_8[0]);
      categroys.push(data.default_wap_categroy_9[0]);
      categroys.push(data.default_wap_categroy_10[0]);
      categroys.push(data.default_wap_categroy_11[0]);
      categroys.push(data.default_wap_categroy_12[0]);
      data['categroys']=categroys;
      console.log(categroys);
      res.json(data);
  });

});

router.post("/get_onsale",function (req,res,next){
    var sql=[];

  var end=(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000)/1000;
  end=end-3600*8;
  var start=end-3600*24;
  sql.push(start);
  sql.push(end-1);
    sqlQueryMore('select * from `mvm_goods_onsale` where start_date<=? and end_date=? and goods_stock>0 and show_status=1',sql,function (err,vals,xx) {
        if(err) logger.info("Caught exception:"+err);
        var s=0;
        if(vals.length>0)
        {
          vals.forEach(function (item,index) {
            var sqls=[];
            sqls.push(item.uid);
            sqlQueryMore('select goods_market_price from `mvm_goods_onsale_detail` where g_uid=?',sqls,function (errs,valss,xxs) {
              if(errs) logger.info("Caught exception:"+errs);
              vals[index]['price']=valss[0].goods_market_price;
              s++;
              console.log(vals.length);
              console.log(s);
              if(s==vals.length)
              {
                res.json(vals);
              }
            })
          })
        }
        else
        {
          res.json("");
        }


    })
})



module.exports = router;



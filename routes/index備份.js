var express = require('express');
var router = express.Router();
var http=require ("http");

/* GET home page. */




router.get('/:s_uid/:m_uid/:fun/:lan', function(req, res, next) {
  var menu=[];
  var SqlArr=[];
  SqlArr.push(req.params.s_uid-0);

  if(req.params.s_uid%1==0 && req.params.m_uid%1==0)
  {

  }
  else
  {
    var arr={};
    arr[0]="數據不對";
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
          http.get("http://192.168.0.105/update_cache");
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
          if (error) logger.info("Caught exception:"+err)or;
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
    sqlQuery1("SELECT uid,goods_name,goods_file1,supplier_id,goods_status,goods_sale_price,goods_hit,goods_stock FROM `mvm_goods_table` WHERE supplier_id=? AND type=3 AND show_status=1 ORDER BY register_date DESC LIMIT 0,8", SqlArr,function (err,vals,fields) {
      if(err) logger.info("Caught exception:"+err);



      res.json(vals);
    })

  }
  else if(req.params.fun=="get_shop_new")//獲取新品
  {
    sqlQuery1("SELECT t.uid,t.goods_name,t.goods_file1,t.supplier_id,t.goods_status,t.goods_sale_price,t.goods_hit,t.goods_stock,d.goods_market_price,t.register_date  FROM `mvm_goods_table` t left join `mvm_goods_detail` d on d.g_uid=t.uid WHERE supplier_id=1 AND type IN (0,1) AND show_status=? ORDER BY register_date DESC LIMIT 0,8", SqlArr,function (err,vals,fields) {
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




module.exports = router;



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


        resolve(data);

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
        connection.query('SELECT *  FROM `mvm_member_shop` where m_uid=?',req.params.s_uid,function (error, results, fields) {
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
    sqlQuery1("SELECT uid,goods_name,goods_file1,supplier_id,goods_status,goods_sale_price,goods_hit,goods_stock FROM `mvm_goods_table` WHERE supplier_id=? AND type IN (0,1) AND show_status=1 ORDER BY register_date DESC LIMIT 0,8", SqlArr,function (err,vals,fields) {
      if(err) logger.info("Caught exception:"+err);



      res.json(vals);
    })

  }
  else
  {
    res.status("501").end();
  }

});




module.exports = router;



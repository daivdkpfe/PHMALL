var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
global.lanuage_ch=require("./lanuage/lanuage_ch.js");
global.lanuage_en=require('./lanuage/lanuage_en.js');


/*路由*/
var index = require('./routes/index');
var search = require('./routes/search');
var user_info = require('./routes/user_info');
var update_cache = require('./routes/update_cache');
var oauth_login=require('./routes/oauth_login');
var register=require('./routes/register');
var login=require('./routes/login');
var member_order=require('./routes/member_order');
var member_index=require('./routes/member_index');
var config_order=require('./routes/config_order');
var comment=require('./routes/comment');
var coupon=require('./routes/coupon');
var category=require('./routes/category');
var favorite=require('./routes/favorite');
var favorite_list=require('./routes/favorite_list');
var cart=require('./routes/cart');
var group_list=require('./routes/group_list');
var member_ddata=require('./routes/member_data');
var member_safe=require('./routes/member_safe');
var area=require('./routes/area');
var change_pass=require('./routes/change_pass');
var change_phone=require('./routes/change_phone');
var change_email=require('./routes/change_email');
var address=require('./routes/address');
var address_add=require('./routes/address_add');
var brand=require('./routes/brand');
var brand_product=require('./routes/brand_product');
var news=require('./routes/news');
var news_detail=require('./routes/news_detail');
var account=require('./routes/account');
var withdraw=require('./routes/withdraw');
//

var unionProduct=require('./routes/union/product');
var unionIndex=require('./routes/union/index');
var unionCoupon=require('./routes/union/coupon');

// 路由
var app = express();

/*
* SESSION
* */
app.use(cookieParser());
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: true, // don't create session until something stored
  secret: 'mvm_',
  cookie:{maxAge: 3600*24*7*10}
}));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public 放置你的圖標在public裏面
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));




// 路由
app.use('/',index);
app.use('/index',index);
app.use('/search',search);
app.use('/user_info',user_info);
app.use('/update_cache',update_cache);
app.use('/oauth_login',oauth_login);
app.use('/register',register);
app.use('/login',login);
app.use('/member_order',member_order);
app.use('/member_index',member_index);
app.use('/config_order',config_order);
app.use('/comment',comment);
app.use('/coupon',coupon);
app.use('/category',category);
app.use('/favorite',favorite);
app.use('/favorite_list',favorite_list);
app.use('/cart',cart);
app.use('/group_list',group_list);
app.use('/member_data',member_ddata);
app.use('/member_safe',member_safe);
app.use('/change_pass',change_pass);
app.use('/change_phone',change_phone);
app.use('/change_email',change_email);
app.use('/area',area);
app.use('/address',address);
app.use('/address_add',address_add);
app.use('/brand',brand);
app.use('/brand_product',brand_product);
app.use('/news',news);
app.use('/news_detail',news_detail);
app.use('/account',account);
app.use('/withdraw',withdraw);
//

app.use('/union/product',unionProduct);
app.use('/union/index',unionIndex);
app.use('/union/coupon',unionCoupon);

// 路由


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

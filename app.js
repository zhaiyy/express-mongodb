var express = require('express');//加载express
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');//加载morgan,主要功能是在控制台中，显示req请求的信息
var cookieParser = require('cookie-parser');//支持cookie
var bodyParser = require('body-parser');

var index = require('./routes/index');//引入一个自定义的路由中间件
var users = require('./routes/users');//引入一个自定义的路由中间件
var welcome = require('./routes/welcome');

var app = express();//创建app
var server = require('http').createServer(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));//设置模板文件路径
app.set('view engine', 'ejs');//使用ejs模板引擎

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);//将自定义的路由中间件挂载到应用上
app.use('/users', users);//将自定义的路由中间件挂载到应用上
app.use('/welcome', welcome);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');//404中间件
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

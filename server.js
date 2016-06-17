/**
* 本地服务器
* Created by liubingi on 2016-06-16.
*/
var path = require('path');
var express = require('express');
var app = express();



var console = require('./modules/log');
var apiProxy = require('./modules/apiProxy');
var localData = require('./modules/localData');

var port = 30785;
var rootDir = path.join(__dirname, '../');


var API_TIMEOUT = 3000;

runServer();

function runServer(cb){
  // TODO:过滤、路径写死、接口错误监控、错误页跳转、对pm2监控

  app.options('*', function(req, res){
    res.header("Access-Control-Allow-Origin", 'http://mm.ffan.com:3001');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, accept, content-type");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS,TRACE");
    res.header("Content-Type", "application/json;charset=utf-8");
    res.end('ok')
  });

  apiProxy(app);
  localData(app);

  // js、css、html静态资源
  app.use('/static', express.static(path.join(rootDir + '/static')));
  app.use('/view', express.static(path.join(rootDir + '/view')));
  app.use('/favicon.ico', express.static(path.join(rootDir + '/favicon.ico')));

  app.use('/guofu', function(req, res){

  });

  app.listen(port, 'localhost', function(err) {
    if (err) {
      console.log(err);
      return;
    }
    cb&&cb();
    console.log('Listening at http://localhost:'+ port);
  });
}

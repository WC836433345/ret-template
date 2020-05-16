process.env.NODE_ENV = 'development';

const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const proxy = require('express-http-proxy');


const app = express();
const config = require('./webpack.config.dev.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: "",
  logLevel: 'silent', // 清楚不必要的打印日志
}));

// 增加热重载
app.use(require("webpack-hot-middleware")(compiler,{
  // log: false, // 清楚不必要的打印日志
}));


// 打开浏览器监听
// open("http://localhost:3000");
app.use('/',proxy("https://oa-test01.sheincorp.cn"));

// Serve the files on port 3000.
app.listen(3088, function () {
  console.log('Example app listening on port 3088!\n');
});
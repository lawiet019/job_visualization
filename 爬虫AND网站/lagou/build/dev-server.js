require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var shanghai = require("../json/shanghai.json")
var beijing = require("../json/beijing.json")
var shenzhen = require("../json/shenzhen.json")
var front = require("../json/front.json")
var php = require("../json/php.json")
var java = require("../json/java.json")
var  design = require("../json/design.json")
var product = require("../json/product.json")
var  data = require("../json/data.json")

var china = require("../json/china.json")
var guangzhou = require("../json/guangzhou.json")
var compiler = webpack(webpackConfig)
app.get("/beijing",function(req,res){
res.json({
  errno:0,
 
  data:beijing
 
 });
})
app.get("/front",function(req,res){
res.json({
 
  errno:0,
 
  data:front
 
 });
})
app.get("/php",function(req,res){
res.json({
 
  errno:0,
 
  data:php
 
 });
})
app.get("/java",function(req,res){
res.json({
 
  errno:0,
 
  data:java
 
 });
})
app.get("/design",function(req,res){
res.json({
 
  errno:0,
 
  data:design
 
 });
})
app.get("/product",function(req,res){
res.json({
 
  errno:0,
 
  data:product
 
 });
})
app.get("/data",function(req,res){
res.json({
 
  errno:0,
 
  data:data
 
 });
})
app.get("/china",function(req,res){
res.json({
 
  errno:0,
 
  data:china
 
 });
})
app.get("/shanghai",function(req,res){
res.json({
 
  errno:0,
 
  data:shanghai
 
 })
})
app.get("/shenzhen",function(req,res){
res.json({
 
  errno:0,
 
  data:shenzhen
 
 })
})
app.get("/shenzhen",function(req,res){
res.json({
 
  errno:0,
 
  data:shenzhen
 
 })
})
app.get("/guangzhou",function(req,res){
res.json({
 
  errno:0,
 
  data:guangzhou
 
 })
})
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}

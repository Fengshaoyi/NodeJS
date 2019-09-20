/**
 * 原生模块，跟随node安装环境安装就存在的模块
 * 引入关键字 require("模块")；
 * require得到的是一个结构复杂的对象，
 * 可以通过该对象调用相应的方法辅助完成编程任务
 */
const http = require("http");
const fs = require("fs");   // 读
const path = require("path");   // 拼接

http.createServer(function(req, res) {
    console.log(fs);
    var filePath = path.join(__dirname, "/module1.js");
    res.end();
}).listen(8081);

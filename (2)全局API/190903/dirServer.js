// 1. 引入http原生模块
const http = require("http");
const fs = require("fs");
const url = require("url");
/**
 * URL模块用于解析和处理URL字符串
 */
const path = require("path");

// 2. 创建一个服务器， 只要有http请求，访问端口，就会执行回调函数里面的内容
// 人为发起一个请求：8081； 
// 执行回调函数，req（一个很长的对象），内有属性req.url  （/s?id=77777777...）
// => 是url地址当中，端口以后的所有内容（需要资源路径）
// 使用url.parse 将req.url转化为了对象，
// 对象提取pathname => pathname（资源路径）
// 根据资源路径，可以决定执行哪一段代码

// 页面自己发起一个请求， 请求.js,   ==>  只要有请求，就会执行回调函数，资源路径变化，urlPathName == "/js/index.js"
var server = http.createServer(function(req,res) {
    /**回调函数，当有请求访问8081的时候才会执行 */
    var urlObj = url.parse(req.url);     // console.log(urlObj);
    var urlPathName = urlObj.pathname;
    // console.log(urlPathName);    // 输出两个请求，一个是8081，另一个是再次从服务器端获取的.js文件    
    // console.log("req.url    " + req.url);
    if(urlPathName == "/favicon.ico") { 
        res.end();
    }
    else if(urlPathName == "/") {
        var htmlPath = __dirname + "\\view\\index.html";
        var htmlContent = fs.readFileSync(htmlPath);
        htmlContent = htmlContent.toString("utf8");

        res.writeHead(200, {"Content-Type":"text/html"});
        res.write(htmlContent);
        res.end();
    } 
    else if(urlPathName == "/js/index.js"){
        var jsPath = path.join(__dirname, "/js/index.js");
        var jsContent = fs.readFileSync(jsPath);    // console.log(jsContent);

        res.writeHead(200,{"Content-Type":"text/javascript"});
        res.write(jsContent);
        res.end();
    }
    
// 4. 当客户端的http请求发起的时候，才会执行回调函数里面的内容
    // var htmlPath = __dirname + "\\view\\index.html";/**仅限于Window系统的斜线 */
    // var htmlContent = fs.readFileSync(htmlPath);
    // htmlContent = htmlContent.toString("utf8");

    // // console.log("htmlPath          " + htmlPath);
    // // console.log("htmlContent       " + htmlContent);

    // res.writeHead(200, {"Content-Type":"text/html"});
    // res.write(htmlContent);
    // res.end();
    // // res.end("接收到客户端请求"); 
});

// 3. 服务监听一个端口
server.listen(8081);
console.log("server is listening 8081");


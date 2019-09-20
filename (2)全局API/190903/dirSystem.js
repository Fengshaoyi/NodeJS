// 1. 引入http原生模块
const http = require("http");
const fs = require("fs");

// 2. 创建一个服务器
var server = http.createServer(function(req,res) {
    /**回调函数，当有请求访问8081的时候才会执行 */
// 4. 当客户端的http请求发起的时候，才会执行回调函数里面的内容

    var sys = process.platform;//当前运行平台
    // console.log("sys    " + sys);   //sys    win32
    var htmlPath = "";
    switch(sys) {
        case "linux":
            htmlPath = __dirname + "/view/index.html";
            break;
        case "win32":
            htmlPath = __dirname + "\\view\\index.html";
            break;
        default:
            console.log("known system");
            break;
    }

    // var htmlPath = __dirname + "\\view\\index.html";
    /**仅限于Window系统的斜线 */
    var htmlContent = fs.readFileSync(htmlPath);
    htmlContent = htmlContent.toString("utf8");

    // console.log("htmlPath          " + htmlPath);
    // console.log("htmlContent       " + htmlContent);

    res.writeHead(200, {"Content-Type":"text/html"});
    // res.write(htmlContent);
    res.end();
    // res.end("接收到客户端请求");
});

// 3. 服务监听一个端口
server.listen(8081);
console.log("server is listening 8081");
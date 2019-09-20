const http = require("http");
const path = require("path"); 
const fs = require("fs");   // 读文件内容

http.createServer(function(req, res) {
    var htmlPath = path.join(__dirname, "/view/view.html");
    console.log(htmlPath);
    var htmlContent = fs.readFileSync(htmlPath);
    htmlContent = htmlContent.toString("utf8"); //转化成字符串

    // 向客户端响应
    res.writeHead(200, {"Content-Type":"text/html"});
    res.write(htmlContent);
    res.end();
}).listen(8080);

console.log("server is listening 8080");

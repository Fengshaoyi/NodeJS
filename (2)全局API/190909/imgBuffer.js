const http = require("http");
const fs = require("fs");
const path = require("path");
/**
 * 1.将图片的二进制数据转化为base64字符串编码格式，
 * 将base64字符编码直接存到网页中，
 * 浏览器可以识别该编码，
 * 将该编码转化为一个图片显示
 * 2.适用于图片较小的情况，减少http的请求数量，提高页面性能
 */
http.createServer(function(req, res){
    var imgPath = path.join(__dirname, "/1.png");
    var imgBuffer = fs.readFileSync(imgPath); // readFileSync结果就是十六进制码
    console.log("imgBuffer  " + imgBuffer);
    var base64Data = imgBuffer.toString("base64");
    // console.log(bath64Data);
    var imgSrc = "data:image/png; base64," + base64Data;
    var htmlStr = "<!DOCTYPE html><head></head>" + 
                        "<body><img src = '" + imgSrc + "'/></body>" + 
                        "</html>";
    res.writeHead(200, {"Content-Type":"text/html"});// 200 : 状态码（前面处理正常）
    res.write(htmlStr);
    res.end();
}).listen(8081);
console.log("server is listening 8081");
const http = require("http");
/**
 * 使用require指令来载入http模块，并将其实例化赋值给变量http
 */
var server = http.createServer(function(req, res) /*请求，响应*/ {   
//回调函数
/**
 * 使用http.createServer()方法创建服务器，并绑定服务监听端口，
 * 函数中可以使用request/response参数来接受和响应数据
 * res：向请求的客户端发送响应内容，response.end()前，response.write()可以被执行多次
 */
    // res.write("hello world");
    res.writeHead(200,{"Content-Type":"text/plain"});//该格式不可以识别HTML结构
    res.writeHead(200,{"Content-Type":"text/html"});//该格式可以识别HTML结构
    res.write("<h1>helloWorld -- H1</h1>");
    res.end(); // 响应结束
});
server.listen(8088);
console.log("server is listening 8088");
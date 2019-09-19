const http  = require("http"); //引入http模块

/** 实例化server */
var server = new http.Server(); 
/** sever监听客户端的请求 */
server.on("request", function(req, res) {
    res.end("hello server"); 
})
server.listen(8082);//监听端口
console.log("server is listening 8082");

var http = require("http");
var server = http.createServer(function(req,res){
    res.end("ending");
});
server.listen(8080);
console.log("server is listening 8080");
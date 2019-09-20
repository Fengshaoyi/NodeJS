// 1. 引入http原生模块
const http = require("http");
const fs = require("fs");
/* fs模块用于对系统文件及目录进行读写操作 */
const path = require("path");
/* path模块提供处理文件路径的小工具，
 * path.join 用于连接路径（拼接）
 * 正确使用当前系统的路径分隔符，
 * Unix系统是"/"，Windows系统是"\"  */
 
// 2. 创建一个服务器
var server = http.createServer(function(req,res) {
    /**回调函数，当有请求访问8081的时候才会执行 */
// 4. 当客户端的http请求发起的时候，才会执行回调函数里面的内容
    var htmlPath = path.join(__dirname, "/view/index.html"); 
    var htmlContent = fs.readFileSync(htmlPath); /**这是原始二进制数据在缓冲区中的内容，同步读取文件 */
    htmlContent = htmlContent.toString("utf8");  /**要显示文件内容可以使用toString()或者设置输出编码 */
    // 变成utf-8的文档，HTML代码的形式
    res.writeHead(200, {"Content-Type":"text/html"});
    res.write(htmlContent);
    res.end();
});

// 3. 服务监听一个端口
server.listen(8081); 
console.log("server is listening 8081");
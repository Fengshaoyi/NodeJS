const http = require('http');

//定义路由表
var routeTable = {
    '/' : (req, res) => {
        res.end('This is home page');
    },

    '/help' : (req, res) => {
        res.end('no help');
    }
};

http.createServer((req, res) => {
    let path_spilt = req.url.split('?');
    let path = path_spilt[0];

    if (routeTable[path] == undefined) {
        res.statusCode = 404;
        res.write('<!DOCTYPE html><html><head><meta charset="utf-8">');
        res.write('<title>404 page</title></head><body><div>');
        res.write('<h1>404: page not found</h1>');
        res.write('</div></body></html>');
        res.end(); //传输完毕，关闭连接
        return ;
    }
    routeTable[path](req, res);
})
.listen(8080);

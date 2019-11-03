/**
 * 1、页面呈现
 * 访问特定的资源路径显示对应页面
 * 2、博客列表
 * 数据从服务端获取，通过jquary ajax从服务端获取数据
 * $.get("",function(data){
 *  
 * })
 * 3、阅读全文是超链接形式
 * http://localhost:8081/detail?chapterId=  资源路径是detail时打开对应chapterId对应值的页面
 * 4、文章的详情页
 * 内容呈现，再发起一次请求$.get()
 */

const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");
const queryString = require('querystring');
let { chapterList, userList } = require('./data');

http.createServer(function(req,res){
    var urlObj = url.parse(req.url);
    var pathName = urlObj.pathname;
    if(pathName == "/list"){
        showList(res);
    }
    else if(pathName == "/detail"){
        showDetail(res);
    }
    else if(pathName == "/login/"){
        loginIn(res);
    }
    else if(pathName == "/listmanager/"){
        showArticale(res);
    }
    else if(pathName == "/addChapter/"){
        addChapter(res);
    }
    else if (urlObj.pathname == '/getChapterList') {
        var str = JSON.stringify(chapterList);
        res.end(str);
    }
    else if (urlObj.pathname == '/loginIn') {
        var postData = "";
        req.on("data", function (chunk) {
            postData += chunk;
        });
        req.on("end", function () {
            var username = queryString.parse(postData).username;
            var password = queryString.parse(postData).password;
            for (var i = 0; i < userList.length; i++) {
                if (userList[i].username == username && userList[i].pwd == password) {
                    data = 1;
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(data));
                }
                    data = 0;
                    console.log(data);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(data)); 
                
            }
            
        });
    }
    else if (urlObj.pathname == '/getDetail') {
        console.log(urlObj.pathname);
        var chapterId = queryString.parse(urlObj.query).chapterId;
        var dataList = [];
        chapterList.forEach((data, index) => {
            if (data.chapterId == chapterId) {
                dataList.push(data);
            }
        })
        res.writeHead(200, { 'Content-Type': 'application/json' });
        var str = JSON.stringify(dataList);
        res.end(str);

    }
    else if (urlObj.pathname == '/add') {
        var postData = "";
        req.on("data", function (chunk) {
            postData += chunk;
        });
        req.on("end", function () {
            var data = queryString.parse(postData);
            var date = new Date();
            var title = data.title;
            var content = data.content;
            var blog = {
                "chapterId": chapterList[chapterList.length - 1].chapterId + 1,
                "chapterName": title,
                "imgPath": "",
                "chapterDes": content,
                "chapterContent": content,
                "publishTimer": `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
                "author": "admin",
                "views": 0
            }
            chapterList.push(blog);
            data = { code: 0 };
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
        });
    }
    else if (urlObj.pathname == "/delChapter") {
        var chapterId = queryString.parse(urlObj.query).chapterId;
        console.log(urlObj.query);
        for (var i = 0; i < chapterList.length; i++) {
            if (chapterList[i].chapterId == chapterId) {
                chapterList.splice(i, 1);
                data = 1;
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(data));
            }
        }
        data = 0;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
    }

    
    else {
        var htmlPath = path.join(__dirname, "素材", urlObj.pathname);
        if (urlObj.pathname.indexOf("js") >= 0) {
            var htmlContent = fs.readFileSync(htmlPath);
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.end(htmlContent);
        } else if (urlObj.pathname.indexOf("css") >= 0) {
            var htmlContent = fs.readFileSync(htmlPath);
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(htmlContent);
        } else if (urlObj.pathname.indexOf("png") >= 0) {
            var htmlContent = fs.readFileSync(htmlPath);
            res.writeHead(200, { 'Content-Type': 'image/png' });
            fs.createReadStream(htmlPath).pipe(res);
        } else if (urlObj.pathname.indexOf("jpg") >= 0 || urlObj.pathname.indexOf("jpeg") >= 0) {
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            fs.createReadStream(htmlPath).pipe(res);
        } else {
            res.writeHead(200, { 'Content-Type': 'text/plane; charset=utf-8' });
            console.log(urlObj.pathname);
        }
    }
}).listen(8081);
console.log("server is listening 8081");

function showList(res){
    var listPath = path.join(__dirname,"素材/chapterList.html");
    var fileContent = fs.readFileSync(listPath);
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    res.end(fileContent);
}
function showDetail(res){
    var detailPath = path.join(__dirname,"素材/chapter.html");
    var detailContent = fs.readFileSync(detailPath);
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    res.end(detailContent);
}
function loginIn(res){
    var loginPath = path.join(__dirname,"素材/login.html");
    var loginContent = fs.readFileSync(loginPath);
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    res.end(loginContent);
}
function showArticale(res){
    var articalePath = path.join(__dirname,"素材/list.html");
    var articaleContent = fs.readFileSync(articalePath);
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    res.end(articaleContent);
}
function addChapter(res){
    var chapterPath = path.join(__dirname,"素材/addChapter.html");
    var chapterContent = fs.readFileSync(chapterPath);
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    res.end(chapterContent);
}

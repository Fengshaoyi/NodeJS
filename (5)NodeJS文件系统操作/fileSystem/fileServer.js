/**
 * 1、debugger 设置断点
 * 2、node inspect/debug 文件名
 * 3、c 继续执行
 * 4、watch(变量名);
 * 5、watchers 查看监听的变量
 * 6、unwatch('变量名') 监听变量移除
 * 7、restart 重启脚本
 */
const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");
debugger;//设置断点

http.createServer(function(req,res){
    var urlObj = url.parse(req.url,true);//将括号内转换为对象
    debugger;//设置断点
    var pathName = urlObj.pathname;
    switch(pathName){
        //http://localhost:8081/ 当请求为此<=时 调用
        case "/":
            showIndex(res);
            break;
        /**
         * 网页文件在浏览器解析的过程中，如果需要一些资源，
         * 会再次的向服务器端发起请求。图片、音频、视频、
         * js脚本、css文件
         */
        case "/1.png":
            showImg(res);
            break;
        case "/getfilelist":
            showList(res);
            break;
        case "/delfile":
            delFile(urlObj,res);
            break;
        case "/getfile":
            getFile(urlObj,res);
            break;
        case "/getchildfile":
            getChildFile(urlObj,res);
            break;
    }
}).listen(8081);
console.log("Server is listening 8081");

function showIndex(res){
    debugger;//设置断点
    var indexPath = path.join(__dirname,"index.html");
    var fileContent = fs.readFileSync(indexPath);//读到的buffer文件
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write(fileContent);
    res.end();
}

function showImg(res){
    var imgPath = path.join(__dirname,"1.png");
    var imgContent = fs.readFileSync(imgPath);//readFile读到的都是二进制数据
    res.writeHead(200,{"Content-Type":"image/png"});
    res.write(imgContent);
    res.end();
}

var list = [];
function showList(res){
    list = [];
    var filePath = path.join(__dirname,"fileDir");
    var files = fs.readdirSync(filePath);//读相应目录下文件内容，file是数组，读到所有文件名字
    //console.log(files);
    for(var i = 0;i < files.length; i++){
        var fileObj = {};
        var childPath = path.join(filePath,files[i]);
        var statObj = fs.statSync(childPath);
        fileObj.fileType = fs.statSync(childPath);//定义文件类型
        //console.log(statObj);
        if(statObj.isFile()){
            fileObj.fileType = "file";
        }
        else if(statObj.isDirectory()){
            fileObj.fileType = "folder";
        }
        fileObj.fileName = files[i];
        fileObj.fileSize = statObj.size;
        var birthTimer = new Date(statObj.birthtime);
        fileObj.createTime = birthTimer.getFullYear() + "-" + (birthTimer.getMonth()+1)
            + "-" + birthTimer.getDate() + ":" + birthTimer.getHours() + 
            ":" + birthTimer.getMinutes() + ":" + birthTimer.getSeconds();
        list.push(fileObj);
    }
    var listStr = JSON.stringify(list);
    res.writeHead(200,{"Content-Type":"text/plain"});
    res.write(listStr);
    res.end();
}

function delFile(urlObj,res){
    //console.log(urlObj);
    //假定每个文件创建时间不同
    var timer = urlObj.query.createtime;//此处cteatetime是传到jQuery中地址的timer，注意一致性
    //console.log(timer);
    for(var i = 0;i < list.length; i++){
        if(list[i].createTime == timer){
            deleteRealFile(list[i].fileName);
        }
    }
    res.end("success");
}

function deleteRealFile(fileName){//删除文件
    //console.log(fileName);
    var filePath = path.join(__dirname,"fileDir",fileName);
    var statObj = fs.statSync(filePath);
    if(statObj.isFile()){
        fs.unlinkSync(filePath);
    }
    else if(statObj.isDirectory()){
        delDir(filePath);
    }
}

function delDir(filePath){//删除文件夹,递归调用
    var files = fs.readdirSync(filePath);//读目录下包含文件及文件夹名字
    for(var i = 0; i < files.length; i++){
        var childPath = path.join(filePath,files[i]);
        var childStatObj = fs.statSync(childPath);
        if(childStatObj.isFile()){
            fs.unlinkSync(childPath);
        }
        else if(childStatObj.isDirectory()){
            delDir(childPath);//递归
        }
    }
    fs.rmdirSync(filePath);//删除文件及文件夹
}

function getFile(urlObj,res){
    var createTime = urlObj.query.createtime;
    console.log(createTime);
    for(var i = 0; i < list.length; i++){
        if(list[i].createTime == createTime){
            showContent(list[i].fileName,res);
        }
    }
}

function showContent(fileName,res){
    //console.log(fileName);
    var filePath = path.join(__dirname,"fileDir",fileName);
    fs.readFile(filePath,function(err,data){
        if(err){
            console.log(err);
        }
        else{
            res.end(data);
        }
    })
}

function getChildFile(urlObj,res){
    var timer = urlObj.query.createtime;
    for(var i = 0;i < list.length; i++){
        if(list[i].createTime == timer){
            getChildList(list[i].fileName,res);
        }
    }
}

//单一原则，单一函数的功能越少越好，代码尽可能纯粹
function getChildList(fileName,res){
    var filePath = path.join(__dirname,"firDir",fileName);
    var files = fs.readdirSync(filePath);
    var childList = [];
    for(var i = 0; i < files.length; i++){
        var fileObj = {};
        var statObj = fs.statSync(path.join(filePath,files[i]));
        if(statObj.isFile()){
            fileObj.fileType = "file";
        }
        else if(statObj.isDirectory()){
            fileObj.fileType = "folder";
        }
        fileObj.fileName = files[i];
        fileObj.fileSize = statObj.size;
        fileObj.createTime = birthTimer.getFullYear() + "-" + (birthTimer.getMonth()+1)
            + "-" + birthTimer.getDate() + ":" + birthTimer.getHours() + 
            ":" + birthTimer.getMinutes() + ":" + birthTimer.getSeconds();
        childList.push(fileObj);
    }
    var childStr = JSON.stringify(childList);
    res.end(childStr);
}
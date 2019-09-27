const fs = require("fs");
const path = require("path");

var fileName = process.argv[2];
var pathName = path.join(__dirname,fileName);
//先判断文件是否存在
if(fs.existsSync(pathName)){
    var statObj = fs.statObj(pathName);
    if(statObj.isFile()){
        fs.unlinkSync(pathName);
    }
    else{
        delDir(pathName);
    }
}
else{
    console.log("not exist");
}

function delDir(pathName){
    var files = fs.readdirSync(pathName);
    for(var i = 0;i < files.length; i++){
        pathName1 = path.join(pathName,files[i]);
        var statObj = fs.statSync(pathName1);
        if(statObj.isFile()){
            fs.unlinkSync(pathName1);
        }
        else if(statObj.isDirectory()){
            delDir(pathName1);//递归调用
        }
        fs.rmdirSync(pathName);
    }
}
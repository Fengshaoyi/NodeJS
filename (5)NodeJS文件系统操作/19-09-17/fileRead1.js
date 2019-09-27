const fs = require("fs");
const path = require("path");

var filePath = path.join(__dirname,"/file.txt");
var filePath1 = path.join(__dirname,"/file1.txt");
//凡是带sync的都是同步读取 不带的都是异步读取
console.time("test");
var fileContent = fs.readFileSync(filePath);
console.timeEnd("test");
var fileContent1 = fs.readFileSync(filePath1);

console.log(fileContent.toString());//不加toString()得到的是buffer数据
console.log(fileContent1.toString());
console.log("read end");
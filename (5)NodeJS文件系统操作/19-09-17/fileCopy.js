const fs = require("fs");
const path = require("path");
var filePath = path.join(__dirname,"/file.txt");
var filePath1 = path.join(__dirname,"/file1.txt");
var fileContent = fs.readFileSync(filePath);
var statObj = fs.statSync(filePath);
/**写入文件内容 */
fs.writeFileSync(filePath,fileContent.toString());
/**写入文件权限 */
fs.chmodSync(filePath1,statObj.mode);
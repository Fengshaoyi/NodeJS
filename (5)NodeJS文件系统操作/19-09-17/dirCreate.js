const fs = require("fs");
const path = require("path");
fs.mkdirSync("hello");
var list = fs.readdirSync(__dirname);
console.log(list);
/**先删里层文件，再删外层文件夹 */
var files = fs.readdirSync(path.join(__dirname,"/node"));

fs.unlinkSync(path.join(__dirname,"/node/"+ files[0]));

fs.rmdirSync(path.join(__dirname,"/node"));

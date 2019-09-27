/**
 * source
 */
const fs = require("fs");
var filePath = path.join(__dirname,"/stream.txt");
var writePath = path.join(__dirname,"/write.txt");
var readStream = fs.createReadStream(filePath);
var writeStream = fs.createReadStream(writePath);
readStream.pipe(writeStream);//连接
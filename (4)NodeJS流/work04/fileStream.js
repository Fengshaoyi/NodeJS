const fs = require("fs");

var filePath = path.join(__dirname,"/from.txt");
var writePath = path.join(__dirname,"/to.txt");

var writeStream = fs.createWriteStream(filePath);

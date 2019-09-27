const http = require("http");
const fs = require("fs");
http.createServer(function(req,res){
    fs.readFile("./1.png",function(err,data){
        //console.log(data);
        res.write(200,{"Content-Type":"image/png"});
        res.write(data);
        res.end();
    })
}).listen(8081);
console.log("server is listening 8081");
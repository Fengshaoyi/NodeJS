const stream = require("stream");

var reader = new stream.Readable();
reader.push("hello");//相当于往内存里加数据
reader.push("world");
reader.push(null);//停止加入数据
reader.pipe(process.stdout);//输出
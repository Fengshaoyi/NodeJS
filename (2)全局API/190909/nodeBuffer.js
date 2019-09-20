// 初始化一个Buffer
var buf = Buffer.alloc(10); // 长度为10
console.log(buf);   // 每两个十六进制表示一个字节  <Buffer 00 00 00 00 00 00 00 00 00 00>

// 将一个utf-8编码的字符串转化为buffer数据
var buf1 = Buffer.from("hello", "utf-8");
console.log(buf1);      // <Buffer 68 65 6c 6c 6f>
console.log(buf1.toString("base64"));       // aGVsbG8=

var base64Str = buf1.toString("base64");

var buf2 = Buffer.from(base64Str, "base64");
console.log(buf2);      // <Buffer 68 65 6c 6c 6f>
console.log(buf2.toString("utf-8"));    // hello

console.log("hello".toString("base64"));    // hello
/**由此得到： 
 * utf-8 ==> buffer ==> base64 
 * utf-8 <== buffer <== base64 
*/

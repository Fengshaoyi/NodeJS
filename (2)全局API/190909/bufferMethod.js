var buf1 = Buffer.from("hello world", "utf-8");
/**证明做操作时是以字符串为单位的，也就是两个十六进制位 */
var buf2 = buf1.slice(0,5);
console.log(buf2.toString("utf-8"));


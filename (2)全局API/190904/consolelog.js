/**
 * console.log:
 * 调试：
 * 1. 监测代码是否执行到console.log的位置
 * 2. 可以输出一些变量的值，判断程序的执行状态
 */
console.log("");

/**
 * 占位符： %d  %s  %j
 * %d   表示数字
 * %s   表示字符串
 * %j   表示json数组
 */
var user = {
    username: "zhangsan",
    age: 20,
    qq: "1111111111"
}
console.log("username: %s", user.username);
console.log("age: %d", user.age);
console.log("user: %j", user);
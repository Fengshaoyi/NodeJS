function sayHello() {
    console.log("hello world");
}
function showName() {
    console.log(username);
}
var username = "zhangsan";
module.exports = {
    sayHello:sayHello,
    showName:showName,
    username:username
}
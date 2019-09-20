function Bomb(){
    this.message = "bomb!!!";
}
Bomb.prototype.explode = function(){// 构造函数的方法要定义在prototype上
    console.log(this.message);
}
var bomb = new Bomb();
setTimeout(bomb.explode.bind(bomb), 2000);

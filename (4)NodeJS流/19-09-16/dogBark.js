var Dog = require("./Dog.js");
//console.log(Dog);
var dog1 = new Dog("teddy",5);

function barkFun(){
    console.log(this.name + " barked!!!");
    console.log(this.energy);
}
dog1.on("bark",barkFun);
dog1.emit("bark");
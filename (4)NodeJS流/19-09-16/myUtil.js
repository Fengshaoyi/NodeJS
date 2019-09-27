const util = require("util");

function Parent(name) {
    this.name = name;
}
Parent.prototype.show = function(){
    console.log(this.name);
}
function Child(){

}
util.inherits(Child,Parent);
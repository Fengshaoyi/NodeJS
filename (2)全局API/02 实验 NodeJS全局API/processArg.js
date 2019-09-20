var arg0 = process.argv[2];
if(!arg0){
    console.log("命令行参数错误！");
}else if(arg0 == "-h"){
    console.log("命令行参数需为算术运算式");
}else {
    console.log(arg0 + "=" + "%s", eval(arg0));
}
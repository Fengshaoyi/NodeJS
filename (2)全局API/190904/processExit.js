/**
 * 表示当前进程退出
 */
var arg1 = process.argv[2];
if(arg1 == "e"){
    process.exit();
} else if(arg1 == "k"){
    console.log("自杀, help!!!");
    process.kill(process.pid);
} else{
    setTimeout(function(){
        console.log("延时结束");
    }, 5000)
}
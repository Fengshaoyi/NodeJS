
var timerId = setTimeout(function() {
    console.log("game over!");
}, 3000);

// clearTimeout(timerId);  清除延时执行，再加上困难

/**阻止延时执行或者定时执行，回调函数的执行 */
timerId.unref();
/**恢复 */
timerId.ref();


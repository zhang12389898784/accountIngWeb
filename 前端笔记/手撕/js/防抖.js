function JLDebounce(fn, deplay){
    let t1=undefined
    return (...args)=>{
        if(t1){
            clearTimeout(t1)
        }
        t1=setTimeout(fn.bind(this,...args),deplay)
    }
}
let fun=JLDebounce((a,b)=>{console.log(999,a,b)},1000)
for(let i=0;i<9;i++){
    fun(5,2)
}
//利用闭包保存延时器如果已经存在清除ti，然后添加延时器，注意参数的追加
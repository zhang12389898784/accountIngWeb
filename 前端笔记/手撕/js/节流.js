function JLThrottle(fn, deplay){
    let t1=undefined
    return (...args)=>{
        if(!t1){
            console.log(888)
            t1=Date.now()
            fn.call(this,...args)
        }else{
            if(Date.now()-t1>=deplay){
                t1=Date.now()
                fn.bind(this,...args)()
            }else{
                return false
            }
        }
    }
}
let fun=JLThrottle((a,b)=>{console.log(999,a,b)},1000)
for(let i=0;i<9;i++){
    fun(5,2)
}
/*
1.参数追加
2.判断是否是第一次即t1是否为空
3.如果此次运行，便记录当前运行事件以供下次使用
4.通过时间比较来确定是否执行
*/
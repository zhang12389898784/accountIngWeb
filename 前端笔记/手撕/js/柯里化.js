function TestCurring(fn){
    let argsArray=[]
    let curried=(...args)=>{
        if(args.length===0){
            fn.apply(this,argsArray)
        }else{
            argsArray.push(...args)
            return curried
        }
    }
    return curried;
}
let fun=TestCurring((...args)=>{
    console.log(args)
})
fun(5,3,6,9)(1,1,1,1)(2,2,2)()
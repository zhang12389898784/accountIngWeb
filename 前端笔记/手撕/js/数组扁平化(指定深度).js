function JLFlat(arr,depth=1){
    if(depth===0) return arr
    return arr.reduce((previousValue, currentValue)=>{
        if(currentValue instanceof Array) previousValue.push(...JLFlat(currentValue,depth-1))
        else{
            previousValue.push(currentValue)
        }
        return previousValue
    },[])
}
let arr=[1,2,3,4,5,6,[7,8,9,[10,11],12,[13,14,[15,[16]]]]]
console.log(JLFlat(arr),2)
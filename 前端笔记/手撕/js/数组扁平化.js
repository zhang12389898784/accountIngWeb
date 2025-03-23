function JLFlat(arr){
    return arr.reduce((previousValue, currentValue)=>{
        if(currentValue instanceof Array) previousValue.push(...currentValue)
        else{
            previousValue.push(currentValue)
        }
        return previousValue
    },[])
}
let arr=[1,2,3,4,5,6,[7,8,9,[10,11],12,[13,14]]]
console.log(JLFlat(arr))
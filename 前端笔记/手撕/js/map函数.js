Array.prototype.myMap=function(fn){
    let res=[]
    console.log(this)
    for(let i=0;i<this.length;i++){
        res[i]=fn(this[i])
    }
    return res
}
console.log([1,2,3,4,5,6].myMap((item)=>{return ++item}))
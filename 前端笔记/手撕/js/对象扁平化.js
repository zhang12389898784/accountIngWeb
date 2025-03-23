const myObj = {
    a: 1,
    b: [1, 2, {c: true},[3]],
    d: {e: 2,f: 3},
    g: null,
    like: [6, 8, 9]
}
function flatten(myObj) {
    let newObj={}
    let fun=(cur,preKey)=>{
        if(cur instanceof Array){
            for(let key in cur){
                if(cur[key] instanceof Object){
                    fun(cur[key],preKey+`[${key}]`)
                }else{
                    newObj[preKey+`[${key}]`]=cur[key]
                }
            }
        }else{
            for(let key in cur){
                if(cur[key] instanceof Object){
                    preKey.length===0? fun(cur[key],preKey+`${key}`):fun(cur[key],preKey+`.${key}`)
                }else{
                    preKey.length===0? newObj[preKey+`${key}`]=cur[key]:newObj[preKey+`.${key}`]=cur[key]
                }
            }
        }
    }
    fun(myObj,'')
    
    return newObj
}
console.log(flatten(myObj))
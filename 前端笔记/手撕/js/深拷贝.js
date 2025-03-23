let obj = {
    name: '今天一定晴q',
    age: 18,
    like: {
        n: 'money'
    },
    a: true,
    b: null,
    c: undefined,
    d: Symbol('f'),
    f: function() {}
}
let aa={
    aa:obj.like
}
obj.like.aa=aa
function deepClone(obj) {

    let newObj1 = obj instanceof Array ? [] : {}
    let weakmap=new WeakMap()
    let copy=(obj)=>{
        let newObj = obj instanceof Array ? [] : {}
        if(typeof obj === 'object'&&obj!==null){
            console.log(weakmap.has(obj))
            if(weakmap.has(obj)){
                console.log(0)
                return weakmap.get(obj);
            }
            else{
                weakmap.set(obj, newObj);
                for (let key in obj) {
                    if(obj.hasOwnProperty(key)){
                       newObj[key] = copy(obj[key])
                    }
                }
            }
        }else{
            return obj
        }
        return newObj
    }
    newObj1=copy(obj)
    return newObj1
}
console.log(deepClone(obj))
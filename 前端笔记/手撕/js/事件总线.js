/*
事件总线分为三个模块
    监听方法on
    发射方法emit
    取消监听off
*/
class HYEventBus{
    constructor(){
        this.callbackMap=new Map()
    }
    on(eventName,eventCallback,thisArg){
        if(!this.callbackMap.has(eventName)){
            this.callbackMap.set(eventName,[{eventCallback,thisArg}])
        }else{
            this.callbackMap.get(eventName).push({eventCallback,thisArg})
        }
    }
    off(eventName,eventCallback){
        if(this.callbackMap.has(eventName)){
            let cur=this.callbackMap.get(eventName)
            for(let i=0;i<cur.length;i++){
                if(cur[i].eventCallback===eventCallback) cur.splice(i,1)
            }
        }
    }
    emit(eventName,...payload){
        if(this.callbackMap.has(eventName)){
            this.callbackMap.get(eventName).forEach((item)=>{
                item.eventCallback.apply(item.thisArg,payload)
            })
        }
    }
}
const eventBus=new HYEventBus()
eventBus.on("abc",function (a){
    console.log(123,a)
})
let aaa=function(){
    console.log(789)
}
eventBus.on("abc",aaa)
eventBus.off("abc",aaa)
eventBus.emit("abc",123)
function request(url) {
    return new Promise((resolve, reject)=>{
        console.log(`${url}开始请求`)
        setTimeout(()=>{
            const flag = Math.round(Math.random())
            if(flag){
                resolve(url + ' success');
            }else{
                reject(new Error('fail'));
            }
        }, Math.floor(Math.random()*5+2)*1000);
    })
}

const urls = ['url1','url2','url3','url4','url5','url6','url7','url8','url9','url10'];

// 实现该函数
function maxRequest(urls,num) {
    return new Promise((resolve,reject)=>{
        let result=[]
        let count=0
        let index=0
        async function post(){
            const flag=index
            const url=urls[index]
            index++
            try{
                const res=await request(url)
                result[flag]=res
            }
            catch(e){
                result[flag]=null
            }
            count++
            if(count===urls.length){
                resolve(result)
            }
            if(index<urls.length){
                post();
            }
        }
        for(let i=0;i<Math.min(num,urls.length);i++){
            post()
        }
    })
}
maxRequest(urls,3).then((res)=>{
    console.log(res)
})
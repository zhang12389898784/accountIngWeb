import SparkMD5 from 'spark-md5'
let fileHandle=(file,size)=>{
   let fileList=[]
   let cur=0
   while(file.size>cur){
        console.log(cur,file.size,"worker")
        let fileSlice=file.slice(cur,cur+size)
        fileList.push(fileSlice)
        cur+=size
    }
    return fileList
}
let calculateChunksHash=async (fileList)=>{
    let spark=new SparkMD5.ArrayBuffer()
    async function calculate(index){
        console.log(index,"worker")
        if(index>=fileList.length){
            console.log("end",spark)
            return spark.end() 
        }
        return new Promise((resolve,reject)=>{
            console.log(index,"worker")
            const reader=new FileReader()
            reader.readAsArrayBuffer(fileList[index])
            reader.onload=e=>{
                console.log(index,"worker")
                index++
                spark.append(e.target.result)
                resolve(calculate(index+1))
            }
        })
    }
    const fileHash = await calculate(0)
    return fileHash
}
self.onmessage=async e=>{
    console.log(e.data,"worker")
   let fileList= fileHandle(e.data,1024*100)
   let fileHash = await calculateChunksHash(fileList)
   self.postMessage({type:'finish worker',fileHash,fileList})
}
<template>
  <input type="file" placeholder="请输入内容" ref="file">
  <button @click="fileUpdate">上传</button>&nbsp;&nbsp;&nbsp;
  <button @click="()=>{
    isRuning=!isRuning
    if(isRuning){
      ee.data.fileList=ee.data.fileList.filter((item,index)=>{
        return isFileUpload[index]
      })
      uplaod(ee)
    }
    }">暂停/开始</button>
    <img src="" alt="" ref="img">
</template>
<script lang="ts" setup>
import { getCountData } from '@/api';
import { ref } from 'vue';

let file = ref()
let isRuning:boolean
let img = ref()
let ee
let isFileUpload
let fileUpdate = () => {
  worker.postMessage(file.value.files[0])
  
}
const worker = new Worker(
  new URL('../../../../hash-worker.js', import.meta.url),
  {
    type: 'module',
  }
)
let uplaod = async (e) => {
  console.log("暂停worker",isFileUpload)
  let index = 0, length = 0
  isRuning = true
  isFileUpload = new Array(e.data.fileList.length).fill(true)
  let fileUpload = async (fileList: Array<any>) => {
    console.log("fileList11");
    let filePromise = new Promise((resolve, reject) => {
      while (length < 2 && index < fileList.length) {
        console.log(index, "filListworker");
        let data = new FormData()
        data.append('file', e.data.fileList[index])
        let cur = index
        length++
        index++
        getCountData(data).then((res: any) => {
          console.log(res, "res");
          if (res.data.status) {
            isFileUpload[cur] = true
          }
          else {
            isFileUpload[cur] = false
          }
          length--
          if (index >= fileList.length && length == 0) {
            resolve("已经完成")
          } else if (index < fileList.length && isRuning) {
            resolve(fileUpload(fileList))
          }
        }).catch((err) => {
          fileUpload(fileList)
        });
      }
    })
    return filePromise
  }
  let filList = e.data.fileList
  while (filList.length > 0) {
    console.log("filListworker",filList.length);
    console.log(filList, "filList");
    await fileUpload(filList)
    filList = (filList as Array<any>).filter((item, index) => {
      return isFileUpload[index]
    })
    index = 0, length = 0
    isFileUpload = new Array(filList.length).fill(true)
    console.log(filList, "filListworker");
    console.log("filListworker",filList.length,isFileUpload);
  }
}
worker.onmessage = async (e) => {
  const blob = new Blob(e.data.fileList, { type: 'image/png' }) // 根据实际类型修改
  img.value.src = URL.createObjectURL(blob)
  ee=e
  uplaod(e)
}

</script>
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
export const appStore= defineStore('app',()=>{
  const isCollapse=ref<boolean>(false)
  const routerTitle=ref<string>()
  const updateData=reactive<{[key:string]:any}>({})
  const setIsCollapse=()=>{
    isCollapse.value=!isCollapse.value
  }
  const setRouterTitle=(title:string)=>{
    routerTitle.value=title
  }
  const setUpdateData=(code:string,data:any)=>{
    console.log(code,data);
    updateData[code]=data
    console.log(updateData);
  }
  return {isCollapse,routerTitle,updateData,setIsCollapse,setRouterTitle,setUpdateData}
})
import { defineStore } from "pinia";
import { ref } from "vue";
export const appStore= defineStore('app',()=>{
  const isCollapse=ref<boolean>(true)
  const routerTitle=ref<string>()
  const setIsCollapse=()=>{
    isCollapse.value=!isCollapse.value
  }
  const setRouterTitle=(title:string)=>{
    routerTitle.value=title
  }
  return {isCollapse,routerTitle,setIsCollapse,setRouterTitle}
})
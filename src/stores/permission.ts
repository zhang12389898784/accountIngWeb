import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
interface PermissionState {
  routes: Ref<RouteRecordRaw[]>
  conRoutes: Ref<RouteRecordRaw[]>
  addRoutes: Ref<RouteRecordRaw[]>
  set: (accessedRoutes: RouteRecordRaw[],dynamicRoutes: RouteRecordRaw[]) => void
}
export const  usePermissionStore= defineStore('permission', ():PermissionState => {
  const routes=ref<RouteRecordRaw[]>([])
  const addRoutes = ref<RouteRecordRaw[]>([])
  const conRoutes=ref<RouteRecordRaw[]>([])
  const set = (constantRoutes: RouteRecordRaw[],dynamicRoutes: RouteRecordRaw[]) => {
    console.log(constantRoutes,dynamicRoutes,7474)
    conRoutes.value = constantRoutes
    addRoutes.value = dealRouterByPermission(dynamicRoutes)
    routes.value = conRoutes.value.concat(addRoutes.value)
  }
  return {routes,conRoutes,addRoutes,set}
})

const dealRouterByPermission = (routes: RouteRecordRaw[]) => {
  let res: RouteRecordRaw[]=[]
  console.log(sessionStorage.getItem('token'))
  routes.forEach((route) => {
    if((route.meta?.roles as Array<string>).includes(sessionStorage.getItem('token') as string)){
      if (route.children) {
        route.children = dealRouterByPermission(route.children)
      }
      res.push(route)
    }
  })
  console.log(res,87871)
  return res
}
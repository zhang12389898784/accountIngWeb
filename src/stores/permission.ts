import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { constantRoutes,dynamicRoutes } from '@/router'
import type { RouteRecordRaw } from 'vue-router'
interface PermissionState {
  routes: Ref<RouteRecordRaw[]>
  conRoutes: Ref<RouteRecordRaw[]>
  addRoutes: Ref<RouteRecordRaw[]>
  set: (accessedRoutes: RouteRecordRaw[]) => void
}
export const  usePermissionStore= defineStore('permission', ():PermissionState => {
  const routes=ref<RouteRecordRaw[]>([])
  const addRoutes = ref<RouteRecordRaw[]>([])
  const conRoutes=ref<RouteRecordRaw[]>([])
  const set = (accessedRoutes: RouteRecordRaw[]) => {
    conRoutes.value = constantRoutes
    addRoutes.value = dealRouterByPermission(dynamicRoutes)
    routes.value = conRoutes.value.concat(addRoutes.value)
  }
  return {routes,conRoutes,addRoutes,set}
})

const dealRouterByPermission = (routes: RouteRecordRaw[]) => {
  let res: RouteRecordRaw[]=[]
  routes.forEach((route) => {
    if((route.meta?.roles as Array<string>).includes('admin')){
      if (route.children) {
        route.children = dealRouterByPermission(route.children)
      }
      res.push(route)
    }
  })
  return res
}
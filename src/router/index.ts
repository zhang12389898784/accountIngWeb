import { createRouter, createWebHistory } from 'vue-router'
import { usePermissionStore} from '@/stores/permission'
const Layouts =()=>import('@/layout/index.vue')
export const constantRoutes = [
    {
        path: "/403",
        component: () => import("@/pages/error/403.vue"),
        meta: {
          hidden: true
        }
      },
      {
        path: "/404",
        component: () => import("@/pages/error/404.vue"),
        meta: {
          hidden: true
        },
        alias: "/:pathMatch(.*)*"//捕获所有剩余路由
      },
      {
        path: "/login",
        component: () => import("@/pages/login/index.vue"),
        meta: {
          hidden: true
        }
      },
      {
        path: "/",
        component: Layouts,
        redirect: "/dashboard",
        children: [
          {
            path: "dashboard",
            component: () => import("@/pages/dashboard/index.vue"),
            name: "Dashboard",
            meta: {
              title: "首页",
              Icon:"ant-design:alert-filled",
              affix: true
            }
          }
        ]
      },
]
export const dynamicRoutes = [
  {
    path: "/center",
    component: Layouts,
    redirect: "/center/account",
    meta: {
      title: "管理",
      Icon:"ant-design:alert-filled",
      affix: true,
      roles:['admin',"user"]
    },
    children: [
      {
        path: "/center/account",
        component: () => import("@/pages/center/account/index.vue"),
        name: "account",
        meta: {
          title: "记账管理",
          affix: true,
          roles:['admin',"user"]
        }
      },
      {
        path: "/center/user",
        component: () => import("@/pages/center/user/index.vue"),
        name: "user",
        meta: {
          title: "用户管理",
          affix: true,
          roles:['admin']
        }
      }
    ]
  },
]
export const router=createRouter({
    history:createWebHistory(),
    routes:constantRoutes
})
router.beforeEach((to, from, next) => {
    usePermissionStore().set(constantRoutes)
    usePermissionStore().addRoutes.forEach(item=>{
        router.addRoute(item)
    })
    console.log(usePermissionStore().routes)
    next()
})
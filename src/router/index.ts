import { createRouter, createWebHistory } from 'vue-router'
import { usePermissionStore } from '@/stores/permission'
import { appStore } from '@/stores/appStore'
import { h } from 'vue'
let count = 0
const Layouts = () => import('@/layout/index.vue')
export const constantRoutes = [
  {
    path: "/403",
    component: () => import("@/pages/error/403.vue"),
    meta: {
      hidden: true
    }
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
          Icon: "ant-design:alert-filled",
          affix: true,
        }
      }
    ]
  },
  {
    path: "/34",
    component: () => import("@/pages/dashboard/index.vue"),
    name: "Dashboard11",
    meta: {
      title: "首页",
      Icon: "ant-design:alert-filled",
      affix: true,
      hidden: true,
    }
  },
]
export const dynamicRoutes = [
  {
    path: "/center",
    component: Layouts,
    redirect: "/center/account",
    meta: {
      title: "管理",
      Icon: "ant-design:alert-filled",
      affix: true,
      roles: ['admin', "user"]
    },
    children: [
      {
        path: "/center/account",
        component: () => import("@/pages/center/account/index.vue"),
        name: "account",
        meta: {
          title: "记账管理",
          affix: true,
          roles: ['admin', "user"]
        }
      },
      {
        path: "/center/music",
        component: () => import("@/pages/center/music/index.vue" as any),
        name: "music",
        meta: {
          title: "音乐播放",
          affix: true,
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: "/music",
    component: import("@/pages/center/music/components/music.vue" as any),
    meta: {
      title: "管理",
      hidden: true,
      affix: true,
      roles: ['admin', "user"],
    },
  },
]
export const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
})
router.beforeEach((to, from, next) => {
  let aaa=0
  if (to.path === "/login" || to.path === "/403" || to.path === "/404") next()
  if (sessionStorage.getItem("token")) {
    usePermissionStore().set(constantRoutes,dynamicRoutes)
    usePermissionStore().addRoutes.forEach(item => {
      router.addRoute(item)
    })
    console.log(usePermissionStore().addRoutes,4141)
    router.addRoute({
      path: "/404",
      component: () => import("@/pages/error/404.vue"),
      meta: {
        hidden: true
      },
      alias: "/:pathMatch(.*)*"//捕获所有剩余路由
    })
    console.log(router,66464)
    appStore().setRouterTitle(to.meta.title as string)
    console.log(usePermissionStore().routes)
    next()
  } else {
    next("/login")
  }

})

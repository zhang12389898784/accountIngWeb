import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import{ constantRoutes, router }from './router'
import { Icon } from '@iconify/vue';
import { usePermissionStore } from './stores/permission'
import { initIndexDB } from './indexDB'
const app = createApp(App)
const pinia = createPinia()
app.use(ElementPlus)
app.use(pinia)
usePermissionStore().set(constantRoutes)
    usePermissionStore().addRoutes.forEach(item => {
      router.addRoute(item)
    })
    router.addRoute({
      path: "/404",
      component: () => import("@/pages/error/404.vue"),
      meta: {
        hidden: true
      },
      alias: "/:pathMatch(.*)*"//捕获所有剩余路由
    })
app.use(router)
app.use(initIndexDB)
app.component('Icon', Icon)
app.mount('#app')

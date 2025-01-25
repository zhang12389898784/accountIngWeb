import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { constantRoutes, dynamicRoutes, router } from './router'
import { Icon } from '@iconify/vue';
import { usePermissionStore } from './stores/permission'
import { initIndexDB } from './indexDB'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import '@/assets/index.scss'
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(ElementPlus)
app.use(pinia)
usePermissionStore().set(constantRoutes,dynamicRoutes)
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
app.directive('permission',{
  mounted(el:HTMLElement,binding){
    console.log(binding.value,el,9494);
    if(binding.value.includes(sessionStorage.getItem('token'))){

    }
    else{
      el.parentElement?.removeChild(el)

    }
  }
})
app.mount('#app')

<template>
    <div class="logo">
        accounting
    </div>
    <el-menu class="el-menu-vertical-demo"
      :popper-offset="5" @open="handleOpen" :collapse="iscollapse" @close="handleClose" :default-active="defaultActive">
      <Item v-for="
      item in noHiddenRoutes" :item="item">
      </Item>
    </el-menu>
</template>
<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import Item from './Item.vue';
import { usePermissionStore } from "@/stores/permission"
import { appStore } from '@/stores/appStore';
import { computed } from 'vue';
import { router } from '@/router';
let store = usePermissionStore()
let useAppStore = appStore()
let defaultActive = computed(() => {
  console.log(router.currentRoute.value.meta.title, 'ooo')
  return router.currentRoute.value.meta.title
})
const iscollapse = computed(() => {
  return useAppStore.isCollapse
})
const noHiddenRoutes = computed(() => {
  return getRoutes(store.routes)
})
function getRoutes(routes: typeof store.routes) {
  let routesClone: typeof store.routes = []
  routes.forEach(item => {
    let routesChilds: typeof store.routes[0] | undefined = item
    if (item.children) {
      routesChilds.children = getRoutes(item.children)
    }
    routesClone.push(routesChilds)
  })
  return routesClone.filter(item => {
    return !item.meta?.hidden
  })
}
console.log(noHiddenRoutes.value)
noHiddenRoutes.value.forEach(item => {
  console.log(item.path, 7878)
})
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
<style scoped lang="scss">
.el-scrollbar {
}
.el-menu-vertical-demo {
  color: #000;
  background-color: rgb(255, 255, 255,0);
  width: 100%;
  height: auto;
}
.logo{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 8%;
  font-size: large;
  font-weight: bold;
}
</style>
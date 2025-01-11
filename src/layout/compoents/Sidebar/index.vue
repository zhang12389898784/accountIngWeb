<template>
    <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        :popper-offset="5"
        @open="handleOpen"
        :collapse="iscollapse"
        @close="handleClose"
      >
      <Item v-for="
      item in noHiddenRoutes"  
      :item="item">
      </Item>
      </el-menu>
    </el-scrollbar>
</template>
<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import Item from './Item.vue';
import {usePermissionStore} from "@/stores/permission"
import { appStore } from '@/stores/appStore';
import { computed } from 'vue';
let store = usePermissionStore()
let useAppStore = appStore()
const iscollapse=computed(()=>{
  return useAppStore.isCollapse
})
const noHiddenRoutes=computed(()=>{
  return store.routes.filter(item=>!item.meta?.hidden)
})
console.log(noHiddenRoutes.value)
noHiddenRoutes.value.forEach(item=>{
  console.log(item.path,7878)
})
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
<style scoped lang="scss">
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 500px;
  margin: 0px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
.el-scrollbar {
  height: 100%;
  width: auto;
  :deep(.scrollbar-wrapper) {
    // 限制水平宽度
    overflow-x: hidden;
  }
  // 滚动条
  :deep(.el-scrollbar__bar) {
    &.is-horizontal {
      // 隐藏水平滚动条
      display: none;
    }
  }
}
.el-menu-vertical-demo{
  height: 100vh;
}
</style>
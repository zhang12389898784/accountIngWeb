<template>
    <div class="NavigationBar">
        <div >
            <el-icon class="icon" :size="20" @click="toggleClick()"><Operation /></el-icon>
        {{ title }}
        </div>
    </div>
</template>
<script setup lang="ts">
import { Operation } from '@element-plus/icons-vue'
import { appStore } from '@/stores/appStore';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
let title=computed(()=>{
    return appStore().routerTitle
})
const toggleClick = ()=>{
    appStore().setIsCollapse()
}
</script>
<style lang="scss" scoped>
.icon {
  vertical-align: middle;
  cursor: pointer;
}
.NavigationBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
}
</style>

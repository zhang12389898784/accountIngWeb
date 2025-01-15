<template>
    <div class="NavigationBar">
        <div style="padding-left:20px ;">
            <el-icon class="icon" :size="20" @click="toggleClick()">
                <Operation />
            </el-icon>
            {{ title }}
        </div>
        <div></div>
        <div style="padding-right:20px ;">
            <el-tooltip :content="'全屏'" placement="bottom" @click="showFullcreen">
                <el-icon class="icon" :size="20" @click="showFullcreen">
                <FullScreen />
            </el-icon>
            </el-tooltip>
            {{ username }}
        </div>
    </div>
</template>
<script setup lang="ts">
import { Operation, FullScreen } from '@element-plus/icons-vue'
import { appStore } from '@/stores/appStore';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import screenfull from 'screenfull';
let username = sessionStorage.getItem('username')
let title = computed(() => {
    return appStore().routerTitle
})
let showFullcreen = () => {
    if (screenfull.isEnabled) {
        console.log('全屏模式支持');
        if (screenfull.isEnabled && screenfull.isFullscreen) {
            screenfull.exit();
        }
        else screenfull.request();
    } else {
        console.log('全屏模式不支持');
    }
}
const toggleClick = () => {
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

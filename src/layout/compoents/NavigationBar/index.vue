<template>
    <div class="NavigationBar">
        <div style="padding-left:20px ;" class="title">
            <card>
                <el-icon class="icon" :size="20" @click="toggleClick()">
                    <Operation />
                </el-icon>
            </card>
        </div>
        <div style="text-align: left;flex: 1;margin-left: 5px; font-size: 18px;">
            {{ title }}
        </div>
        <div style="padding-right:20px ;display: flex; align-items: center ;">
            <card style="margin-right: 20px;">
                <el-tooltip :content="'全屏'" placement="bottom" @click="showFullcreen">
                    <el-icon class="icon" :size="20" @click="showFullcreen">
                        <FullScreen />
                    </el-icon>
                </el-tooltip>
            </card>
            <card>
                <div class="icon">
                    {{ username }}
                </div>
            </card>
        </div>
    </div>
</template>
<script setup lang="ts">
import card from '@/components/card/index.vue'
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
    padding: 10px 10px;
    vertical-align: middle;
    cursor: pointer;
}

.NavigationBar {
    margin-top: 6px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background-color: rgba(255, 255, 255, 0);
}
</style>

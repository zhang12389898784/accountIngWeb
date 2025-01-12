<template>
    <div class="main">
        <Sidebar class="sidebar-container"></Sidebar>
        <div class="content">
            <div class="content-header">
                <NavigationBar></NavigationBar>
            </div>
            <div class="content-body">
               <RouterView></RouterView>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import Sidebar from './compoents/Sidebar/index.vue'
import NavigationBar from './compoents/NavigationBar/index.vue'
</script>
<style scoped lang="scss">
.main{
    width: 100%;
    height: 100%;
    display: flex;
    .sidebar-container{
    }
    .content{
        flex: 1;
        display: flex;
        flex-direction: column;
        .content-header{
            height: 60px;
            background-color: #fff;
            box-shadow: var(--el-box-shadow-lighter);
            margin-bottom: 20px;
        }
        .content-body{
            flex: 1;
            margin: 0px 20px 20px 20px;
            background-color: rgba(211, 211, 211, 0.1);
        }
    }
}
</style>
<template>
    <div class="main">
        <div class="sidebar-container">
            <card>
                <Sidebar></Sidebar>
            </card>
        </div>
        <div class="content">
            <div class="content-header">
                <NavigationBar></NavigationBar>
                <TagsView></TagsView>
            </div>
            <div class="content-body">
               <RouterView></RouterView>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import TagsView from './compoents/TagsView/index.vue'
import Sidebar from './compoents/Sidebar/index.vue'
import card from '@/components/card/index.vue'
import NavigationBar from './compoents/NavigationBar/index.vue'
</script>
<style scoped lang="scss">
.main{
    width: 100%;
    height: 100%;
    display: flex;
    opacity: 1;
    background: rgba(242, 248, 252, 1);
    .sidebar-container{
        margin: 15px 20px;
        flex-basis: 10%;
    }
    .content{
        flex: 1;
        display: flex;
        flex-direction: column;
        .content-header{
            margin-bottom: 20px;
        }
        .content-body{
            overflow:hidden;
            flex: 1;
            margin: 0px 20px 20px 20px;
        }
    }
}
</style>
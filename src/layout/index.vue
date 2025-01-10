<template>
    <div class="main">
        <Sidebar></Sidebar>
        <div>
            <RouterView></RouterView>
        </div>
    </div>
</template>
<script setup lang="ts">
import Sidebar from './compoents/Sidebar/index.vue'
</script>
<style scoped lang="scss">
.main{
    width: 100%;
    height: 100%;
    display: flex;
}
</style>
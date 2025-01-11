<template>
dashboard
<el-button @click="avatarEmits()">按钮</el-button>
</template>
<script setup lang="ts">
import { appStore } from '@/stores/appStore';
const avatarEmits = ()=>{
    appStore().setIsCollapse()
}
</script>
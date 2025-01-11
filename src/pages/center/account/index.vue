<template>
    5
</template>
<script setup lang="ts">
import { getCountData } from '@/api';
import { onMounted } from 'vue';
import { readDataIndexedDB,addDataIndexedDB,deleteDataIndexedDB,fORData } from '@/indexDB';
readDataIndexedDB()

onMounted(() => {
    getCountData().then(res => {
        console.log(res.data.data);
    });
})

</script>
<style scoped lang="scss"></style>
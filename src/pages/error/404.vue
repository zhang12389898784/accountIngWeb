<template>
    <span class="a404">404</span>
    <Loading />
</template>
<script setup lang="ts">
import Loading from '@/components/loading/index.vue'
</script>
<style lang="scss" scoped>
.a404{
    position: relative;
    top: 50vh;
    left: 50vw;
    transform: translate(-50%,-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
}
</style>
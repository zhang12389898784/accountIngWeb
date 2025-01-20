<template>
    <button class="btn btn-primary" @click="click">按钮</button>
</template>
<script setup>
let channel = new BroadcastChannel('music')
const click = () => {
    if(localStorage.getItem('music')){
        channel.postMessage('open')
    }else{
        window.open('/music')
    }
}
</script>
<style lang="scss"></style>
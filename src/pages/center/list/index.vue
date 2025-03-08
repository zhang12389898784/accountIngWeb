<template>
  <div style="height: 100vh; width: 100vw">
    <VirtualList :listData="data" :itemSize="100" />
  </div>
</template>

<script setup>
import VirtualList from "./component/list.vue";
import {onMounted, onUpdated, ref} from "vue";
onMounted(() => {
  console.log("mounted");
})
onUpdated(() => {
  console.log("updated");
})
const data = ref([]);
for (let i = 0; i < 1000; i++) {
  data.value.push({ id: i, value: i });
}
</script>
<style>
html {
  height: 100%;
}

body {
  height: 100%;
  margin: 0;
}

#app {
  height: 100%;
}
</style>
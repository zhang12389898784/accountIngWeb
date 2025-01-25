<template>
     <router-view />
</template>
<script setup>
import { onMounted } from 'vue';


onMounted(async () => {
     const targetNode = document.getElementById('app');
 
const observer = new MutationObserver((mutationsList) => {
     console.log('子节点发生了变化',mutationsList);
  mutationsList.forEach((mutation) => {
    if (mutation.type === 'childList') {
      console.log('子节点发生了变化',mutation);
    }
  });
});
observer.observe(targetNode, { attributes: true });
})
</script>
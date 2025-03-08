<<<<<<< HEAD
bbbbbb
=======
<template>
  <div>11{{re}}</div>
  <button @click="cli">+++</button>
</template>
<script lang="ts" setup >
import { appStore} from '@/stores/appStore';
import { onMounted ,ref, watch} from 'vue';
let re=ref(67676)
let cli=()=>{
  console.log("cli",re.value);
  appStore().setUpdateData("sdss",1)
    // appStore().setUpdateData("sds",(re.value+1))
}
onMounted(() => {
  appStore().setUpdateData("sds",1)
  re.value=appStore().updateData["sds"]
  watch(()=>appStore().updateData["sds"],
  (newVal,old) => {
    console.log("watch",old,newVal);
    re.value=newVal
  })
})
</script>
>>>>>>> 35a3347 (feat(center): 添加更新页面组件)

<template>
  <div class="tags-view">
    <div v-for="tab in tabs" :key="tab.path" class="tag" :class="{ active: isActive(tab.path) }"
      @click="handleClick(tab.path)">
      {{ tab.title }}
      <span class="close" @click.stop="handleClose(tab.path)">x</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useHistoryTabs } from '@/stores/historyTabs';
import { computed } from 'vue';

const router = useRouter();
const historyTabs = useHistoryTabs();

const tabs = computed(() => historyTabs.tabs);

const isActive = (path: string) => {
  return path === router.currentRoute.value.path;
};

const handleClick = (path: string) => {
  router.push(path);
};

const handleClose = (path: string) => {
  historyTabs.removeTab(path);
  if (isActive(path)) {
    const lastTab = historyTabs.tabs[historyTabs.tabs.length - 1];
    if (lastTab) {
      router.push(lastTab.path);
    }
  }
};

// 监听路由变化，自动添加标签页
router.afterEach((to) => {
  historyTabs.addTab({ title: to.meta.title as string, path: to.path });
});
</script>

<style scoped lang="scss">
.tags-view {
  display: flex;
  height: 30px;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 19px;
  color: rgba(113, 128, 150, 1);
  text-align: left;
  vertical-align: middle;
  margin-top: 10px;
  margin-left: 20px;

  .tag {
    padding: 6px 8px;
    margin-right: 4px;
    border: 1px solid #ccc;
    border-radius: 12px;
    background-color: white;
    cursor: pointer;

    &.active {
      background-color: #409EFF;
      color: white;
    }

    .close {
      margin-left: 4px;
      cursor: pointer;
    }
  }
}
</style>
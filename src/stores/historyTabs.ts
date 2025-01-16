import { defineStore } from 'pinia';

interface Tab {
  title: string;
  path: string;
}

export const useHistoryTabs = defineStore('historyTabs', {
  state: () => ({
    tabs: [] as Tab[],
  }),
  actions: {
    addTab(tab: Tab) {
      if (!this.tabs.some(t => t.path === tab.path)) {
        this.tabs.push(tab);
      }
    },
    removeTab(path: string) {
      this.tabs = this.tabs.filter(tab => tab.path !== path);
    },
    setActiveTab(path: string) {
      // 可以在这里添加设置激活标签页的逻辑
    },
  },
    persist: true,
});
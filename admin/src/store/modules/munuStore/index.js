import { defineStore } from 'pinia';

export const munuStore = defineStore('munu', {
  state: () => {
    return {
      munuStates: false // 侧边栏是否展开
    }
  },
  actions: {
    // 设置侧边栏状态
    setMunuStates() {
      this.munuStates = !this.munuStates;
    },
  },
  getters: {},
})
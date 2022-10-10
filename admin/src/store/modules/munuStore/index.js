import { defineStore } from 'pinia';

export const munuStore = defineStore('munu', {
  state: () => {
    return {
      routes: [],
      munuStates: false
    }
  },
  actions: {
    // 设置导航状态
    setMunuStates() {
      this.munuStates = !this.munuStates;
    },
  },
  getters: {},
})
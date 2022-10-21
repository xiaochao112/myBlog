import { defineStore } from 'pinia';
import { piniaLocalStorage, piniaSessionStorage } from '@/store/config/index';
import { getInfoApi, getLoginApi } from '@/api/user';
import { localSet } from '@/utils';

export const bkStore = defineStore('bkStore', {
  state: () => {
    return {
      // 当前要发表的博客信息
      bkIformation: {}
    }
  },
  actions: {
    // 设置标签页是否只显示某个标签栏
    setBkIformation(bkIformation) {
      this.bkIformation = bkIformation;
    },
  },
  getters: {},
  persist: piniaSessionStorage('bkStore')
})
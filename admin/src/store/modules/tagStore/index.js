import { defineStore } from 'pinia';
import { piniaLocalStorage } from '@/store/config/index';
import { getInfoApi, getLoginApi } from '@/api/user';
import { localSet } from '@/utils';

export const tagStore = defineStore('tag', {
  state: () => {
    return {
      typeId: null,
    }
  },
  actions: {
    // 设置标签页是否只显示某个标签栏
    setTypeId(typeId) {
      this.typeId = typeId;
    },
  },
  getters: {},
  persist: piniaLocalStorage('tag')
})
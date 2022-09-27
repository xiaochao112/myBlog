import { defineStore } from 'pinia';
import { piniaLocalStorage } from '../config';
import { getInfoApi } from '@/api/user';

export const userInfoStore = defineStore('userInfo', {
  state: () => ({
    user: {}
  }),
  actions: {
    // 根据token获取用户信息
    async setUser() {
      const { user } = await getInfoApi();
      this.user = user;
    }
  },
  getters: {},
  persist: piniaLocalStorage('userInfoStore')
})
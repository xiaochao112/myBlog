import { defineStore } from 'pinia';
import { piniaLocalStorage } from '../config';

export const userInfoStore = defineStore('userInfo', {
  state: () => ({
    token: '',
    userName: ''
  }),
  actions: {},
  getters: {},
  persist: piniaLocalStorage('userInfoStore')
})
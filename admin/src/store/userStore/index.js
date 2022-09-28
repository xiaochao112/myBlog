import { defineStore } from 'pinia';
import { piniaLocalStorage } from '../config';
import { getInfoApi, getLoginApi } from '@/api/user';
import { localSet } from '../../utils';

export const userInfoStore = defineStore('userInfo', {
  state: () => ({
    user: {},
  }),
  actions: {
    // 根据token获取用户信息
    async setUser() {
      const { user } = await getInfoApi();
      this.user = user;
    },
    setLongin(ruleForm) {
      return new Promise((resovle, reject) => {
        getLoginApi(ruleForm).then(res => {
          if (res.code == 200) {
            console.log(res);
            localSet("token", res.data.token);
            // 获取用户信息
            resovle('ok')
          }
        })
          .catch(err => {
            reject(err)
          })
      })
    }
  },
  getters: {},
  persist: piniaLocalStorage('userInfoStore')
})
import { defineStore } from 'pinia';
import { piniaLocalStorage } from '@/store/config/index';
import { getInfoApi, getLoginApi } from '@/api/user';
import { localSet, localRemove } from '@/utils';
import router from '@/router/index'
import { getRoleList } from '@/api/permit';

export const userInfoStore = defineStore('userInfo', {
  state: () => {
    return {
      user: {},
      roleList: [] // 当前用户权限
    }
  },
  actions: {
    // 根据token获取用户信息
    async setUser() {
      // console.log(this);
      const { user } = await getInfoApi();
      this.user = user;
      return user
    },
    // 登录
    setLongin(ruleForm) {
      return new Promise((resovle, reject) => {
        getLoginApi(ruleForm).then(res => {
          if (res.code == 200) {
            localSet("token", res.data.token);
            // 获取用户信息
            resovle('ok')
          }
        })
          .catch(err => {
            reject(err)
          })
      })
    },
    // 获取用户权限
    async setRoleList() {
      const { data } = await getRoleList();
      this.roleList = data;

    },
    // 退出登录
    setLogOut() {
      this.user = {};
      this.roleList = [];

      localRemove('token');
      router.push('/login');
    }
  },
  getters: {},
  persist: piniaLocalStorage('userInfo')
})

import { createPinia, defineStore } from "pinia";

export const userInfoStore = defineStore('userInfo', {
  state: () => ({
    userName: '',
    password: ''
  }),
  actions: {

  }
})

const pinia = createPinia();

export default pinia;
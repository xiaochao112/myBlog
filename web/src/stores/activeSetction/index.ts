import { sessionPiniaPersistConfig } from "@/config/piniaPersist";
import { defineStore } from "pinia"

export const activeSetctionStore = defineStore('activeSetction', {
  state: () => {
    return {
      isActiveHome: false,
      isActiveInfoCard: false,
      isActiveAlbum: false,
      isActiveLnformation: false,
      isActiveStudent: false,
    }
  },
  actions: {
    // 资料卡样式过渡效果
    setActiveHome(is: boolean) {
      this.isActiveHome = is;
    },
    // 资料卡样式过渡效果
    setActiveInfoCard(is: boolean) {
      this.isActiveInfoCard = is;
    },
    // 相册样式过渡效果
    setActiveAlbum(is: boolean) {
      this.isActiveAlbum = is;
    },
    // 个人信息样式过渡效果
    setActiveLnformation(is: boolean) {
      this.isActiveLnformation = is;
    },
    // 学籍样式过渡效果
    setActiveStudent(is: boolean) {
      this.isActiveStudent = is;
    },
  },
  getters: {},
  // persist: sessionPiniaPersistConfig("activeSetction")
})
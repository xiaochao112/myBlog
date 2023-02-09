import { localiniaPersistConfig } from "@/config/piniaPersist";
import { defineStore } from "pinia"

export const darkStore = defineStore('darkStore', {
  state: () => {
    return {
      isDark: false,
    }
  },
  actions: {
    // 暗黑模式
    setIsDark() {
      this.isDark = !this.isDark;
    },
  },
  getters: {},
  persist: localiniaPersistConfig("darkStore")
})
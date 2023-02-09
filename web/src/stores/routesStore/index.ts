import { sessionPiniaPersistConfig } from "@/config/piniaPersist";
import { defineStore } from "pinia";
import { RoutesStore } from '../interface/index';

export const routesStore = defineStore('routesStore', {
  state: (): RoutesStore => {
    return {
      navRoutes: [],
      currentRoute: ''
    }
  },
  actions: {
    // 路由集合
    setRoutes(routes: any[]) {
      this.navRoutes = routes
    },
    // 当前路由
    setCurrentRoute(currentRoute: string) {
      this.currentRoute = currentRoute;
    }
  },
  getters: {},
  persist: sessionPiniaPersistConfig("routesStore")
})
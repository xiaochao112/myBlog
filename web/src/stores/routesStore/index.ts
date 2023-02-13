import { sessionPiniaPersistConfig } from "@/config/piniaPersist";
import { defineStore } from "pinia";
import { RoutesStore, NavAndLeft } from '../interface/index';

export const routesStore = defineStore('routesStore', {
  state: (): RoutesStore => {
    return {
      navRoutes: [],
      currentRoute: '', // 当前路由
      navOffsetLeft: 0, // 导航边框lift值
      navItem: 0 // 当前导航
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
    },
    // 当前导航样式
    setCurrentNav(navAndLeft: NavAndLeft) {
      this.navOffsetLeft = navAndLeft.left;
      this.navItem = navAndLeft.navItem
    }
  },
  getters: {},
  persist: sessionPiniaPersistConfig("routesStore")
})
import { defineStore } from 'pinia';
import { piniaLocalStorage } from '@/store/config';

export const routerStore = defineStore('routes', {
  state: () => {
    return {
      routes: [], // 权限路由集合
      currentRoute: {} // 当前路由
    }
  },
  actions: {
    // 权限路由集合
    setRoutes(routes) {
      this.routes = routes;
    },
    // 当前路由
    setCurrentRoute(path) {
      console.log('path', path);
      // 处理导航
      const currentPront = this.routes.find(item => item.path == path.slice(0, path.indexOf('/', 1)));
      console.log('currentPront', currentPront);
      if (!currentPront) return
      const current = currentPront.children.find(item => item.path == path);
      this.currentRoute = current;
    }
  },
  getters: {},
  persist: piniaLocalStorage('routes')
})
import { defineStore } from 'pinia';
import { piniaLocalStorage } from '@/store/config';

export const routerStore = defineStore('routes', {
  state: () => {
    return {
      routes: [],
      currentRoute: {}
    }
  },
  actions: {
    setRoutes(routes) {
      console.log(routes);
      this.routes = routes;
    },
    setCurrentRoute(path) {
      // 处理导航
      const currentPront = this.routes.find(item => item.path == path.slice(0, path.indexOf('/', 1)));
      if (!currentPront) return
      const current = currentPront.children.find(item => item.path == path);
      this.currentRoute = current;
    }
  },
  getters: {},
  persist: piniaLocalStorage('routes')
})
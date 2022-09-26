import { defineStore } from 'pinia';
import { piniaLocalStorage } from '../config';

export const routerStore = defineStore('routes', {
  state: () => ({
    routes: [],
    currentRoute: {}
  }),
  actions: {
    setRoutes(routes) {
      this.routes = routes;
    },
    setCurrentRoute(path) {
      // 处理导航
      const currentPront = this.routes.find(item => item.path == path.slice(0, path.indexOf('/', 1)))
      const current = currentPront.children.find(item => item.path == path);

      this.currentRoute = current;
    }
  },
  getters: {},
  persist: piniaLocalStorage('routesStore')
})
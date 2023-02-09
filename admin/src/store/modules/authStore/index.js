import { defineStore } from 'pinia';
import { piniaLocalStorage } from '@/store/config';

export const authStore = defineStore('authStore', {
	state: () => {
		return {
			routeName: 'authButton', // 当前页面的名字（设置按钮权限）
			authButtonList: {}, // 按钮权限列表
			routes: [], // 权限路由集合
			currentRoute: {} // 当前路由
		}
	},
	actions: {
		// 设置按钮权限列表
		setAuthButton() {
			this.authButtonList = {
				authButton: ["add", "edit", "delete", "export"]
			};
		},
		// 权限路由集合
		setRoutes(routes) {
			this.routes = routes;
		},
		// 当前路由
		setCurrentRoute(path) {
			// 处理导航
			const currentPront = this.routes.find(item => item.path == path.slice(0, path.indexOf('/', 1)));
			if (!currentPront) return
			const current = currentPront.children.find(item => item.path == path);
			this.currentRoute = current;
		},
		setRouteName(routeName) {
			this.routeName = routeName
		},
		// 退出登录
		setLogOut() {
			this.routes = [];
			this.currentRoute = {};
			this.authButtonList = {};
		},

	},
	getters: {},
	persist: piniaLocalStorage('authStore')
})
import router from './router/index';
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { localGet, handleRouter } from './utils';
import { routerArray } from '@/router/promisRouter.js'
import { userInfoStore } from './store/modules/userStore';
import { authStore } from './store/modules/authStore'

const whiteList = ['/login'] // 白名单

router.beforeEach(async (to, from, next) => {

  const store = userInfoStore();
  const state = authStore()

  console.log(to.path);
  NProgress.start()

  const token = localGet('token')

  // 如果有token
  if (token) {

    if (to.path === '/login') {
      next({ path: '/home' });
      NProgress.done()

    } else {
      try {
        // 派发pinia，获取用户信息
        // debugger
        let user = await store.setUser()
        if (!state.routes.length) {
          let routes = handleRouter(routerArray, user.roleId)
          // 存储路由导航
          state.setRoutes(routes);
          // 获取按钮权限
          state.setAuthButton()
        }
        // 当前要去的路由导航
        state.setCurrentRoute(to.path);

        next()
        NProgress.done()
      } catch (error) {
        state.setLogOut()
        store.setLogOut()
        console.log(error);
      }
    }

  }
  else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      ElMessage({
        message: "登录已过期，请重新登录！",
        type: 'error',
      })
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }

})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
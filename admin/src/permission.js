import router from './router/index';
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { localGet } from './utils';
import pinia from './store';
import { userInfoStore } from './store/userStore';

const store = userInfoStore(pinia);

const whiteList = ['/login'] // 白名单
// const userState = userInfoStore();

router.beforeEach((to, from, next) => {
  NProgress.start()

  const token = localGet('token')

  // 如果有token
  if (token) {
    if (to.path === '/login') {
      next({ path: '/home' });
      NProgress.done()
    } else {
      // 派发pinia，获取用户信息
      store.setUser()
    }
    next()
    NProgress.done()
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      ElMessage({
        message: "token失效",
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
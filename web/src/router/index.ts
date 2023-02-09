import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import("../view/home/index.vue"),
    meta: { nav: 'home', name: '首页' }
  },
  {
    path: '/tag',
    name: 'tag',
    component: () => import("../view/tag/index.vue"),
    meta: { nav: 'tag', name: '标签' }
  },
  {
    path: '/inforCard',
    name: 'inforCard',
    component: () => import("../view/inforCard/index.vue"),
    meta: { nav: 'inforCard', name: '资料卡' }
  },
  {
    path: '/messageBoard',
    name: 'messageBoard',
    component: () => import("../view/messageBoard/index.vue"),
    meta: { nav: 'messageBoard', name: '留言板' }
  },
  {
    path: '/link',
    name: 'link',
    component: () => import("../view/link/index.vue"),
    meta: { nav: 'link', name: '归档' }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import("../view/about/index.vue"),
    meta: { nav: 'about', name: '关于' }
  },
  {
    path: '/tag/:id',
    component: () => import('../view/tagDetaill/index.vue')
  },
  {
    path: '/article/:id',
    component: () => import('../view/article/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  strict: false,
  // 切换页面，回到顶部
  scrollBehavior: () => ({ left: 0, top: 0 })
})



export default router
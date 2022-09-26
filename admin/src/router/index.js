
import { createRouter, createWebHistory } from "vue-router";
import layout from "../layout/index.vue";

const routes = [
  {
    path: '/home',
    redirect: '/home/index',
    component: layout,
    children: [
      {
        path: '/home/index',
        component: () => import('@/view/home/index.vue'),
        meta: {
          title: '首页'
        }
      },
    ],
    meta: {
      nav: true,
      title: '首页'
    }
  },
  {
    path: '/userList',
    component: layout,
    children: [
      {
        path: '/userList/user',
        component: () => import('@/view/userList/user/index.vue'),
        meta: {
          title: '用户'
        }
      },
      {
        path: '/userList/admin',
        component: () => import('@/view/userList/admin/index.vue'),
        meta: {
          title: '管理员'
        }
      },
    ],
    meta: {
      nav: true,
      title: '用户管理'
    }
  },
  {
    path: '/',
    redirect: '/login',
    children: [
      {
        path: '/login',
        component: () => import('@/view/login/index.vue')
      }
    ],
    meta: {
      nav: false
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
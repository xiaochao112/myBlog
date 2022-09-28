
import { createRouter, createWebHistory } from "vue-router";
import layout from "../layout/index.vue";

const routes = [
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
  {
    path: '/home',
    redirect: '/home/index',
    component: layout,
    children: [
      {
        path: '/home/index',
        component: () => import('@/view/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'icon-shouye'
        }
      },
    ],
    meta: {
      nav: true,
      title: '首页',
      icon: 'icon-shouye'
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
          title: '用户',
          icon: 'icon-yonghu'
        }
      },
      {
        path: '/userList/admin',
        component: () => import('@/view/userList/admin/index.vue'),
        meta: {
          title: '管理员',
          icon: 'icon-guanliyuan'
        }
      },
    ],
    meta: {
      nav: true,
      title: '用户管理',
      icon: 'icon-yonghuguanli'
    }
  },
  {
    path: '/vocabulary',
    component: layout,
    children: [
      {
        path: '/vocabulary/webVocabulary',
        component: () => import('@/view/webVocabulary/index.vue'),
        meta: {
          title: '前端词汇',
          icon: 'icon-cidianku'
        }
      },
    ],
    meta: {
      nav: true,
      title: '词汇',
      icon: 'icon-cidianku'
    }
  },
  {
    path: '/information',
    component: layout,
    children: [
      {
        path: '/information/card',
        component: () => import('@/view/myInformation/card.vue'),
        meta: {
          title: '资料卡',
          icon: 'icon-wj-zlk'
        }
      },
    ],
    meta: {
      nav: true,
      title: '个人信息',
      icon: 'icon-guanjianci'
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
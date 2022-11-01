
import { createRouter, createWebHistory } from "vue-router";
import layout from "../layout/index.vue";
import { routerArray } from "./promisRouter";

/**
 * @description 路由配置简介
 * @param path ==> 路由路径
 * @param redirect ==> 路由重定向
 * @param component ==> 路由组件
 * @param meta ==> 路由元信息
 * @param meta.nav ==> 是否需要权限验证
 * @param meta.keepAlive ==> 是否需要缓存该路由
 * @param meta.title ==> 路由标题
 * @param meta.key	==> 路由key,用来匹配按钮权限
 * @param meta.role	==> 角色,用来匹配路由权限
 * 
 * */
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
    path: "/404",
    name: '404',
    children: [
      {
        path: '/404',
        component: () => import("@/components/ErrorMessage/404.vue"),
        meta: {
          nav: false,
          title: "404页面",
          key: "404"
        }
      }
    ],

  },
  ...routerArray,
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
    meta: {
      nav: false
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // 切换页面，回到最顶部
  scrollBehavior: () => ({ left: 0, top: 0 })
});

export default router;
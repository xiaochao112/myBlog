
import { createRouter, createWebHistory } from "vue-router";
import { routers, routerArray } from "./modules/promisRouter";

/**
 * @description 路由配置简介
 * @param path ==> 路由路径
 * @param redirect ==> 路由重定向
 * @param component ==> 路由组件
 * @param meta ==> 路由元信息
 * @param meta.keepAlive ==> 是否需要缓存该路由
 * @param meta.title ==> 路由标题
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
  },
  {
    path: "/404",
    name: '404',
    children: [
      {
        path: '/404',
        component: () => import("@/components/ErrorMessage/404.vue"),
        meta: {
          title: "404页面",
          key: "404"
        }
      }
    ],

  },
  // ...routers,
  ...routerArray,
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // 切换页面，回到最顶部
  scrollBehavior: () => ({ left: 0, top: 0 })
});

export default router;
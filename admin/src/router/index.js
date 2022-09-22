
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/view/home/index.vue')
  },
  {
    path: '/',
    name: 'login',
    component: () => import('@/view/login/index.vue')
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
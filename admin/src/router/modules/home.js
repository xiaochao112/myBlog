import { Layout } from '@/router/constant';
const homeRouter = [
  {
    path: '/home',
    redirect: '/home/index',
    component: Layout,
    children: [
      {
        path: '/home/index',
        name: 'home',
        component: () => import('@/view/home/home.vue'),
        meta: {
          role: [1, 2],
          keepAlive: true,
          title: '首页',
          icon: 'icon-shouye'
        }
      },
    ],
    meta: {
      role: [1, 2],
      title: '首页',
      icon: 'icon-shouye'
    }
  },
]

export default homeRouter;
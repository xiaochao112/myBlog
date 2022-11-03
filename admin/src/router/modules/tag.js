import { Layout } from '@/router/constant';

const tagRouter = [
  {
    path: '/tag',
    component: Layout,
    children: [
      {
        path: '/tag/index',
        name: 'tag',
        component: () => import('@/view/tag/tag.vue'),
        meta: {
          role: [1],
          keepAlive: true,
          title: '标签',
          icon: 'icon-guanjianci'
        }
      },
    ],
    meta: {
      role: [1],
      title: '标签',
      icon: 'icon-guanjianci'
    }
  },
]

export default tagRouter;
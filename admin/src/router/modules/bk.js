import { Layout } from '@/router/constant';

const bkRouter = [
  {
    path: '/bk',
    name: 'bk',
    component: Layout,
    children: [
      {
        name: 'bkIndex',
        path: '/bk/index',
        component: () => import('@/view/bk/bkIndex.vue'),
        meta: {
          role: [1],
          title: '博客发表',
          icon: 'icon-shouye'
        }
      },
    ],
    meta: {
      role: [1],
      title: '博客发表',
      icon: 'icon-shouye'
    }
  },
]

export default bkRouter;
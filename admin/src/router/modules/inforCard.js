import { Layout } from '@/router/constant';

const inforCardRouter = [
  {
    path: '/inforCard',
    component: Layout,
    children: [
      {
        path: '/inforCard/webVocabulary',
        component: () => import('@/view/webVocabulary/index.vue'),
        meta: {
          role: [1, 2],
          title: '前端词汇',
          icon: 'icon-cidianku'
        }
      },
      {
        path: '/inforCard/info',
        component: () => import('@/view/myInformation/card.vue'),
        meta: {
          role: [1, 2],
          title: '个人信息',
          icon: 'icon-wj-zlk'
        }
      },
    ],
    meta: {
      role: [1, 2],
      title: '资料卡',
      icon: 'icon-cidianku'
    }
  },
]
export default inforCardRouter;
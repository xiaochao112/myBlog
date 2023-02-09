import { Layout } from '@/router/constant';

const inforCardRouter = [
  {
    name: 'inforCard',
    path: '/inforCard',
    component: Layout,
    children: [
      {
        path: '/inforCard/webVocabulary',
        name: 'webVocabulary',
        component: () => import('@/view/webVocabulary/webVocabulary.vue'),
        meta: {
          role: [1, 2],
          keepAlive: true,
          title: '前端词汇',
          icon: 'icon-cidianku'
        }
      },
      {
        path: '/inforCard/info',
        name: 'card',
        component: () => import('@/view/myInformation/card.vue'),
        meta: {
          role: [1, 2],
          keepAlive: true,
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
import { Layout } from '@/router/constant';

const userListRouter = [
  {
    path: '/userList',
    component: Layout,
    children: [
      {
        path: '/userList/user',
        component: () => import('@/view/userList/user/index.vue'),
        meta: {
          role: [1, 2],
          title: '用户',
          icon: 'icon-yonghu'
        }
      },
      {
        path: '/userList/admin',
        component: () => import('@/view/userList/admin/index.vue'),
        meta: {
          role: [1],
          title: '管理员',
          icon: 'icon-guanliyuan'
        }
      },
      {
        path: '/userList/promiseList',
        component: () => import('@/view/userList/admin/index.vue'),
        meta: {
          role: [1, 2],
          title: '权限管理',
          icon: 'icon-guanliyuan'
        }
      },
    ],
    meta: {
      role: [1, 2],
      title: '用户管理',
      icon: 'icon-yonghuguanli'
    }
  },
]

export default userListRouter;
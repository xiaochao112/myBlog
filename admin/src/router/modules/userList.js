import { Layout } from '@/router/constant';

const userListRouter = [
  {
    path: '/userList',
    name: 'userList',
    component: Layout,
    children: [
      {
        path: '/userList/user',
        name: 'user',
        component: () => import('@/view/userList/user/user.vue'),
        meta: {
          role: [1, 2],
          keepAlive: true,
          title: '用户',
          icon: 'icon-yonghu'
        }
      },
      {
        path: '/userList/admin',
        name: 'admin',
        component: () => import('@/view/userList/admin/admin.vue'),
        meta: {
          role: [1],
          keepAlive: true,
          title: '管理员',
          icon: 'icon-guanliyuan'
        }
      },
      // {
      //   path: '/userList/promiseList',
      //   name: 'promiseList',
      //   component: () => import('@/view/userList/promiseList/promiseList.vue'),
      //   meta: {
      //     role: [1],
      //     keepAlive: true,
      //     title: '权限管理',
      //     icon: 'icon-guanliyuan'
      //   }
      // },
    ],
    meta: {
      role: [1, 2],
      title: '用户管理',
      icon: 'icon-yonghuguanli'
    }
  },
]

export default userListRouter;
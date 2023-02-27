import authRouters from '@/assets/data/authRouters'
import { getFlatArr } from '@/utils/index'
const Layout = () => import('@/layout/index.vue')
// * 导入所有的view文件
const modules = import.meta.glob("@/view/**/*.vue");
console.log(modules);
// 侧边栏导航路由
const routerArray = [...authRouters];
// 转为一维数组
let routers = getFlatArr(authRouters)

// 处理转化为真实路由
routers.forEach(item => {
  if (item.component === 'Layout') {
    item.component = Layout
  } else {
    item.component = modules['/src/view' + item.component + '/' + item.name + '.vue']
  }
})
console.log(routerArray, 'routerArray')

export {
  routerArray,
  routers
}
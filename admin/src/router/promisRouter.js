// * 导入所有的router
const metaRouters = import.meta.glob('./modules/*.js', { eager: true });

// * 处理路由表
export const routerArray = [];
Object.keys(metaRouters).forEach(item => {
  Object.keys(metaRouters[item]).forEach(key => {
    routerArray.push(...(metaRouters[item][key]));
  })
})
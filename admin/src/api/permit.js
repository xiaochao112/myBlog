import http from './index';

// 获取权限列表
export const getRoleList = () => {
  return http.post('/permit/menus');
}
// 获取路由权限
export const getRoutes = () => {
  return http.get('/permit/getRoutes');
}
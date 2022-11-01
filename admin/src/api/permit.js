import http from './index';

// 获取权限列表
export const getRoleList = () => {
  return http.post('/permit/menus');
}
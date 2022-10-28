import http from './index';

export const getRoleList = () => {
  return http.post('/permit/menus');
}
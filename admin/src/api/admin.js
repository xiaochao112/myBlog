import http from './index'

// 获取用户列表
export const getList = (data) => {
  return http.post('/user/adminList', data);
}
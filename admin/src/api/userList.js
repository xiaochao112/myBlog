import http from './index'

// 获取普通用户列表
export const getList = (data) => {
  return http.post('/user/userList', data);
}
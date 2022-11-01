import http from './index'

// 获取超级管理员列表
export const getList = (data) => {
  return http.post('/user/adminList', data);
}
import http from './index'

// 登录
export const getLoginApi = (data) => {
  return http.post('/user/login', data);
}

// 获取用户信息
export const getInfoApi = () => {
  return http.get('/user/info');
}

// 更新密码
export const updatedPsd = (data) => {
  return http.post('/user/updatePassword', data);
}
// 存储头像地址
export const updatedAvatar = (data) => {
  return http.post('/user/avatar', data);
}

// 获取用户列表
export const getList = (data) => {
  return http.post('/user/userList', data);
}
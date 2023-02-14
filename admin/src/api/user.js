import http from './index'

// 登录
export const getLoginApi = (data) => {
  return http.post('/user/login', data);
}
// 获取验证码
export const getCaptcha = () => {
  return http.get('/captcha/index');
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

// 删除用户
export const del = (data) => {
  return http.post('/user/del', data);
}

// 新增用户
export const add = (data) => {
  return http.post('/user/add', data);
}

// 修改用户
export const update = (data) => {
  return http.post('/user/update', data);
}
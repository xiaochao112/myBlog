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

// 上传图片
export const uploadImg = (img) => {
  return http.post('/upload/picture', data);
}
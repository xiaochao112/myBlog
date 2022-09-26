import http from './index'

export const getLoginApi = (data) => {
  return http.post('/user/login', data);
}

export const getInfoApi = () => {
  return http.get('/user/info');
}

export const updatedPsd = (data) => {
  return http.post('/user/updatePassword', data);
}

export const uploadImg = (img) => {
  return http.post('/upload/picture', data);
}
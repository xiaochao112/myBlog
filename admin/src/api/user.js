import http from './index'

export const getLoginApi = (data) => {
  return http.post('/user/login', data);
}

export const getInfoApi = () => {
  return http.post('/user/info');
}
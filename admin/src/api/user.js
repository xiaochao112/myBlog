import http from './index'

export const getLoginApi = (data) => {
  return http.post('/user/login', data);
}

export const getInfoApi = () => {
  return http.get('/user/info');
}
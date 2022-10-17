import http from './index'

// 获取标签列表
export const getList = (data) => {
  return http.post('/togItem/page', data);
}

export const add = (data) => {
  return http.post('/togItem/add', data);
}

export const update = (data) => {
  return http.post('/togItem/update', data);
}

export const del = (_id) => {
  return http.post('/togItem/del', _id);
}
import http from './index'

// 获取标签列表
export const getList = (data) => {
  return http.post('/tagItem/page', data);
}

export const add = (data) => {
  return http.post('/tagItem/add', data);
}

export const update = (data) => {
  return http.post('/tagItem/update', data);
}

export const del = (_id) => {
  return http.post('/tagItem/del', _id);
}
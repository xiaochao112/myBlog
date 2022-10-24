import http from './index'

// 获取标签列表
export const getList = (data) => {
  return http.post('/tagList/page', data);
}

export const add = (data) => {
  return http.post('/tagList/add', data);
}

export const update = (data) => {
  return http.post('/tagList/update', data);
}

export const del = (_id) => {
  return http.post('/tagList/del', _id);
}
import http from './index'

// 获取标签列表
export const getList = (data) => {
  return http.post('/togList/page', data);
}

export const add = (data) => {
  return http.post('/togList/add', data);
}

export const update = (data) => {
  return http.post('/togList/update', data);
}

export const del = (_id) => {
  return http.post('/togList/del', _id);
}
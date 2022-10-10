import http from './index';

// 获取资料卡列表
export const getList = (data) => {
  return http.post('/myInformation/info', data);
}

export const add = (data) => {
  return http.post('/myInformation/add', data);
}

export const update = (data) => {
  return http.post('/myInformation/update', data);
}

export const del = (_id) => {
  return http.post('/myInformation/del', _id);
}
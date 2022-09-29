import http from './index';

// 获取资料卡列表
export const getInfoApi = () => {
  return http.get('/webVocabulary/info');
}

export const add = (data) => {
  return http.post('/webVocabulary/add', data);
}

export const update = (data) => {
  return http.post('/webVocabulary/update', data);
}

export const del = (_id) => {
  return http.post('/webVocabulary/del', _id);
}
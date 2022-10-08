import http from './index';

// 获取词汇列表
export const getInfoApi = (data) => {
  return http.post('/webVocabulary/page', data);
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
import http from '../index';
import { ResPage, tag } from '../interface'

// 获取根标签列表
export const getRootTog = (data: tag.ReqTagList) => {
  return http.post<ResPage<tag.ResTagList>>('/tagList/page', data);
}
// 获取二级标签列表（单个）
export const getSecondTag = (data: tag.ReqTagList) => {
  return http.post<ResPage<tag.ResTagList>>('/tagItem/page', data);
}
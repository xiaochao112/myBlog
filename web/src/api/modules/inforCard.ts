import http from '../index';
import { InforCard, ResPage } from '../interface';
/**
 * @name 资料卡
 * 
 */
// * 获取资料卡列表
export const getInforCard = () => {
  return http.post<ResPage<InforCard.ResInforCardList>>('/myInformation/info')
}

// 获取web词汇列表
export const getWebWord = (data: InforCard.ReqWebWordList) => {
  return http.post<ResPage<InforCard.ResInforCardList>>('/webVocabulary/page', data)
}
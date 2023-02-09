// * 请求响应参数(不包含data)
export interface Result {
  code: number;
  msg: string;
}


// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
  data?: T;
}

// * 分页响应参数
export interface ResPage<T> {
  datalist: T[];
  pageNo: number;
  pageSize: number;
  total: number;
}

// * 分页请求参数
export interface ReqPage {
  pageNo: number;
  pageSize: number;
}

// * InforCard模块
export namespace InforCard {
  export interface ReqInforCardList extends ReqPage {

  }
  export interface ResInforCardList {
    _id: string;
    img: string;
    title: string;
    createdAt: number;
    updatedAt: number;
    _v: number;
  }

  export interface ReqWebWordList extends ReqPage {

  }
  export interface ResWebWordList {
    _id: string;
    english: string;
    word: string;
    title: string;
    desc: string;
    createdAt: number;
    updatedAt: number;
    _v: number;
  }
}

// * 标签模块
export namespace tag {
  export interface ReqTagList extends ReqPage {
    typeId?: number
  }
  export interface ResTagList {
    _id: string;
    title: string;
    desc: string;
    createdAt: number;
    updatedAt: number;
    _v: number;
  }
}
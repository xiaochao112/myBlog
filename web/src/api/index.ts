import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { GlobalStore } from "../stores";
import { ResultEnum } from "../enums/httpEnum";
import { ElMessage } from "element-plus";
import router from "../router";
import { ResultData } from "./interface";
// const axiosCanceler = new AxiosCanceler();

const config = {
  baseURL: import.meta.env.VITE_API_URL as string + '/admin/api',
  // 设置超时时间10S
  timeout: ResultEnum.TIMEOUT as number,

  /* 
    在axios里设置了withCredentials: true

    withCredentials的情况下，后端要设置Access-Control-Allow-Origin为你的源地址，例如http://localhost:8080，不能是*，而且还要设置header(‘Access-Control-Allow-Credentials: true’);

    说白了就是后端没允许cookie过去……
  */

  headers: {
    'Content-type': 'application/json; charset=utf-8'
  }
}

class RequestHttp {
  service: AxiosInstance;
  public constructor(config: AxiosRequestConfig) {
    // 实例化axios
    this.service = axios.create(config)

    /**
     * @description 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     * token校验(JWT) : 接受服务器返回的token,存储到vuex/pinia/本地储存当中
     */
    this.service.interceptors.request.use((
      config: AxiosRequestConfig) => {
      const globalStore = GlobalStore();
      return { ...config, headers: { ...config.headers, } };
    },
      (error: AxiosError) => {
        return Promise.reject(error);
      });
    /** 
     * @description 响应拦截器
     * 服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
    */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data, config } = response;
        // 在请求结束后，移除本次请求，并关闭请求
        // axiosCanceler.removePending(config)
        // * 成功请求（在页面上除非特殊情况，否则不用处理失败逻辑）
        return data;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
  }

  // * 常用请求方法封装
  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object });
  }
  post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, params, _object);
  }
  put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.put(url, params, _object);
  }
  delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ..._object });
  }
}

export default new RequestHttp(config)
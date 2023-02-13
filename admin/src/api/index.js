import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router/index'
import { localGet, localRemove } from '@/utils/index'
import qs from 'qs';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

console.log('服务器地址------' + import.meta.env.VITE_API_URL);
const http = axios.create({
  // baseURL: process.env.VUE_APP_API_URL || '/admin/api',
  // baseURL: 'http://localhost:3000/api/admin',
  baseURL: import.meta.env.VITE_API_URL + '/admin/api',
  headers: {
    'Content-type': 'application/json; charset=utf-8',
  }
})
http.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    NProgress.start()
    if (localGet('token')) {
      config.headers['token'] = localGet('token');

    }
    return config
  },
  function (error) {
    console.log(error);
    // Do something with request error
    return Promise.reject(error)
  }
)
// 请求拦截器，内部根据返回值，重新组装，统一管理。
http.interceptors.response.use(
  (res) => {
    if (res.data.code !== 200) {
      ElMessage.error(res.data.msg)
    }
    NProgress.done()
    return res.data
  },
  (err) => {
    console.log(err);
    NProgress.done()
    return Promise.reject(err);
  }
)

export default http
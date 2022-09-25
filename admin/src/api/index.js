import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router/index'
import { localGet } from '@/utils/index'
import qs from 'qs';

const http = axios.create({
  // baseURL: process.env.VUE_APP_API_URL || '/admin/api',
  baseURL: 'http://localhost:3000/admin/api',
  headers: {
    'Content-type': 'application/json; charset=utf-8',
  }
})
http.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (localGet('token')) {
      config.headers['token'] = localGet('token');
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)
// 请求拦截器，内部根据返回值，重新组装，统一管理。
http.interceptors.response.use(
  (res) => {
    if (typeof res.data !== 'object') {
      ElMessage.error('服务端异常！')
      return Promise.reject(res)
    }
    return res.data

  },
  (err) => {
    if (err.response.data.msg) {
      ElMessage.error(err.response.data.msg);

      if (err.response.status === 401) {
        router.push('/login');
      }
    }

    return Promise.reject(err);
  }
)

export default http
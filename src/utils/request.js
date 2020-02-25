import axios from 'axios'
import Config from '../Config'
import { Dialog } from 'vant'

// create an axios instance
const service = axios.create({
  baseURL: Config.host, // api的base_url
  timeout: 50000, // request timeout
  withCredentials: true
})

axios.defaults.withCredentials = true

// request拦截
service.interceptors.request.use(config => {
  if (config.method === 'post') {
    if(!config.headers['Content-Type']){
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    if(!config.setTransformRequest){
      config.transformRequest = [data => {
        let ret = ''
        for (var it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }]
    }
  }
  return config
}, error => {
  console.log(error) 
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (response.status === 200) {
      if(res.status && res.status === 'SUCCESS'){
        return res
      }else if(res.status && res.status === 'SESSIONERROR'){
        Dialog.alert({
          title: "提示",
          message: res.message || "网络异常，请稍后重试"
        })
      } else if (res.status && res.status != 'SUCCESS') {
        Dialog.alert({
          title: '提示',
          message: res.message || '网络异常，请稍后重试'
        })
        return Promise.reject()
      } else {
        return res
      }
    } else {
      Dialog.alert({
        title: '错误',
        message: '网络中断，请重新请求'
      })
    }
  },
  error => {
    console.log('err' + error)// for debug
    Dialog.alert({
      title: '错误',
      message: error.message
    })
    return Promise.reject(error)
  }
)

export default service

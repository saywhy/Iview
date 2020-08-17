import axios from 'axios'

// 创建axios实例
var instance = axios.create({
  baseURL: '/api',
  timeout: 6000
})
export default function (method, url, data = null) {
  method = method.toLowerCase();

  switch (method) {
    case 'post':
      return instance.post(url, data)
      break;
    case 'get':
      return instance.get(url, {
        params: data
      })
      break;
    case 'delete':
      return instance.delete(url, {
        params: data
      })
      break;
    case 'put':
      return instance.delete(url, data)
      break;
    default:

      break;
  }
}

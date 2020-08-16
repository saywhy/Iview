import req from './http.js'

// 定义告警类的接口
// 告警列表
export const ALERTS = params => req('get', '/yiiapi/alerts', params)

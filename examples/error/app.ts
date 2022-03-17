import axios from '../../src'
import { AxiosError } from '../../src/helpers/error'

// 非正常状态码
axios({
  method: 'get',
  url: '/error/get'
})
  .then(function(res) {
    console.log('请求结果', res)
  })
  .catch(function(err) {
    console.log('请求错误', err)
  })

// 网络异常
setTimeout(function() {
  axios({
    method: 'get',
    url: '/error/get1'
  })
    .then(function(res) {
      console.log('请求结果', res)
    })
    .catch(function(err) {
      console.log('请求错误', err)
    })
}, 5000)

// 超时
axios({
  method: 'get',
  url: '/error/timeout/get',
  timeout: 2000
})
  .then(function(res) {
    console.log('请求结果', res)
  })
  .catch(function(err: AxiosError) {
    console.log('请求错误', err.message)
  })

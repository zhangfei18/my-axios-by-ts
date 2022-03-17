import axios from '../../src'

const cancelToken = axios.CancelToken
// const source = cancelToken.source()
// axios
//   .get('/cancel/get', {
//     cancelToken: source.token
//   })
//   .then(res => {
//     console.log('第一个请求返回结果', res)
//   })
//   .catch(err => {
//     if (axios.isCancel(err)) {
//       console.log('第一个请求错误', err)
//     }
//   })

// setTimeout(() => {
//   source.cancel('我取消了第一个请求')
//   axios
//     .post(
//       '/cancel/post',
//       { a: 1 },
//       {
//         cancelToken: source.token
//       }
//     )
//     .then(res => {
//       console.log('第而个请求返回结果', res)
//     })
//     .catch(err => {
//       console.log('第二个请求错误', err)
//     })
// }, 100)

let cancel
axios
  .get('/cancel/get', {
    cancelToken: new cancelToken(function(c) {
      cancel = c
    })
  })
  .then(res => {
    console.log('第三个请求结果', res)
  })
  .catch(err => {
    console.log('第三个请求错误', err)
  })

setTimeout(function() {
  cancel('我被取消了哦')
}, 100)

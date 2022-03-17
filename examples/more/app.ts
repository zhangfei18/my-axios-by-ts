import axios from '../../src'
import NProgress from 'nprogress'
import qs from 'qs'
// document.cookie = 'z=f'
// axios.get('/more/get').then(res => {
//   console.log(res)
// })

// axios.post('http://127.0.0.1:8088/more/server2', { }, {
//   withCredentials: true
// }).then(res => {
//   console.log(res)
// })

// const instance = axios.create({
//   xsrfCookieName: 'XSRF-TOKEN-D',
//   xsrfHeaderName: 'X-XSRF-TOKEN-D'
// })

// instance.get('/more/get').then(res => {
//   console.log(res)
// })

// 进度条的例子

// let downLoadBtn = document.querySelector('#download')
// let upLoadBtn = document.querySelector('#upload')
// let fileEl = document.querySelector('#file') as HTMLInputElement

// const instance = axios.create()
// downLoadBtn.addEventListener('click', function() {
//   instance.get(
//     'https://img2.baidu.com/it/u=1814268193,3619863984&fm=253&fmt=auto&app=138&f=JPEG?w=632&h=500'
//   )
// })

// upLoadBtn.addEventListener('click', function() {
//   let data = new FormData()
//   if (fileEl.files) {
//     data.append('file', fileEl.files[0])
//     instance.post('/more/upload', data)
//   }
// })

// function calculatePercentage(loaded, total) {
//   console.log(Math.floor((loaded * 1.0) / total))
//   return Math.floor((loaded * 1.0) / total)
// }
// function loadProgressBar() {
//   function setupStartProgress() {
//     instance.interceptors.request.use(config => {
//       NProgress.start()
//       return config
//     })
//   }
//   function setupUpdateProgress() {
//     const update = function(e) {
//       console.log('进度', e)
//       NProgress.set(calculatePercentage(e.loaded, e.total))
//     }
//     instance.defaults.onDownloadProgress = update
//     instance.defaults.onUploadProgress = update
//   }
//   function setupStopProgress() {
//     instance.interceptors.response.use(
//       res => {
//         NProgress.done()
//         return res
//       },
//       err => {
//         NProgress.done()
//         return Promise.reject(err)
//       }
//     )
//   }
//   setupStartProgress()
//   setupUpdateProgress()
//   setupStopProgress()
// }
// loadProgressBar()

// axios
//   .post(
//     '/more/post',
//     {
//       a: 1
//     },
//     {
//       auth: {
//         username: 'zf',
//         password: '888888'
//       }
//     }
//   )
//   .then(res => {
//     console.log('认证接口返回', res)
//   })

// axios
//   .get('/validata/get1')
//   .then(res => {
//     console.log(res)
//   })
//   .catch(err => console.log(err))
// axios
//   .get('/validata/get1', {
//     validateStatus(status) {
//       return status >= 200 && status < 400
//     }
//   })
//   .then(res => {
//     console.log(res)
//   })
//   .catch(err => console.log(err))
// * 自定义参数序列化
// axios
//   .get('/more/get', {
//     params: new URLSearchParams('a=b&c=d')
//   })
//   .then(res => {
//     console.log(res)
//   })
// axios
//   .get('/more/get', {
//     params: {
//       a: 'b',
//       c: 'd',
//       e: [1, 2, 3]
//     }
//   })
//   .then(res => {
//     console.log(res)
//   })
// axios
//   .get('/more/get', {
//     params: {
//       a: 'b',
//       c: 'd',
//       e: [1, 2, 3]
//     },
//     paramsSerializer(params) {
//       return qs.stringify(params)
//     }
//   })
//   .then(res => {
//     console.log(res)
//   })

//* baseURL
const instance = axios.create({
  baseURL: 'https://img.mukewang.com/'
})
instance.get('/5cc01a7b0001a33718720632.jpg')
instance.get('https://img.mukewang.com/5cc01a7b0001a33718720632.jpg')

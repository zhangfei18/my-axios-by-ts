import axios from '../../src'

console.dir(axios)
axios.interceptors.request.use(config => {
  console.log('--1-')
  config.headers.test += '3'
  return config
})
axios.interceptors.request.use(config => {
  console.log('--2-')

  config.headers.test += '2'
  return config
})
axios.interceptors.request.use(config => {
  console.log('--3-')

  config.headers.test += '1'
  return config
})

axios.interceptors.response.use(res => {
  console.log('res',res)
  res.data += '1'
  return res
})
// let number = axios.interceptors.response.use(data => {
//   data.data += '2'
//   return data
// })
// axios.interceptors.response.eject(number)
// axios.interceptors.response.use(data => {
//   data.data += '3'
//   return data
// })

axios
  .get('/interceptor/get', {
    headers: {
      test: ''
    }
  })
  .then(res => {
    console.log('a', res)
  })

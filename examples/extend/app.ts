import axios from '../../src'

axios({
  url: '/extend/get',
  method: 'get'
}).then(function(res) {
  console.log(res)
})

axios
  .request({
    url: '/extend/get',
    method: 'get'
  })
  .then(function(res) {
    console.log(res)
  })

axios.get('/extend/get').then(function(res) {
  console.log(res)
})

const arr = new Int32Array([21, 31])

axios({
  method: 'post',
  url: '/extend/post',
  data: arr
}).then(function(res) {
  console.log(res)
})

axios
  .post('/extend/post', {
    data: arr
  })
  .then(function(res) {
    console.log(res)
  })

axios('/extend/post', {
  method: 'post',
  data: arr
}).then(function(res) {
  console.log(res)
})

// 返回数据结构泛型支持
interface ResponseData<T = any> {
  code: number
  result: T
  message: string
}

interface User {
  name: string
  age: string
}

function getUser<T>() {
  return axios<ResponseData<T>>('/extend/user', {method: 'get'}).then(function(res) {
    // console.log('user接口返回', res)
    return res.data
  })
}

function test() {
  getUser<User>().then(function(user) {
    console.log('用户信息', user.result.age)
  })
}
test()

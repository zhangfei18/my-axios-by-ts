import axios from '../../src/index'

axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
}).then(data => {
  console.log('data1', data)
})

const arr = new Int32Array([21, 31])

axios({
  method: 'post',
  url: '/base/buffer',
  data: arr
}).then(data => {
  console.log('data2', data)
})

axios({
  method: 'post',
  url: '/base/post',
  headers: {
    'content-type': 'application/json;charset=UTF-8'
  },
  responseType: '',
  data: {
    a: 1,
    b: 2
  }
}).then(data => {
  console.log('data3', data)
})

import axios from '../../src'
import qs from 'qs'

const instance = axios.create({
  transformRequest: [
    function(data) {
      return qs.stringify(data)
    },
    ...axios.defaults.transformRequest
  ],
  transformResponse: [
    ...axios.defaults.transformResponse,
    function(data) {
      console.log('transformResponse', data)
      data.b = 222
      return data
    }
  ]
})
instance({
  method: 'post',
  url: '/create1/post',
  data: {
    a: 1
  }
}).then(res => {
  console.log('res:', res)
})

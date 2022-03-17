import axios from '../../src'
import qs from 'qs'

axios({
  method: 'post',
  url: '/transform/post',
  data: {
    a: 1
  },
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
    }
  ]
})

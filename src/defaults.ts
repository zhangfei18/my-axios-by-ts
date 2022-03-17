import { AxiosRequestConfig } from '../types'
import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/header'

const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },
  transformRequest: [
    function(data: any, headers: any): any {
      processHeaders(headers, data)
      return transformRequest(data)
    }
  ],
  transformResponse: [
    function(data: any): any {
      return transformResponse(data)
    }
  ],
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  validateStatus: function(status) {
    return status >= 200 && status < 300
  }
}

const methodsNoData = ['get', 'delete', 'head', 'options']
const methodsWithData = ['post', 'put', 'patch']

methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})
methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults

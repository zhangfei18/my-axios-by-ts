import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../../types/index'
import xhr from '../xhr'
import { buildUrl } from '../helpers/url'
import { flattenHeaders } from '../helpers/header'
import transform from './transform'
import { combineUrl, isAbsoluteURL } from '../helpers/util'
function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then(function(res) {
    return transformResponseData(res)
  })
}
function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  // config.headers = transformHeaders(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}
export function transformUrl(config: AxiosRequestConfig): string {
  let { url = '', params, paramsSerializer, baseURL } = config
  if (baseURL && !isAbsoluteURL(url)) {
    url = combineUrl(baseURL, url)
  }
  return buildUrl(url, params, paramsSerializer)
}
// function transformRequestData(config: AxiosRequestConfig): void {
//   return transformRequest(config.data)
// }
// function transformHeaders(config: AxiosRequestConfig): any {
//   const { headers = {}, data } = config
//   return processHeaders(headers, data)
// }

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}
export default dispatchRequest

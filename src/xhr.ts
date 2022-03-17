import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types/index'
import cookie from './helpers/cookie'
import { createError } from './helpers/error'
import { parseHeaders } from './helpers/header'
import { isURLSameOrigin } from './helpers/url'
import { isFormData } from './helpers/util'
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise(function(resolve, reject) {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
      auth,
      validateStatus
    } = config
    const request = new XMLHttpRequest()
    request.open(method.toUpperCase(), url!, true)
    configureRequest()
    processHeaders()
    addEvents()
    processCancel()
    request.send(data)
    function configureRequest() {
      if (timeout) {
        request.timeout = timeout
      }
      if (withCredentials) {
        request.withCredentials = withCredentials
      }
    }
    function processHeaders() {
      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        let cookieVal = cookie.read(xsrfCookieName)
        if (cookieVal) {
          headers[xsrfHeaderName!] = cookieVal
        }
      }
      if (isFormData(data)) {
        delete headers['Content-Type']
      }
      if (auth) {
        headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password)
      }
      // 设置headers
      Object.keys(headers).forEach(function(name) {
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        }
        request.setRequestHeader(name, headers[name])
      })
    }
    function addEvents() {
      request.onerror = function() {
        reject(createError(`Netwrok Error: 网络错误`, config, null, request))
      }
      request.onreadystatechange = function() {
        // request.status是0表示请求未发送
        if (request.readyState !== 4 || request.status === 0) return
        const responseHeaders = parseHeaders(request.getAllResponseHeaders())
        const responseStatus = request.status
        const responseStatusText = request.statusText
        const responseData =
          request.responseType === 'text' ? request.responseText : request.response

        const response: AxiosResponse = {
          data: responseData,
          headers: responseHeaders,
          status: responseStatus,
          statusText: responseStatusText,
          config,
          request
        }
        handleResponse(response)
      }
      function handleResponse(response: AxiosResponse): void {
        if (!validateStatus || validateStatus(response.status)) {
          resolve(response)
        } else {
          reject(
            createError(
              `Request failed with status code ${response.status}: 非正常状态码返回`,
              config,
              null,
              request,
              response
            )
          )
        }
      }
      request.ontimeout = function() {
        reject(
          createError(
            `Timeout of ${timeout} ms exceeded: 超时错误`,
            config,
            'ECONNABORTED',
            request
          )
        )
      }
      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }
      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }
    }
    function processCancel() {
      // 取消请求
      if (cancelToken) {
        // cancelToken.promise.then(reason => {
        //   console.log('请求被取消')
        //   request.abort()
        //   reject(reason)
        // })
        cancelToken.subs.push((reason: any) => {
          console.log('请求被取消')
          request.abort()
          reject(reason)
        })
      }
    }
  })
}

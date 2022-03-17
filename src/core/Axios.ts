import {
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
  AxiosInterceptorManager,
  PromiseChain
} from '../../types'
import dispatchRequest, { transformUrl } from './dispatch'
import IntercepterManater from './intercepterManager'
import mergeConfig from './mergeConfig'

interface Intercepters {
  request: AxiosInterceptorManager<AxiosRequestConfig>
  response: AxiosInterceptorManager<AxiosResponse>
}

export default class Axios {
  defaults: AxiosRequestConfig
  interceptors: Intercepters
  constructor(initConfig: AxiosRequestConfig) {
    this.defaults = initConfig
    this.interceptors = {
      request: new IntercepterManater<AxiosRequestConfig>(),
      response: new IntercepterManater<AxiosResponse>()
    }
  }
  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) config = {}
      config.url = url
    } else {
      config = url
    }

    config = mergeConfig(this.defaults, config)

    let chain: PromiseChain<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]
    this.interceptors.request.forEach(function(intercepter: PromiseChain<AxiosRequestConfig>) {
      chain.unshift(intercepter)
    })
    this.interceptors.response.forEach(function(intercepter: PromiseChain<AxiosResponse>) {
      chain.push(intercepter)
    })
    let promise = Promise.resolve(config)
    while (chain.length) {
      let { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }
    return promise
  }
  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('get', url, config)
  }
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }
  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('head', url, config)
  }
  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('options', url, config)
  }
  _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method: method,
        url
      })
    )
  }
  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('post', url, data, config)
  }
  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('put', url, data, config)
  }
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('patch', url, data, config)
  }
  _requestMethodWithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method: method,
        url,
        data
      })
    )
  }
  getUri(config: AxiosRequestConfig): string {
    config = mergeConfig(this.defaults, mergeConfig)
    return transformUrl(config)
  }
}

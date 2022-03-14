import { isDate, isObject } from './util'
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}
export function buildUrl(url: string, params?: any): string {
  /**
   * tasking:
   *  1. 拆分params到一个数组
   *  2. 使用&拼接这个数组成一个字符串
   * */

  if (!params) return url
  const parts: string[] = []
  Object.keys(params).forEach(function(key) {
    let val = params[key]
    if (val === null || typeof val === 'undefined') {
      return
    }
    let values: string[] = []
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach(function(val) {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })
  let serializedParams = parts.join('&')
  if (!serializedParams) return url
  let markIndex
  // 去除hash
  if ((markIndex = url.indexOf('#')) !== -1) {
    url = url.slice(0, markIndex)
  }
  url = url + (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  return url
}

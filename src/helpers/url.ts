import { isDate, isObject, isURLSearchParams } from './util'
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
export function buildUrl(
  url: string,
  params?: any,
  paramsSerializer?: (params: any) => string
): string {
  /**
   * tasking:
   *  1. 拆分params到一个数组
   *  2. 使用&拼接这个数组成一个字符串
   *  边缘case: hash url的处理、url里面已经带有查询字符串
   */
  if (!params) return url
  let serializedParams
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params)
  } else if (isURLSearchParams(params)) {
    serializedParams = params.toString()
  } else {
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
    serializedParams = parts.join('&')
  }

  if (!serializedParams) return url
  let markIndex = url.indexOf('#')
  // 去除hash
  if (markIndex !== -1) {
    url = url.slice(0, markIndex)
  }
  url = url + (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  return url
}

export function isURLSameOrigin(requestURL: string): boolean {
  const requestOriginInfo = resolveURL(requestURL)
  const currentOriginInfo = resolveURL(window.location.href)
  return (
    requestOriginInfo.protocol === currentOriginInfo.protocol &&
    requestOriginInfo.host === currentOriginInfo.host
  )
}
const urlParsingNode = document.createElement('a')
interface URLOrigin {
  protocol: string
  host: string
}
function resolveURL(url: string): URLOrigin {
  urlParsingNode.setAttribute('href', url)
  const { protocol, host } = urlParsingNode
  return {
    protocol,
    host
  }
}

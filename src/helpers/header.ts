import { Method } from '../../types'
import { deepMerge, isPlainObject } from './util'
function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) return
  Object.keys(headers).forEach(function(name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}
export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

export function parseHeaders(headers: string): any {
  const parsed = Object.create(null)
  if (!headers) return
  headers.split('\r\n').forEach(function(header) {
    let [key, val] = header.split(':')
    if (!key) return
    key = key.trim()
    if (val) {
      val = val.trim()
    }
    parsed[key] = val
  })
  return parsed
}

export function flattenHeaders(headers: any, method: Method) {
  if (!headers) {
    return headers
  }
  const result = deepMerge(headers.common || {}, headers[method] || {}, headers)
  const needDelKeys = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']
  needDelKeys.forEach(key => {
    delete result[key]
  })
  return result
}

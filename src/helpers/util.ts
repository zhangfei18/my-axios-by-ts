const ObjectToString = Object.prototype.toString
export function isDate(val: any): val is Date {
  return ObjectToString.call(val) === '[object Date]'
}

export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}

export function isPlainObject(val: any): val is Object {
  return ObjectToString.call(val) === '[object Object]'
}

export function extend<T, U>(to: T, from: U): T & U {
  for (let key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

export function deepMerge(...objs: any[]) {
  const result = Object.create(null)
  objs.forEach(obj => {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const element = obj[key]
        if (typeof element === 'object') {
          if (typeof result[key] === 'object') {
            result[key] = deepMerge(result[key], element)
          } else {
            result[key] = deepMerge({}, element)
          }
        } else {
          result[key] = element
        }
      }
    }
  })
  return result
}

export function isFormData(data: any): boolean {
  return typeof data !== 'undefined' && data instanceof FormData
}

export function isURLSearchParams(val: any): val is URLSearchParams {
  return typeof val !== 'undefined' && val instanceof URLSearchParams
}

export function isAbsoluteURL(url: string): boolean {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}

export function combineUrl(baseURL: string, relativeUrl?: string): string {
  return relativeUrl ? baseURL.replace(/\/+$/, '') + '/' + relativeUrl.replace(/^\/+/, '') : baseURL
}

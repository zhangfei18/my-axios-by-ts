// 1. 有的属性， 直接采用用户的
// 2. 有的属性，用户没传入使用默认的
// 3. 有的属性需要深拷贝

import { AxiosRequestConfig } from '../../types'
import { deepMerge, isPlainObject } from '../helpers/util'

function defaultStrat(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  } else {
    return val1
  }
}
function fromVal2Strat(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') return val2
}
const strats = Object.create(null)
const fromVal2Keys = ['url', 'params', 'data']
fromVal2Keys.forEach(key => {
  strats[key] = fromVal2Strat
})

function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

const deepMergeKeys = ['headers', 'auth']
deepMergeKeys.forEach(key => {
  strats[key] = deepMergeStrat
})

export default function mergeConfig(config1: AxiosRequestConfig, config2?: AxiosRequestConfig) {
  if (!config2) config2 = {}
  const config = Object.create(null)

  for (const key in config2) {
    if (Object.prototype.hasOwnProperty.call(config2, key)) {
      mergeField(key)
    }
  }
  for (const key in config1) {
    if (Object.prototype.hasOwnProperty.call(config1, key)) {
      if (!config2[key]) {
        mergeField(key)
      }
    }
  }
  function mergeField(key: string): void {
    const stratFn = strats[key] || defaultStrat
    config[key] = stratFn(config1[key], config2![key])
  }
  return config
}

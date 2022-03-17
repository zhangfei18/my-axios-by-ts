import { RejectedFn, ResolvedFn } from '../../types'

interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}
export default class IntercepterManater<T> {
  private intercepters: Array<Interceptor<T> | null>
  constructor() {
    this.intercepters = []
  }
  use(resolved: ResolvedFn<T>, rejected: RejectedFn): number {
    this.intercepters.push({
      resolved,
      rejected
    })
    return this.intercepters.length - 1
  }
  eject(id: number): void {
    if (this.intercepters[id]) {
      this.intercepters[id] = null
    }
  }
  forEach(fn: (intercepter: Interceptor<T>) => void): void {
    this.intercepters.forEach(function(intercepter) {
      if (!intercepter) return
      fn(intercepter)
    })
  }
}

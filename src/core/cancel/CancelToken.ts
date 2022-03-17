import { Canceler, CancelExecutor, CancelTokenSource, Cancel } from '../../../types'
import CancelClass from './Cancel'

interface ResolvePromiseHandler {
  (reason?: Cancel): void
}
export default class CancelToken {
  // promise: Promise<Cancel>
  subs: any[]
  reason?: Cancel
  constructor(executor: CancelExecutor) {
    let resolvePromiseHandler: ResolvePromiseHandler
    // this.promise = new Promise<Cancel>(resolve => {
    //   resolvePromiseHandler = resolve as any
    // })
    this.subs = []
    executor(message => {
      if (this.reason) return
      this.reason = new CancelClass(message!)
      // resolvePromiseHandler(this.reason!)
      this.subs.forEach(cb => {
        cb(this.reason!)
      })
    })
  }
  static source(): CancelTokenSource {
    let cancel!: Canceler
    let token = new CancelToken(c => {
      cancel = c
    })
    return {
      token: token as any,
      cancel
    }
  }
  throwIfRequested(): void {
    if (this.reason) {
      throw this.reason
    }
  }
}

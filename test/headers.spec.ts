import { parseHeaders, flattenHeaders, processHeaders } from '../src/helpers/header'

describe('helpers:header', () => {
  describe('parseHeaders', () => {
    test('解析headers', () => {
      const parsed = parseHeaders(
        'Content-Type: application/json\r\n' +
          'Connection: keep-alive\r\n' +
          'Date: Tue, 21 May 2019 09:23:44 GMT\r\n' +
          'key:\r\n' +
          ':aa'
      )
      expect(parsed['Content-Type']).toBe('application/json')
      expect(parsed['content-type']).toBeUndefined
      expect(parsed['Connection']).toBe('keep-alive')
      expect(parsed['Date']).toBe('Tue, 21 May 2019 09:23:44 GMT')
      expect(parsed['key']).toBe('')
      expect(Object.keys(parsed).length).toBe(4)
    })
  })
  describe('flattenHeaders', () => {
    test('打平header', () => {
      const headers = {
        common: {
          Accept: 'application/json, text/plain, */*'
        },
        get: {
          'Content-Type': 'application/json;charset=utf8'
        },
        post: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      expect(flattenHeaders(headers, 'get')).toEqual({
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json;charset=utf8'
      })
      expect(flattenHeaders(headers, 'post')).toEqual({
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    })
  })
  describe('processHeaders', () => {
    test('处理headers', () => {
      let headers = {
        'content-type': 'aaa'
      }
      expect(processHeaders({}, {})).toEqual({
        'Content-Type': 'application/json;charset=utf-8'
      })
      expect(processHeaders(headers, {})).toEqual({
        'Content-Type': 'aaa'
      })
      expect(processHeaders(headers, undefined)).toEqual({
        'Content-Type': 'aaa'
      })
    })
  })
})

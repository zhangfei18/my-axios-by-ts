import axios from '../../src/index'

axios({
  method: 'get',
  url: '/base/get1',
  params: {
    foo: ['bar', 'baz']
  }
})

axios({
  method: 'get',
  url: '/base/get2',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})

const date = new Date()

axios({
  method: 'get',
  url: '/base/get3',
  params: {
    date
  }
})

axios({
  method: 'get',
  url: '/base/get4',
  params: {
    foo: '@:$, '
  }
})

axios({
  method: 'get',
  url: '/base/get5',
  params: {
    foo: 'bar',
    baz: null
  }
})

axios({
  method: 'get',
  url: '/base/get6#hash',
  params: {
    foo: 'bar'
  }
})

axios({
  method: 'get',
  url: '/base/get7?foo=bar',
  params: {
    bar: 'baz'
  }
})
